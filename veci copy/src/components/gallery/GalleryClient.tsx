"use client";

import { useMemo, useState } from "react";
import type { CmsGalleryPhoto } from "@/lib/cms";
import type { Locale } from "@/lib/i18n";

export function GalleryClient({
  locale,
  photos,
}: {
  locale: Locale;
  photos: CmsGalleryPhoto[];
}) {
  const [filter, setFilter] = useState<"all" | CmsGalleryPhoto["category"]>("all");
  const visible = useMemo(
    () => (filter === "all" ? photos : photos.filter((p) => p.category === filter)),
    [filter, photos],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-6 flex flex-wrap gap-2">
        {(["all", "lashes", "makeup", "skincare"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            className="rounded-full border border-mauve/30 px-4 py-2 text-sm"
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((photo) => (
          <figure key={photo.id} className="overflow-hidden rounded-2xl border border-blush/50 bg-cream/40">
            <div
              role="img"
              aria-label={photo.alt[locale]}
              className="h-64 w-full bg-cover bg-center"
              style={{ backgroundImage: `url("${photo.imageUrl}")` }}
            />
          </figure>
        ))}
      </div>
    </div>
  );
}
