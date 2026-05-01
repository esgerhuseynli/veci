"use client";

import { CustomCursor } from "./CustomCursor";
import { FirstVisitLoader } from "./FirstVisitLoader";
import { PageTransition } from "./PageTransition";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FirstVisitLoader />
      <CustomCursor />
      <PageTransition>{children}</PageTransition>
    </>
  );
}
