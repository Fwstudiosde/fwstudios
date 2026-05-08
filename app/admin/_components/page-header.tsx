import * as React from "react";

export function PageHeader({
  title,
  description,
  children,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-fg">
          {title}
        </h1>
        {description && (
          <p className="mt-1.5 text-sm text-fg-muted">{description}</p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  trend,
}: {
  label: string;
  value: React.ReactNode;
  hint?: React.ReactNode;
  trend?: { value: string; positive?: boolean };
}) {
  return (
    <div className="rounded-2xl border border-border bg-gradient-to-b from-white/[0.03] to-white/[0.005] p-5 backdrop-blur">
      <div className="flex items-center justify-between text-xs font-medium text-fg-subtle">
        <span>{label}</span>
        {trend && (
          <span
            className={`rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${
              trend.positive
                ? "bg-success/15 text-success"
                : "bg-danger/15 text-danger"
            }`}
          >
            {trend.value}
          </span>
        )}
      </div>
      <div className="mt-2 font-display text-3xl font-semibold tracking-tight text-fg">
        {value}
      </div>
      {hint && <div className="mt-1 text-xs text-fg-muted">{hint}</div>}
    </div>
  );
}
