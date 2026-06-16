import { Text } from "./Text";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export interface GroupedSectionProps {
  title?: string;
  className?: string;
  children: ReactNode;
}

/** iOS-style grouped list: a white rounded container with hairline row separators. */
export function GroupedSection({ title, className, children }: GroupedSectionProps) {
  return (
    <div className={className}>
      {title ? (
        <Text variant="footnote" bold tone="soft" className="mb-1.5 px-1">
          {title}
        </Text>
      ) : null}
      <div className={cn("divide-y divide-hairline overflow-hidden rounded-grouped bg-paper")}>
        {children}
      </div>
    </div>
  );
}
