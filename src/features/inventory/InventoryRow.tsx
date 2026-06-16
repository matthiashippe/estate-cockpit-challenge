import { Text } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";
import { INVENTORY_LABELS, type InventoryItem } from "@/lib/types";
import { formatEuro, formatDate } from "@/lib/format";

export function InventoryRow({ item }: { item: InventoryItem }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
        <Icon name="box" size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <Text variant="callout" bold className="truncate">
          {item.name}
        </Text>
        <Text variant="footnote" tone="soft">
          {INVENTORY_LABELS[item.category]}
        </Text>
      </div>
      <div className="text-right">
        <Text variant="callout" bold className="tabular-nums">
          {formatEuro(item.value)}
        </Text>
        {item.purchaseDate ? (
          <Text variant="caption2" tone="faint">
            seit {formatDate(item.purchaseDate)}
          </Text>
        ) : null}
      </div>
    </div>
  );
}
