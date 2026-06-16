import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { InsuranceSection } from "../InsuranceSection";
import { useAppStore } from "@/store/useAppStore";
import { fetchInsurances } from "@/lib/mock-api";
import type { InsurancePolicy } from "@/lib/types";

// Mock the network layer so the test is fast and deterministic.
vi.mock("@/lib/mock-api", () => ({
  fetchInsurances: vi.fn(),
  createInsurance: vi.fn(),
  simulateRequest: vi.fn(),
}));

const hausrat: InsurancePolicy = {
  id: "ins_2",
  type: "hausrat",
  provider: "HUK-Coburg",
  sumInsured: 30000,
  premiumPerYear: 96,
};

beforeEach(() => {
  useAppStore.setState({ insurances: [], status: "idle" });
  vi.clearAllMocks();
});

describe("InsuranceSection", () => {
  it("zeigt vorhandene Policen nach dem Laden", async () => {
    vi.mocked(fetchInsurances).mockResolvedValue([hausrat]);

    render(<InsuranceSection />);

    expect(await screen.findByText("Hausrat")).toBeInTheDocument();
    expect(screen.getByText("HUK-Coburg")).toBeInTheDocument();
  });

  it("zeigt den Leerzustand, wenn keine Policen existieren", async () => {
    vi.mocked(fetchInsurances).mockResolvedValue([]);

    render(<InsuranceSection />);

    expect(await screen.findByText("Noch keine Versicherungen erfasst.")).toBeInTheDocument();
  });
});
