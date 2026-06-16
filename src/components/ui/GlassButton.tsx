"use client";

import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export interface GlassButtonProps {
  icon: IconName;
  label: string;
  onClick?: () => void;
  className?: string;
}

/** The translucent "liquid glass" disc button (e.g. the sheet close button). */
export function GlassButton({ icon, label, onClick, className }: GlassButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/60",
        "bg-white/65 text-ink shadow-glass backdrop-blur transition active:opacity-85",
        className,
      )}
    >
      <Icon name={icon} size={20} />
    </button>
  );
}
