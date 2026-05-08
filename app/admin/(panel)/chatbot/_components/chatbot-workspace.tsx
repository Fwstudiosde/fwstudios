"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ChatbotConfig,
  ChatConversation,
  KnowledgeSource,
} from "@/lib/chatbot/types";
import { ConfigTab } from "./config-tab";
import { KnowledgeTab } from "./knowledge-tab";
import { ConversationsTab } from "./conversations-tab";
import { PlaygroundTab } from "./playground-tab";
import { AnalyticsTab } from "./analytics-tab";

const TABS = [
  { id: "config", label: "Konfiguration" },
  { id: "knowledge", label: "Wissensbasis" },
  { id: "conversations", label: "Konversationen" },
  { id: "playground", label: "Playground" },
  { id: "analytics", label: "Analytics" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ChatbotWorkspace({
  initialConfig,
  initialSources,
  initialConversations,
}: {
  initialConfig: ChatbotConfig;
  initialSources: KnowledgeSource[];
  initialConversations: ChatConversation[];
}) {
  const [tab, setTab] = React.useState<TabId>("config");
  const [config, setConfig] = React.useState(initialConfig);

  return (
    <div className="mt-10">
      <div className="flex flex-wrap gap-1 border-b border-border">
        {TABS.map((t) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "relative -mb-px rounded-t-md px-4 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "border-b-2 border-brand text-fg"
                  : "border-b-2 border-transparent text-fg-muted hover:text-fg"
              )}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-8">
        {tab === "config" && (
          <ConfigTab config={config} onConfigChange={setConfig} />
        )}
        {tab === "knowledge" && <KnowledgeTab initial={initialSources} />}
        {tab === "conversations" && (
          <ConversationsTab initial={initialConversations} />
        )}
        {tab === "playground" && <PlaygroundTab configured={config.hasApiKey} />}
        {tab === "analytics" && (
          <AnalyticsTab conversations={initialConversations} />
        )}
      </div>
    </div>
  );
}
