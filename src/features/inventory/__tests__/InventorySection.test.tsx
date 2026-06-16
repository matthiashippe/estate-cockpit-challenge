import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { InventorySection } from "../InventorySection";
import { useAppStore } from "@/store/useAppStore";
import { fetchInventory, fetchInsurances } from "@/lib/mock-api";
import type { InventoryItem, InsurancePolicy } from "@/lib/types";

// Mock the network layer so the test is fast and deterministic.
vi.mock("@/lib/mock-api", () => ({
  fetchInventory: vi.fn(),
  createInventoryItem: vi.fn(),
  fetchInsurances: vi.fn(),
  createInsurance: vi.fn(),
  simulateRequest: vi.fn(),
}));

const sideboard: InventoryItem = {
  id: "inv_1",
  name: "USM Haller Sideboard",
  category: "moebel",
  value: 4200,
};

const hausrat: InsurancePolicy = {
  id: "ins_2",
  type: "hausrat",
  provider: "HUK-Coburg",
  sumInsured: 30000,
  premiumPerYear: 96,
};

beforeEach(() => {
  useAppStore.setState({
    inventory: [],
    inventoryStatus: "idle",
    insurances: [],
    status: "idle",
  });
  vi.clearAllMocks();
  vi.mocked(fetchInsurances).mockResolvedValue([hausrat]);
});

describe("InventorySection", () => {
  it("zeigt vorhandene Gegenstände nach dem Laden", async () => {
    vi.mocked(fetchInventory).mockResolvedValue([sideboard]);

    render(<InventorySection />);

    expect(await screen.findByText("USM Haller Sideboard")).toBeInTheDocument();
    expect(screen.getByText("Möbel")).toBeInTheDocument();
  });

  it("zeigt den Leerzustand, wenn kein Inventar existiert", async () => {
    vi.mocked(fetchInventory).mockResolvedValue([]);

    render(<InventorySection />);

    expect(await screen.findByText("Noch kein Inventar erfasst")).toBeInTheDocument();
  });

  it("warnt vor Unterversicherung, wenn der Wert die Hausrat-Summe übersteigt", async () => {
    const tooValuable: InventoryItem = { ...sideboard, value: 50000 };
    vi.mocked(fetchInventory).mockResolvedValue([tooValuable]);

    render(<InventorySection />);

    expect(await screen.findByText("Unterversichert")).toBeInTheDocument();
  });
});
