import { Container, Section } from "@/components/ui/container";

export function LegalPage({
  title,
  html,
}: {
  title: string;
  html: string;
}) {
  return (
    <Section className="pt-40">
      <Container size="sm">
        <h1 className="font-display text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          {title}
        </h1>
        <article
          className="prose-legal mt-10"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </Section>
  );
}
