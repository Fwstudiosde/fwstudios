import {
  getChatbotConfig,
  listConversations,
  listSources,
} from "@/lib/chatbot/storage";
import { PageHeader, StatCard } from "../../_components/page-header";
import { ChatbotWorkspace } from "./_components/chatbot-workspace";

export const metadata = { title: "Chatbot" };
export const dynamic = "force-dynamic";

export default async function ChatbotAdminPage() {
  const [config, sources, conversations] = await Promise.all([
    getChatbotConfig(),
    listSources(),
    listConversations(),
  ]);

  const totalChunks = sources.reduce((s, x) => s + x.chunkCount, 0);
  const leadCount = conversations.filter((c) => c.leadCaptured).length;
  const tokensIn = conversations.reduce((s, c) => s + c.totalInputTokens, 0);
  const tokensOut = conversations.reduce((s, c) => s + c.totalOutputTokens, 0);

  const safeConfig = { ...config, apiKeyEnc: null };

  return (
    <>
      <PageHeader
        title="Chatbot"
        description="Konfiguration, Wissensbasis, Konversationen, Playground und Analytics."
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Status"
          value={config.hasApiKey ? "Aktiv" : "Inaktiv"}
          hint={config.hasApiKey ? config.model : "API-Key fehlt"}
        />
        <StatCard
          label="Wissens-Chunks"
          value={totalChunks}
          hint={`${sources.length} Quellen`}
        />
        <StatCard
          label="Konversationen"
          value={conversations.length}
          hint={`${leadCount} Leads erfasst`}
        />
        <StatCard
          label="Tokens (in / out)"
          value={`${tokensIn.toLocaleString("de-DE")} / ${tokensOut.toLocaleString("de-DE")}`}
          hint="Gesamt seit Start"
        />
      </div>

      <ChatbotWorkspace
        initialConfig={safeConfig}
        initialSources={sources}
        initialConversations={conversations}
      />
    </>
  );
}
