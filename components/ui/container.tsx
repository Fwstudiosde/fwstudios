import * as React from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: React.ReactNode;
  size?: "sm" | "default" | "lg" | "xl";
}) {
  const sizes = {
    sm: "max-w-3xl",
    default: "max-w-6xl",
    lg: "max-w-7xl",
    xl: "max-w-[88rem]",
  };
  return (
    <div className={cn("mx-auto w-full px-6 lg:px-8", sizes[size], className)}>
      {children}
    </div>
  );
}

export function Section({
  className,
  children,
  id,
}: {
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn("relative py-24 sm:py-32", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-white/[0.03] px-3 py-1 text-xs font-medium text-fg-muted backdrop-blur">
      <span className="size-1.5 rounded-full bg-brand shadow-[0_0_8px_var(--color-brand)]" />
      {children}
    </div>
  );
}
