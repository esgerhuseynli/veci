/**
 * Former page transition wrapper (motion). Kept so imports stay stable —
 * SSR must not rely on opacity:0 until hydration.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
