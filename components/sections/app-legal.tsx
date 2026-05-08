import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container, Section } from "@/components/ui/container";

export function AppLegal({
  appName,
  appHref,
  title,
  updated,
  children,
}: {
  appName: string;
  appHref: string;
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <Section className="pt-40">
      <Container size="sm">
        <Link
          href={appHref}
          className="inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-3.5" /> Zurück zu {appName}
        </Link>
        <h1 className="font-display mt-6 text-4xl font-semibold tracking-tight text-fg sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-fg-subtle">Stand: {updated}</p>
        <article className="prose-legal mt-10">{children}</article>
      </Container>
    </Section>
  );
}
