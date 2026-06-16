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
