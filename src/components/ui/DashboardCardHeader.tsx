"use client";

import { Text } from "./Text";
import { Icon } from "./Icon";
import type { ReactNode } from "react";

export interface DashboardCardHeaderProps {
  title: string;
  onInfo?: () => void;
  action?: ReactNode;
}

/** Level-1 card heading: a title3 + an optional ⓘ info affordance + optional action. */
export function DashboardCardHeader({ title, onInfo, action }: DashboardCardHeaderProps) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-1.5">
        <Text variant="title3" as="h2">
          {title}
        </Text>
        {onInfo ? (
          <button
            type="button"
            onClick={onInfo}
            aria-label="Mehr Informationen"
            className="text-ink-faint transition-colors hover:text-ink-soft"
          >
            <Icon name="info" size={18} />
          </button>
        ) : null}
      </div>
      {action}
    </div>
  );
}
