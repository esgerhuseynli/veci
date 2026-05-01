"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const STORAGE_KEY = "veci_welcome_loader_seen";

/**
 * First visit: cream screen + Veci Beauty House logo, fades out after 1.5s.
 */
export function FirstVisitLoader() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    let cancelled = false;
    try {
      if (localStorage.getItem(STORAGE_KEY)) {
        return;
      }
    } catch {
      return;
    }
    if (reduce) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        /* ignore */
      }
      return;
    }
    setOpen(true);
    const t = window.setTimeout(() => {
      if (!cancelled) {
        setOpen(false);
      }
    }, 1500);
    return () => {
      cancelled = true;
      window.clearTimeout(t);
    };
  }, [reduce]);

  const onExitComplete = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence onExitComplete={onExitComplete} mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-[250] flex items-center justify-center bg-cream"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-3xl font-bold tracking-wide text-text-dark sm:text-4xl">
              Veci
            </p>
            <p className="mt-0 font-script text-3xl text-rose sm:text-4xl">Beauty House</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
