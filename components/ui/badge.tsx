import * as React from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
  tone = "default",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "brand" | "success";
}) {
  const tones = {
    default: "border-border bg-white/[0.04] text-fg-muted",
    brand:
      "border-brand/30 bg-brand/10 text-brand",
    success:
      "border-success/30 bg-success/10 text-success",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
