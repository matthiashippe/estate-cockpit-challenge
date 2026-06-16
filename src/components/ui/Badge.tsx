import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export type BadgeTone = "brand" | "neutral" | "gold" | "danger" | "warning";

const TONE: Record<BadgeTone, string> = {
  brand: "bg-brand-tint text-brand",
  neutral: "bg-black/5 text-ink-soft",
  gold: "bg-gold-tint text-gold-deep",
  danger: "bg-terracotta-tint text-terracotta",
  warning: "bg-warning-tint text-warning-ink",
};

export interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: ReactNode;
}

/** Small status pill. */
export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-caption font-bold",
        TONE[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
