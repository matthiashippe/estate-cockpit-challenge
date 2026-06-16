"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { DashboardCardHeader } from "@/components/ui/DashboardCardHeader";
import { CardFooterLink } from "@/components/ui/CardFooterLink";
import { Text } from "@/components/ui/Text";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { Skeleton } from "@/components/ui/Skeleton";
import { EmptyState } from "@/components/ui/EmptyState";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useAppStore } from "@/store/useAppStore";
import { formatEuro } from "@/lib/format";
import { InventoryRow } from "./InventoryRow";
import { AddInventorySheet } from "./AddInventorySheet";

export function InventorySection() {
  const inventory = useAppStore((s) => s.inventory);
  const inventoryStatus = useAppStore((s) => s.inventoryStatus);
  const loadInventory = useAppStore((s) => s.loadInventory);
  const insurances = useAppStore((s) => s.insurances);
  const loadInsurances = useAppStore((s) => s.loadInsurances);

  const [addOpen, setAddOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    loadInventory();
    // The under-insurance check needs the Hausrat sum, so make sure the
    // insurance data is loaded too (no-op if another card already did it).
    loadInsurances();
  }, [loadInventory, loadInsurances]);

  const loading = inventoryStatus === "idle" || inventoryStatus === "loading";
  const error = inventoryStatus === "error";
  const empty = inventoryStatus === "ready" && inventory.length === 0;

  const totalValue = inventory.reduce((sum, item) => sum + item.value, 0);
  const hausrat = insurances.find((policy) => policy.type === "hausrat");
  const coverage = hausrat?.sumInsured ?? null;

  // Compare the contents value against the Hausrat (home-contents) sum insured.
  const status =
    coverage === null
      ? null
      : totalValue > coverage
        ? {
            tone: "warning" as const,
            icon: "warning" as const,
            label: "Unterversichert",
            note: `Übersteigt die Hausrat-Summe (${formatEuro(coverage)}) um ${formatEuro(
              totalValue - coverage,
            )}.`,
          }
        : {
            tone: "brand" as const,
            icon: "check" as const,
            label: "Gedeckt",
            note: `Im Rahmen der Hausrat-Summe (${formatEuro(coverage)}) · Puffer ${formatEuro(
              coverage - totalValue,
            )}.`,
          };

  return (
    <Card flush>
      <DashboardCardHeader title="Inventar" onInfo={() => setInfoOpen(true)} />

      {loading ? (
        <div className="mt-2 space-y-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      ) : error ? (
        <div className="mt-3 flex flex-col items-start gap-3">
          <Text variant="subhead" tone="danger">
            Inventar konnte nicht geladen werden.
          </Text>
          <Button variant="outline" size="compact" onClick={loadInventory}>
            Erneut versuchen
          </Button>
        </div>
      ) : empty ? (
        <EmptyState
          icon="box"
          title="Noch kein Inventar erfasst"
          description="Erfasse wertvolle Gegenstände, um ihren Wert im Blick zu behalten."
        />
      ) : (
        <>
          <div className="mt-3">
            <div className="flex items-end justify-between gap-3">
              <div>
                <Text variant="footnote" tone="soft">
                  Gesamtwert
                </Text>
                <Text variant="title2" className="mt-0.5 tabular-nums">
                  {formatEuro(totalValue)}
                </Text>
              </div>
              {status ? (
                <Badge tone={status.tone}>
                  <Icon name={status.icon} size={12} />
                  {status.label}
                </Badge>
              ) : null}
            </div>
            {status ? (
              <Text variant="caption" tone="soft" className="mt-1.5">
                {status.note}
              </Text>
            ) : null}
          </div>

          <div className="mt-2 divide-y divide-hairline border-t border-hairline">
            {inventory.map((item) => (
              <InventoryRow key={item.id} item={item} />
            ))}
          </div>
        </>
      )}

      <CardFooterLink label="Gegenstand hinzufügen" onClick={() => setAddOpen(true)} />

      <AddInventorySheet open={addOpen} onClose={() => setAddOpen(false)} />

      <BottomSheet
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="Inventar"
        subtitle="Die wertvollen Dinge in dieser Immobilie."
      >
        <Text variant="body" tone="soft">
          Hier erfasst du wertvolle Gegenstände — vom Designer-Möbel über Technik bis zu Schmuck.
          Der Gesamtwert wird automatisch mit deiner Hausrat-Versicherungssumme abgeglichen, damit
          du früh erkennst, ob du unterversichert bist.
        </Text>
      </BottomSheet>
    </Card>
  );
}
