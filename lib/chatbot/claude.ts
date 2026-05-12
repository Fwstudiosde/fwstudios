import "server-only";

export type ClaudeMessage = {
  role: "user" | "assistant";
  content: string | ContentBlock[];
};

export type ContentBlock =
  | { type: "text"; text: string }
  | { type: "tool_use"; id: string; name: string; input: Record<string, unknown> }
  | {
      type: "tool_result";
      tool_use_id: string;
      content: string;
      is_error?: boolean;
    };

export type ClaudeTool = {
  name: string;
  description: string;
  input_schema: Record<string, unknown>;
};

export type ClaudeResponse = {
  id: string;
  stop_reason: string | null;
  content: ContentBlock[];
  usage: { input_tokens: number; output_tokens: number };
};

export async function callClaude({
  apiKey,
  model,
  system,
  messages,
  tools,
  temperature,
  maxTokens,
}: {
  apiKey: string;
  model: string;
  system: string;
  messages: ClaudeMessage[];
  tools?: ClaudeTool[];
  temperature: number;
  maxTokens: number;
}): Promise<ClaudeResponse> {
  const body: Record<string, unknown> = {
    model,
    max_tokens: maxTokens,
    temperature,
    system,
    messages,
  };
  if (tools && tools.length > 0) body.tools = tools;

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(60_000),
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    throw new Error(`Claude API ${res.status}: ${errText.slice(0, 400)}`);
  }
  return (await res.json()) as ClaudeResponse;
}

export const CHATBOT_TOOLS: ClaudeTool[] = [
  {
    name: "capture_lead",
    description:
      "Use when the user shows real interest (asks for an offer, a meeting, a callback or shares contact details). Persists a lead in the CRM.",
    input_schema: {
      type: "object",
      properties: {
        email: {
          type: "string",
          description: "User's email address. Required.",
        },
        name: { type: "string", description: "User's name if known." },
        message: {
          type: "string",
          description:
            "Short summary of what the user wants — used by the sales team to prepare.",
        },
      },
      required: ["email"],
    },
  },
  {
    name: "list_available_slots",
    description:
      "Returns the next available 30-minute consultation slots from the live Cal.com calendar. Use this when the user agrees to a call. Optional: narrow with from_date / to_date (ISO date YYYY-MM-DD) if the user asks for a specific timeframe.",
    input_schema: {
      type: "object",
      properties: {
        from_date: {
          type: "string",
          description: "Optional ISO date (YYYY-MM-DD) to start the search.",
        },
        to_date: {
          type: "string",
          description: "Optional ISO date (YYYY-MM-DD) to end the search.",
        },
      },
    },
  },
  {
    name: "book_slot",
    description:
      "Books a specific slot in the Cal.com calendar. ONLY call after list_available_slots returned slots AND the user picked one AND name + email are known. Use the exact ISO start string from list_available_slots.",
    input_schema: {
      type: "object",
      properties: {
        slot_start_iso: {
          type: "string",
          description:
            "Exact slot start in ISO 8601 format, copied from list_available_slots output.",
        },
        name: { type: "string", description: "Attendee full name." },
        email: { type: "string", description: "Attendee email address." },
        notes: {
          type: "string",
          description: "Optional short note about what the user wants to discuss.",
        },
      },
      required: ["slot_start_iso", "name", "email"],
    },
  },
  {
    name: "book_meeting",
    description:
      "Fallback: returns the public booking URL. Use ONLY if list_available_slots / book_slot are unavailable or the user explicitly asks for the link.",
    input_schema: {
      type: "object",
      properties: {},
    },
  },
];

export function extractText(content: ContentBlock[]): string {
  return content
    .filter((b): b is Extract<ContentBlock, { type: "text" }> => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .trim();
}

export function extractToolUses(
  content: ContentBlock[]
): Extract<ContentBlock, { type: "tool_use" }>[] {
  return content.filter(
    (b): b is Extract<ContentBlock, { type: "tool_use" }> => b.type === "tool_use"
  );
}
