"use client";

import { motion, useReducedMotion } from "framer-motion";

const defaultTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px", amount: 0.15 }}
      transition={{ ...defaultTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
