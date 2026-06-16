import { create } from "zustand";
import {
  fetchInsurances,
  createInsurance,
  fetchInventory,
  createInventoryItem,
} from "@/lib/mock-api";
import type { InsurancePolicy, NewInsurance, InventoryItem, NewInventoryItem } from "@/lib/types";

type Status = "idle" | "loading" | "ready" | "error";

interface AppState {
  insurances: InsurancePolicy[];
  status: Status;
  loadInsurances: () => Promise<void>;
  addInsurance: (input: NewInsurance) => Promise<void>;

  inventory: InventoryItem[];
  inventoryStatus: Status;
  loadInventory: () => Promise<void>;
  addInventoryItem: (input: NewInventoryItem) => Promise<void>;
}

export const useAppStore = create<AppState>((set, get) => ({
  insurances: [],
  status: "idle",

  loadInsurances: async () => {
    const { status } = get();
    if (status === "loading" || status === "ready") return;
    set({ status: "loading" });
    try {
      const data = await fetchInsurances();
      set({ insurances: data, status: "ready" });
    } catch {
      set({ status: "error" });
    }
  },

  addInsurance: async (input) => {
    const created = await createInsurance(input);
    set({ insurances: [...get().insurances, created] });
  },

  inventory: [],
  inventoryStatus: "idle",

  loadInventory: async () => {
    const { inventoryStatus } = get();
    if (inventoryStatus === "loading" || inventoryStatus === "ready") return;
    set({ inventoryStatus: "loading" });
    try {
      const data = await fetchInventory();
      set({ inventory: data, inventoryStatus: "ready" });
    } catch {
      set({ inventoryStatus: "error" });
    }
  },

  addInventoryItem: async (input) => {
    const created = await createInventoryItem(input);
    set({ inventory: [...get().inventory, created] });
  },
}));
