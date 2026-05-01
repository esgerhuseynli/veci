"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { HeroPetalDecor } from "./HeroPetalDecor";

type Props = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
};

export function HeroParallax({
  children,
  className = "",
  id,
  "aria-labelledby": aria,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yBg = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 64]);
  const yPetal = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 32]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative flex min-h-[calc(100dvh-4.5rem)] flex-col items-center justify-center overflow-hidden bg-cream px-4 py-20 sm:min-h-[calc(100dvh-5rem)] sm:px-6 ${className}`}
      aria-labelledby={aria}
    >
      <motion.div
        className="home-hero-silk pointer-events-none absolute inset-0 -z-0"
        style={{ y: yBg }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute inset-0 -z-0"
        style={{ y: yPetal }}
        aria-hidden
      >
        <HeroPetalDecor />
      </motion.div>
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
}
