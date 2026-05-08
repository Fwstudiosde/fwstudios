import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, Section } from "@/components/ui/container";
import { ContactForm } from "./contact-form";

export function CTA() {
  return (
    <Section id="kontakt" className="border-t border-border">
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
          <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight text-fg sm:text-5xl">
                Bereit, mit KI{" "}
                <span className="text-gradient-brand">zu liefern?</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-fg-muted">
                Kostenloses Erstgespräch — 30 Minuten. Wir analysieren, ob und
                wie KI für Ihr Geschäft Wirkung entfalten kann. Ohne
                Verkaufsgespräch.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button
                  href="mailto:hello@fwstudios.de"
                  variant="brand"
                  size="lg"
                >
                  Termin per E-Mail <ArrowRight className="size-4" />
                </Button>
                <Button href="/chatbot" variant="secondary" size="lg">
                  Chatbot ansehen
                </Button>
              </div>
            </div>
            <div className="relative">
              <ContactForm />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
