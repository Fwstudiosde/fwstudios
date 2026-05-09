import { ArrowRight, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";

const CONTACT_EMAIL = "accounts@fwstudios.de";
const CONTACT_PHONE_DISPLAY = "0162 7793119";
const CONTACT_PHONE_TEL = "+4901627793119";

export function CTA() {
  return (
    <Section className="border-t border-border">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-b from-surface-2 to-surface p-8 sm:p-12 lg:p-16">
          <div
            className="orb left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-brand/30"
            aria-hidden
          />
          <div
            className="orb right-0 bottom-0 h-[300px] w-[400px] translate-x-1/3 translate-y-1/3 bg-accent-purple/30"
            aria-hidden
          />
          <div className="relative mx-auto max-w-3xl text-center">
            <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-fg sm:text-5xl">
              Bereit, mit KI{" "}
              <span className="text-gradient-brand">zu liefern?</span>
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-fg-muted">
              Kostenloses Erstgespräch — 30 Minuten. Wir analysieren, ob und
              wie KI für Ihr Geschäft Wirkung entfalten kann. Ohne
              Verkaufsgespräch.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="/#kontakt" variant="brand" size="lg">
                Termin buchen <ArrowRight className="size-4" />
              </Button>
              <Button href="/chatbot" variant="secondary" size="lg">
                Chatbot ansehen
              </Button>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm text-fg-muted sm:flex-row sm:gap-6">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 hover:text-fg transition-colors"
              >
                <Mail className="size-4" />
                {CONTACT_EMAIL}
              </a>
              <a
                href={`tel:${CONTACT_PHONE_TEL}`}
                className="inline-flex items-center gap-2 hover:text-fg transition-colors"
              >
                <Phone className="size-4" />
                {CONTACT_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
