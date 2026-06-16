import { create } from "zustand";
import { fetchInsurances, createInsurance } from "@/lib/mock-api";
import type { InsurancePolicy, NewInsurance } from "@/lib/types";

type Status = "idle" | "loading" | "ready" | "error";

interface AppState {
  insurances: InsurancePolicy[];
  status: Status;
  loadInsurances: () => Promise<void>;
  addInsurance: (input: NewInsurance) => Promise<void>;
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
}));
