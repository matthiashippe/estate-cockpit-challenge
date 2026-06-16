"use client";

import {
  Plus,
  X,
  Check,
  ShieldCheck,
  Package,
  Warning,
  Info,
  CaretRight,
  CaretDown,
  Trash,
  PencilSimple,
  House,
  Camera,
  Tag,
  Sparkle,
  type IconProps as PhosphorIconProps,
} from "@phosphor-icons/react";

const MAP = {
  plus: Plus,
  close: X,
  check: Check,
  shield: ShieldCheck,
  box: Package,
  warning: Warning,
  info: Info,
  "chevron-right": CaretRight,
  "chevron-down": CaretDown,
  trash: Trash,
  edit: PencilSimple,
  house: House,
  camera: Camera,
  tag: Tag,
  sparkle: Sparkle,
} as const;

export type IconName = keyof typeof MAP;

export interface IconProps {
  name: IconName;
  size?: number;
  weight?: PhosphorIconProps["weight"];
  className?: string;
}

/** Wraps the icon set so call sites use a stable name vocabulary. */
export function Icon({ name, size = 22, weight = "regular", className }: IconProps) {
  const Glyph = MAP[name];
  return <Glyph size={size} weight={weight} className={className} aria-hidden />;
}
