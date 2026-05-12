import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { ChatbotWidget } from "@/components/site/chatbot-widget";
import { CookieBanner } from "@/components/site/cookie-banner";
import { getChatbotConfig } from "@/lib/chatbot/storage";

export const dynamic = "force-dynamic";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const config = await getChatbotConfig();
  return (
    <>
      <SiteHeader />
      <main className="relative">{children}</main>
      <SiteFooter />
      {config.hasApiKey && (
        <ChatbotWidget
          welcomeMessage={config.welcomeMessage}
          teaser={config.teaser}
        />
      )}
      <CookieBanner />
    </>
  );
}
