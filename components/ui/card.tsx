import * as React from "react";
import { cn } from "@/lib/utils";

export function Card({
  className,
  children,
  interactive = false,
}: {
  className?: string;
  children: React.ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-border bg-gradient-to-b from-white/[0.04] to-white/[0.01] p-6 backdrop-blur",
        interactive &&
          "transition-all duration-300 hover:border-border-strong hover:from-white/[0.06] hover:to-white/[0.02]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  icon,
  title,
  className,
}: {
  icon?: React.ReactNode;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      {icon && (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-white/[0.03] text-brand">
          {icon}
        </div>
      )}
      <h3 className="font-display text-lg font-semibold text-fg pt-1.5">
        {title}
      </h3>
    </div>
  );
}
