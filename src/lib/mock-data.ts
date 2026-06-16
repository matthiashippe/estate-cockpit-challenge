import type { InsurancePolicy, InventoryItem, Property } from "./types";

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

export const seedInventory: InventoryItem[] = [
  {
    id: "inv_1",
    name: "USM Haller Sideboard",
    category: "moebel",
    value: 4200,
    purchaseDate: "2022-03-10",
  },
  {
    id: "inv_2",
    name: "Vitra Eames Lounge Chair",
    category: "moebel",
    value: 5900,
    purchaseDate: "2021-09-15",
  },
  {
    id: "inv_3",
    name: 'MacBook Pro 16"',
    category: "technik",
    value: 2600,
    purchaseDate: "2023-11-02",
  },
  {
    id: "inv_4",
    name: "Sonos Arc Soundsystem",
    category: "technik",
    value: 1500,
  },
  {
    id: "inv_5",
    name: "Eheringe (Paar)",
    category: "schmuck",
    value: 3800,
    purchaseDate: "2020-06-19",
  },
  {
    id: "inv_6",
    name: "Kunstdruck (signiert)",
    category: "kunst",
    value: 6500,
    purchaseDate: "2023-02-01",
  },
];
