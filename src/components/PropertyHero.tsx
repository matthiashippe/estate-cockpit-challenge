import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { formatEuro } from "@/lib/format";
import type { Property } from "@/lib/types";

export function PropertyHero({ property }: { property: Property }) {
  return (
    <Card variant="hero" flush>
      <Text variant="footnote" bold tone="soft">
        Geschätzter Wert
      </Text>
      <Text variant="figure" className="mt-1.5 tracking-tight tabular-nums">
        {formatEuro(property.estimatedValue)}
      </Text>

      <div className="mt-3">
        <span className="inline-flex items-center gap-1 rounded-full bg-brand/10 px-2.5 py-1">
          <Text variant="caption" bold tone="brand">
            ↑ {formatEuro(property.valueTrend)} · 12 Mt.
          </Text>
        </span>
      </div>

      <div className="mt-6 border-t border-hairline pt-4">
        <Text variant="footnote" tone="soft">
          {property.kind} · {property.address}
        </Text>
      </div>
    </Card>
  );
}
