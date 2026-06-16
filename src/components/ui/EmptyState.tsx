import { Icon, type IconName } from "./Icon";
import { Text } from "./Text";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  icon: IconName;
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Friendly placeholder shown when a list has no items yet. */
export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
      <span className="mb-1 inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand-tint text-brand">
        <Icon name={icon} size={24} />
      </span>
      <Text variant="headline">{title}</Text>
      {description ? (
        <Text variant="footnote" className="max-w-xs">
          {description}
        </Text>
      ) : null}
      {action ? <div className="mt-3">{action}</div> : null}
    </div>
  );
}
