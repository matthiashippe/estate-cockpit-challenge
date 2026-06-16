"use client";

import { Chassis } from "@/components/ui/Chassis";
import { GlassButton } from "@/components/ui/GlassButton";
import { Text } from "@/components/ui/Text";
import { PropertyHero } from "./PropertyHero";
import { InsuranceSection } from "@/features/insurance/InsuranceSection";
import { InventorySection } from "@/features/inventory/InventorySection";
import { property } from "@/lib/mock-data";

export function Cockpit() {
  return (
    <main className="mx-auto w-full max-w-[600px] px-5 py-10">
      <header className="mb-6 flex items-end justify-between">
        <div>
          <Text variant="footnote" bold tone="soft">
            Übersicht
          </Text>
          <Text variant="largeTitle" as="h1" className="mt-0.5 tracking-tight">
            Cockpit
          </Text>
        </div>
        <GlassButton icon="house" label="Immobilie" />
      </header>

      <Chassis>
        <PropertyHero property={property} />
        <InsuranceSection />
        <InventorySection />
      </Chassis>
    </main>
  );
}
