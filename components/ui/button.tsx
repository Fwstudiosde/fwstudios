import * as React from "react";
import Link from "next/link";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium select-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-fg text-bg hover:bg-fg/90 shadow-[0_1px_0_rgba(255,255,255,0.4)_inset,0_8px_24px_-12px_rgba(255,255,255,0.5)]",
        brand:
          "text-bg bg-gradient-to-b from-[#5ee5ff] to-brand hover:to-[#19c4f0] shadow-[0_1px_0_rgba(255,255,255,0.45)_inset,0_8px_28px_-10px_rgba(0,212,255,0.6)]",
        secondary:
          "bg-white/[0.04] text-fg border border-border hover:bg-white/[0.08] hover:border-border-strong",
        ghost:
          "text-fg-muted hover:text-fg hover:bg-white/[0.05]",
        outline:
          "border border-border-strong text-fg hover:bg-white/[0.04]",
      },
      size: {
        sm: "h-8 px-3 text-sm rounded-md",
        md: "h-10 px-4 text-sm rounded-lg",
        lg: "h-12 px-6 text-[15px] rounded-lg",
        xl: "h-14 px-8 text-base rounded-xl",
        icon: "h-10 w-10 rounded-lg",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

type ButtonBaseProps = VariantProps<typeof buttonVariants> & {
  className?: string;
};

type ButtonProps = ButtonBaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };

type LinkButtonProps = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
    href: string;
  };

export function Button(props: ButtonProps | LinkButtonProps) {
  const { className, variant, size, ...rest } = props as ButtonBaseProps & {
    href?: string;
  } & Record<string, unknown>;

  const cls = cn(buttonVariants({ variant, size }), className);

  if ("href" in props && props.href) {
    const { href, ...anchorRest } = rest as LinkButtonProps;
    return (
      <Link href={href} className={cls} {...anchorRest}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={cls}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {props.children}
    </button>
  );
}

export { buttonVariants };
