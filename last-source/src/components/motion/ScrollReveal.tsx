"use client";

/**
 * Safety wrapper:
 * keep content always visible to avoid mobile/hydration visibility issues.
 */

export function ScrollReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return <div className={className}>{children}</div>;
}
