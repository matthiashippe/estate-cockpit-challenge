"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/Card";
import { DashboardCardHeader } from "@/components/ui/DashboardCardHeader";
import { CardFooterLink } from "@/components/ui/CardFooterLink";
import { Text } from "@/components/ui/Text";
import { Skeleton } from "@/components/ui/Skeleton";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { useAppStore } from "@/store/useAppStore";
import { InsuranceRow } from "./InsuranceRow";
import { AddInsuranceSheet } from "./AddInsuranceSheet";

export function InsuranceSection() {
  const insurances = useAppStore((s) => s.insurances);
  const status = useAppStore((s) => s.status);
  const loadInsurances = useAppStore((s) => s.loadInsurances);
  const [addOpen, setAddOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  useEffect(() => {
    loadInsurances();
  }, [loadInsurances]);

  const loading = status === "idle" || status === "loading";
  const empty = !loading && insurances.length === 0;

  return (
    <Card flush>
      <DashboardCardHeader title="Versicherungen" onInfo={() => setInfoOpen(true)} />

      {loading ? (
        <div className="mt-2 space-y-3">
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
          <Skeleton className="h-10" />
        </div>
      ) : empty ? (
        <Text variant="subhead" tone="soft" className="mt-3">
          Noch keine Versicherungen erfasst.
        </Text>
      ) : (
        <div className="mt-1 divide-y divide-hairline">
          {insurances.map((policy) => (
            <InsuranceRow key={policy.id} policy={policy} />
          ))}
        </div>
      )}

      <CardFooterLink label="Versicherung hinzufügen" onClick={() => setAddOpen(true)} />

      <AddInsuranceSheet open={addOpen} onClose={() => setAddOpen(false)} />

      <BottomSheet
        open={infoOpen}
        onClose={() => setInfoOpen(false)}
        title="Versicherungen"
        subtitle="Alle Policen zu dieser Immobilie."
      >
        <Text variant="body" tone="soft">
          Hier sammelst du die Versicherungen rund um die Immobilie — von der Wohngebäude- bis zur
          Haftpflichtversicherung. So hast du Summen und Beiträge an einem Ort.
        </Text>
      </BottomSheet>
    </Card>
  );
}
