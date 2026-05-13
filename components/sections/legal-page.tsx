import { Container, Section } from "@/components/ui/container";

export function LegalPage({
  title,
  html,
  sectionClassName = "pt-40",
}: {
  title: string;
  html: string;
  sectionClassName?: string;
}) {
  return (
    <Section className={sectionClassName}>
      <Container size="sm">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-fg sm:text-4xl md:text-5xl">
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
