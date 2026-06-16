"use client";

import { Text } from "./Text";
import { Icon } from "./Icon";

export interface CardFooterLinkProps {
  label: string;
  onClick: () => void;
}

/** The brand-tinted "add / more" row at the bottom of a cockpit card. */
export function CardFooterLink({ label, onClick }: CardFooterLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 flex min-h-11 w-full items-center justify-between gap-3 rounded-grouped bg-brand/10 px-4 py-2 text-left text-brand transition-colors hover:bg-brand/15"
    >
      <Text variant="subhead" tone="brand" bold>
        {label}
      </Text>
      <Icon name="chevron-right" size={16} />
    </button>
  );
}
