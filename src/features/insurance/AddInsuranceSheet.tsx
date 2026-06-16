"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Field, TextInput } from "@/components/ui/Field";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/useAppStore";
import { INSURANCE_LABELS, type InsuranceType } from "@/lib/types";

const TYPES = Object.keys(INSURANCE_LABELS) as InsuranceType[];

export function AddInsuranceSheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const addInsurance = useAppStore((s) => s.addInsurance);

  const [type, setType] = useState<InsuranceType>("hausrat");
  const [provider, setProvider] = useState("");
  const [sumInsured, setSumInsured] = useState("");
  const [premium, setPremium] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function reset() {
    setType("hausrat");
    setProvider("");
    setSumInsured("");
    setPremium("");
    setError(null);
  }

  async function handleSubmit() {
    if (!provider.trim()) {
      setError("Bitte einen Anbieter angeben.");
      return;
    }
    setSaving(true);
    try {
      await addInsurance({
        type,
        provider: provider.trim(),
        sumInsured: sumInsured ? Number(sumInsured) : undefined,
        premiumPerYear: premium ? Number(premium) : 0,
      });
      reset();
      onClose();
    } finally {
      setSaving(false);
    }
  }

  return (
    <BottomSheet
      open={open}
      onClose={onClose}
      title="Versicherung hinzufügen"
      subtitle="Police zu dieser Immobilie."
    >
      <div className="space-y-4">
        <Field label="Art">
          <div className="flex flex-wrap gap-2">
            {TYPES.map((t) => (
              <Chip key={t} selected={type === t} onClick={() => setType(t)}>
                {INSURANCE_LABELS[t]}
              </Chip>
            ))}
          </div>
        </Field>

        <Field label="Anbieter" error={error ?? undefined} htmlFor="provider">
          <TextInput
            id="provider"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
            placeholder="z. B. Allianz"
          />
        </Field>

        <Field label="Versicherungssumme (€)" htmlFor="sum">
          <TextInput
            id="sum"
            inputMode="numeric"
            value={sumInsured}
            onChange={(e) => setSumInsured(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="optional"
          />
        </Field>

        <Field label="Beitrag pro Jahr (€)" htmlFor="premium">
          <TextInput
            id="premium"
            inputMode="numeric"
            value={premium}
            onChange={(e) => setPremium(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="z. B. 96"
          />
        </Field>

        <Button onClick={handleSubmit} loading={saving} className="w-full">
          Hinzufügen
        </Button>
      </div>
    </BottomSheet>
  );
}
