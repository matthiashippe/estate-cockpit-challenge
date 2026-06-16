import { Text } from "./Text";
import { GlassButton } from "./GlassButton";

export interface SheetHeaderProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
}

/** Shared header for bottom sheets: title + optional subtitle + glass close. */
export function SheetHeader({ title, subtitle, onClose }: SheetHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 pb-4">
      <div className="min-w-0">
        <Text variant="title2" as="h2">
          {title}
        </Text>
        {subtitle ? (
          <Text variant="footnote" className="mt-0.5">
            {subtitle}
          </Text>
        ) : null}
      </div>
      <GlassButton icon="close" label="Schließen" onClick={onClose} />
    </div>
  );
}
