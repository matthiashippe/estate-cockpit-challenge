export type InsuranceType =
  | "wohngebaeude"
  | "hausrat"
  | "haftpflicht"
  | "elementar"
  | "rechtsschutz";

export interface InsurancePolicy {
  id: string;
  type: InsuranceType;
  provider: string;
  /** Insured sum in euro. Not every policy type has one (e.g. Haftpflicht). */
  sumInsured?: number;
  premiumPerYear: number;
  /** ISO date string. */
  renewalDate?: string;
}

export type NewInsurance = Omit<InsurancePolicy, "id">;

export interface Property {
  id: string;
  title: string;
  address: string;
  kind: string;
  estimatedValue: number;
  /** 12-month change in estimated value, in euro. */
  valueTrend: number;
}

export const INSURANCE_LABELS: Record<InsuranceType, string> = {
  wohngebaeude: "Wohngebäude",
  hausrat: "Hausrat",
  haftpflicht: "Haftpflicht",
  elementar: "Elementar",
  rechtsschutz: "Rechtsschutz",
};

export type InventoryCategory = "moebel" | "technik" | "schmuck" | "kunst" | "sonstiges";

export interface InventoryItem {
  id: string;
  name: string;
  category: InventoryCategory;
  /** Estimated current value in euro. */
  value: number;
  /** ISO date string of purchase, optional. */
  purchaseDate?: string;
}

export type NewInventoryItem = Omit<InventoryItem, "id">;

export const INVENTORY_LABELS: Record<InventoryCategory, string> = {
  moebel: "Möbel",
  technik: "Technik",
  schmuck: "Schmuck",
  kunst: "Kunst",
  sonstiges: "Sonstiges",
};
