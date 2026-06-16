"use client";

import { useState } from "react";
import { BottomSheet } from "@/components/ui/BottomSheet";
import { Field, TextInput } from "@/components/ui/Field";
import { Chip } from "@/components/ui/Chip";
import { Button } from "@/components/ui/Button";
import { useAppStore } from "@/store/useAppStore";
import { INVENTORY_LABELS, type InventoryCategory } from "@/lib/types";

const CATEGORIES = Object.keys(INVENTORY_LABELS) as InventoryCategory[];

/** Anything above this is almost certainly a typo for a household item. */
const MAX_PLAUSIBLE_VALUE = 1_000_000;

export function AddInventorySheet({ open, onClose }: { open: boolean; onClose: () => void }) {
  const addInventoryItem = useAppStore((s) => s.addInventoryItem);

  const [name, setName] = useState("");
  const [category, setCategory] = useState<InventoryCategory>("moebel");
  const [value, setValue] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [valueError, setValueError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function reset() {
    setName("");
    setCategory("moebel");
    setValue("");
    setPurchaseDate("");
    setNameError(null);
    setValueError(null);
  }

  function validate(): boolean {
    let ok = true;

    if (!name.trim()) {
      setNameError("Bitte einen Namen angeben.");
      ok = false;
    } else {
      setNameError(null);
    }

    const numeric = Number(value);
    if (!value.trim()) {
      setValueError("Bitte einen Wert angeben.");
      ok = false;
    } else if (!Number.isFinite(numeric) || numeric <= 0) {
      setValueError("Der Wert muss größer als 0 € sein.");
      ok = false;
    } else if (numeric > MAX_PLAUSIBLE_VALUE) {
      setValueError("Bitte einen realistischen Wert angeben.");
      ok = false;
    } else {
      setValueError(null);
    }

    return ok;
  }

  async function handleSubmit() {
    if (!validate()) return;
    setSaving(true);
    try {
      await addInventoryItem({
        name: name.trim(),
        category,
        value: Number(value),
        purchaseDate: purchaseDate || undefined,
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
      title="Gegenstand hinzufügen"
      subtitle="Ein wertvolles Stück in dieser Immobilie."
    >
      <div className="space-y-4">
        <Field label="Bezeichnung" error={nameError ?? undefined} htmlFor="inv-name">
          <TextInput
            id="inv-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="z. B. Designer-Sideboard"
          />
        </Field>

        <Field label="Kategorie">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <Chip key={c} selected={category === c} onClick={() => setCategory(c)}>
                {INVENTORY_LABELS[c]}
              </Chip>
            ))}
          </div>
        </Field>

        <Field label="Wert (€)" error={valueError ?? undefined} htmlFor="inv-value">
          <TextInput
            id="inv-value"
            inputMode="numeric"
            value={value}
            onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ""))}
            placeholder="z. B. 4200"
          />
        </Field>

        <Field label="Kaufdatum (optional)" htmlFor="inv-date">
          <TextInput
            id="inv-date"
            type="date"
            value={purchaseDate}
            onChange={(e) => setPurchaseDate(e.target.value)}
          />
        </Field>

        <Button onClick={handleSubmit} loading={saving} className="w-full">
          Hinzufügen
        </Button>
      </div>
    </BottomSheet>
  );
}
