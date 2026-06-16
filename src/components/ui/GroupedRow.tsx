"use client";

import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export interface GroupedRowProps {
  onClick?: () => void;
  className?: string;
  children: ReactNode;
}

/** A single row inside a GroupedSection (min 44px tall). Tappable when `onClick` is set. */
export function GroupedRow({ onClick, className, children }: GroupedRowProps) {
  const base = "flex min-h-11 w-full items-center gap-3 px-4 py-2.5 text-left";
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(base, "transition-colors hover:bg-black/5", className)}
      >
        {children}
      </button>
    );
  }
  return <div className={cn(base, className)}>{children}</div>;
}
