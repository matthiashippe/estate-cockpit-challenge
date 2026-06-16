import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

/**
 * The "Chassis" — the app's signature layout. A vertical stack of cream cards
 * separated by thin dark seams: the near-black canvas shows only in the 4px
 * gaps. The stack is clipped into one rounded panel; the cards inside render
 * `flush` (no own radius).
 */
export function Chassis({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("overflow-hidden rounded-card-lg border border-line bg-canvas", className)}>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}
