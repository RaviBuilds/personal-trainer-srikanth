import type { PricingGroup } from "./site-content";

const rupees = new Intl.NumberFormat("en-IN");

export function formatRupees(amount: number): string {
  return `\u20B9${rupees.format(amount)}`;
}

/** Term totals are never stored: always the monthly fee multiplied by the months. */
export function termTotal(monthly: number, months: number): number {
  return monthly * months;
}

export function lowestMonthly(groups: readonly PricingGroup[]): number {
  return Math.min(...groups.flatMap((group) => group.plans.map((plan) => plan.monthly)));
}

/** Lowest monthly fee in a group; "from" applies only when the group has more than one plan. */
export function groupStartingPrice(group: PricingGroup): { amount: number; isFrom: boolean } {
  return { amount: Math.min(...group.plans.map((plan) => plan.monthly)), isFrom: group.plans.length > 1 };
}
