import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";

export type CardVariant = "default" | "hero";

const PADDING: Record<CardVariant, string> = {
  default: "p-5",
  hero: "p-6",
};

const RADIUS: Record<CardVariant, string> = {
  default: "rounded-card",
  hero: "rounded-card-lg",
};

export interface CardProps {
  variant?: CardVariant;
  /** Drop the corner radius — use inside a `Chassis`, which clips the stack. */
  flush?: boolean;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** The cream card — the basic surface of the app. Flat (no shadow). */
export function Card({ variant = "default", flush = false, as, className, children }: CardProps) {
  const Component = as ?? "div";
  return (
    <Component
      className={cn("bg-cream text-ink", PADDING[variant], !flush && RADIUS[variant], className)}
    >
      {children}
    </Component>
  );
}
