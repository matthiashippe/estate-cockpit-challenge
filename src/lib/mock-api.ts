import { seedInsurances, seedInventory } from "./mock-data";
import type { InsurancePolicy, NewInsurance, InventoryItem, NewInventoryItem } from "./types";

/**
 * Simulates a network request: resolves with `value` after `ms`, or rejects
 * with probability `failRate` (0–1). Use this to build realistic loading and
 * error states. See DESIGN.md → "Daten & Mock-API".
 */
export function simulateRequest<T>(
  value: T,
  opts?: { ms?: number; failRate?: number },
): Promise<T> {
  const { ms = 600, failRate = 0 } = opts ?? {};
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failRate > 0 && Math.random() < failRate) {
        reject(new Error("Netzwerkfehler (simuliert)"));
      } else {
        resolve(value);
      }
    }, ms);
  });
}

export function fetchInsurances(): Promise<InsurancePolicy[]> {
  return simulateRequest(seedInsurances, { ms: 700 });
}

export function createInsurance(input: NewInsurance): Promise<InsurancePolicy> {
  const created: InsurancePolicy = {
    ...input,
    id: `ins_${crypto.randomUUID().slice(0, 8)}`,
  };
  return simulateRequest(created, { ms: 450 });
}

export function fetchInventory(): Promise<InventoryItem[]> {
  return simulateRequest(seedInventory, { ms: 750 });
}

export function createInventoryItem(input: NewInventoryItem): Promise<InventoryItem> {
  const created: InventoryItem = {
    ...input,
    id: `inv_${crypto.randomUUID().slice(0, 8)}`,
  };
  return simulateRequest(created, { ms: 450 });
}
