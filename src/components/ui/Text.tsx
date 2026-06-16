import { cn } from "@/lib/cn";
import type { ElementType, ReactNode } from "react";

export type TextVariant =
  | "display"
  | "figure"
  | "largeTitle"
  | "title1"
  | "title2"
  | "title3"
  | "headline"
  | "body"
  | "callout"
  | "subhead"
  | "footnote"
  | "caption"
  | "caption2";

export type TextTone =
  | "default"
  | "soft"
  | "faint"
  | "inverse"
  | "inverseSoft"
  | "brand"
  | "danger";

const VARIANT_FONT: Record<TextVariant, string> = {
  display: "font-heading font-bold text-display",
  figure: "font-heading font-bold text-figure",
  largeTitle: "font-heading font-bold text-large-title",
  title1: "font-heading font-bold text-title1",
  title2: "font-heading font-bold text-title2",
  title3: "font-heading font-bold text-title3",
  headline: "font-body font-bold text-headline",
  body: "font-body text-body",
  callout: "font-body text-callout",
  subhead: "font-body text-subhead",
  footnote: "font-body text-footnote",
  caption: "font-body text-caption",
  caption2: "font-body text-caption2",
};

const TONE_COLOR: Record<TextTone, string> = {
  default: "text-ink",
  soft: "text-ink-soft",
  faint: "text-ink-faint",
  inverse: "text-cream",
  inverseSoft: "text-cream/70",
  brand: "text-brand",
  danger: "text-terracotta",
};

const DEFAULT_TONE: Record<TextVariant, TextTone> = {
  display: "default",
  figure: "default",
  largeTitle: "default",
  title1: "default",
  title2: "default",
  title3: "default",
  headline: "default",
  body: "default",
  callout: "default",
  subhead: "soft",
  footnote: "soft",
  caption: "faint",
  caption2: "faint",
};

export interface TextProps {
  variant?: TextVariant;
  tone?: TextTone;
  as?: ElementType;
  bold?: boolean;
  className?: string;
  children: ReactNode;
}

/**
 * The one text primitive. Pick a `variant` (role) and an optional `tone`
 * (color) — never set raw font sizes or colors at the call site.
 */
export function Text({ variant = "body", tone, as, bold, className, children }: TextProps) {
  const Component = as ?? "p";
  return (
    <Component
      className={cn(
        VARIANT_FONT[variant],
        TONE_COLOR[tone ?? DEFAULT_TONE[variant]],
        bold && "font-bold",
        className,
      )}
    >
      {children}
    </Component>
  );
}
