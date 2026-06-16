import type { InsurancePolicy, Property } from "./types";

export const property: Property = {
  id: "prop_eppendorf",
  title: "Eigentumswohnung Eppendorf",
  address: "Eppendorfer Weg 12, 20259 Hamburg",
  kind: "Eigentumswohnung",
  estimatedValue: 545000,
  valueTrend: 12400,
};

export const seedInsurances: InsurancePolicy[] = [
  {
    id: "ins_1",
    type: "wohngebaeude",
    provider: "Allianz",
    sumInsured: 320000,
    premiumPerYear: 540,
    renewalDate: "2026-09-01",
  },
  {
    id: "ins_2",
    type: "hausrat",
    provider: "HUK-Coburg",
    sumInsured: 30000,
    premiumPerYear: 96,
    renewalDate: "2026-04-15",
  },
  {
    id: "ins_3",
    type: "haftpflicht",
    provider: "HanseMerkur",
    premiumPerYear: 72,
  },
];
