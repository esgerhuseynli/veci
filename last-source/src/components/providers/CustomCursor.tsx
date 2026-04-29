"use client";

import { useEffect, useState } from "react";

/**
 * Subtle rose/blush ring following the pointer. Disabled for touch / coarse pointer.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) {
      return;
    }
    setEnabled(true);
    document.body.classList.add("veci-custom-cursor");

    const onMove = (e: PointerEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const onOver = (e: Event) => {
      const t = e.target;
      if (!(t instanceof Element)) {
        setHover(false);
        return;
      }
      setHover(
        !!t.closest("a, button, [role='button'], [data-cursor='pointer']"),
      );
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver, true);
    return () => {
      document.body.classList.remove("veci-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver, true);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[240] mix-blend-multiply will-change-transform"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
      }}
      aria-hidden
    >
      <div
        className={`rounded-full border border-rose/50 bg-rose/25 transition-[width,height,background-color,opacity] duration-200 ${
          hover ? "h-4 w-4 bg-blush/40" : "h-2.5 w-2.5"
        }`}
      />
    </div>
  );
}
