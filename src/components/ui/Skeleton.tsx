import { cn } from "@/lib/cn";

/** Shimmering placeholder block for loading states. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-grouped bg-black/5", className)} aria-hidden />;
}
