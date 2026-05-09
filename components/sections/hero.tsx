import { Button } from "@/components/ui/button";
import { Container, Eyebrow } from "@/components/ui/container";
import { ArrowRight, Sparkles } from "lucide-react";
import { ChatbotPreview } from "./chatbot-preview";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-40 sm:pb-24 md:pt-48 md:pb-32">
      {/* Background layers */}
      <div className="absolute inset-0 bg-grid" aria-hidden />
      <div
        className="orb left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 bg-brand/30"
        aria-hidden
      />
      <div
        className="orb right-[-10%] top-32 h-[500px] w-[500px] bg-accent-purple/30"
        aria-hidden
      />
      <div
        className="orb left-[-10%] top-[40%] h-[400px] w-[400px] bg-brand-2/20"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <Eyebrow>
            <Sparkles className="size-3" /> KI-Chatbots & maßgeschneiderte
            Plattformen
          </Eyebrow>

          <h1 className="font-display mt-6 text-[2.25rem] font-semibold leading-[1.05] tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="text-gradient">KI, die für Ihr</span>
            <br />
            <span className="text-gradient-brand">Geschäft arbeitet.</span>
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-relaxed text-fg-muted sm:mt-6 sm:text-lg md:text-xl">
            FWStudios baut produktionsreife KI-Chatbots, automatisierte
            Workflows und digitale Plattformen — schnell ausgeliefert,
            wartungsarm im Betrieb, messbar im Ergebnis.
          </p>

          <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:flex-row sm:items-center">
            <Button href="/#kontakt" variant="brand" size="lg">
              Beratung anfragen <ArrowRight className="size-4" />
            </Button>
            <Button href="/chatbot" variant="secondary" size="lg">
              Chatbot ansehen
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-xs text-fg-subtle">
            <span className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-success shadow-[0_0_8px_var(--color-success)]" />
              Made in Germany
            </span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="hidden sm:inline">DSGVO-konform</span>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span className="hidden sm:inline">EU-Hosting</span>
          </div>
        </div>

        {/* Hero visual */}
        <div className="relative mx-auto mt-14 max-w-5xl sm:mt-20">
          <div className="absolute -inset-x-12 -inset-y-8 -z-10 rounded-[40px] bg-gradient-to-b from-brand/20 via-accent-purple/10 to-transparent blur-3xl" />
          <ChatbotPreview />
        </div>
      </Container>
    </section>
  );
}
