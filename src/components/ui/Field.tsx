import { cn } from "@/lib/cn";
import { Text } from "./Text";
import type { InputHTMLAttributes, ReactNode } from "react";

export interface FieldProps {
  label: string;
  error?: string;
  htmlFor?: string;
  children: ReactNode;
}

/** A labelled form field with optional error text. */
export function Field({ label, error, htmlFor, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block">
        <Text variant="footnote" bold as="span">
          {label}
        </Text>
      </label>
      {children}
      {error ? (
        <Text variant="caption" tone="danger" as="span">
          {error}
        </Text>
      ) : null}
    </div>
  );
}

/** Styled text input matching the design system. */
export function TextInput({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-line bg-white px-3.5 py-2.5 text-body text-ink",
        "outline-none placeholder:text-ink-faint focus:border-brand focus:ring-2 focus:ring-brand/20",
        className,
      )}
      {...props}
    />
  );
}
