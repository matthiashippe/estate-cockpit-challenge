import { Text } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";
import { INSURANCE_LABELS, type InsurancePolicy } from "@/lib/types";
import { formatEuro } from "@/lib/format";

export function InsuranceRow({ policy }: { policy: InsurancePolicy }) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-tint text-brand">
        <Icon name="shield" size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <Text variant="callout" bold>
          {INSURANCE_LABELS[policy.type]}
        </Text>
        <Text variant="footnote" tone="soft">
          {policy.provider}
        </Text>
      </div>
      <div className="text-right">
        {policy.sumInsured != null ? (
          <Text variant="callout" bold>
            {formatEuro(policy.sumInsured)}
          </Text>
        ) : (
          <Text variant="footnote" tone="faint">
            —
          </Text>
        )}
        <Text variant="caption2" tone="faint">
          {formatEuro(policy.premiumPerYear)}/Jahr
        </Text>
      </div>
    </div>
  );
}
