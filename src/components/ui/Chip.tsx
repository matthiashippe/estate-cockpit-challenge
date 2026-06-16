"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export interface ChipProps {
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

/** A pressable pill — use for single-select option groups and filters. */
export function Chip({ selected = false, onClick, className, children }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3.5 py-1.5 text-footnote font-bold transition-colors",
        selected
          ? "border-brand bg-brand text-white"
          : "border-line bg-cream text-ink-soft hover:border-brand/40",
        className,
      )}
    >
      {children}
    </button>
  );
}
