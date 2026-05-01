"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { CmsData, CmsGalleryPhoto, CmsPhoto, CmsService, Reservation } from "@/lib/cms";
import { BOOKING_CATEGORIES, BOOKING_SERVICES, type BookingCategory } from "@/lib/booking-services";

const emptyService: CmsService = {
  id: "",
  category: "makeup",
  name: { az: "", ru: "" },
  duration: { az: "", ru: "" },
  price: { az: "", ru: "" },
  description: { az: "", ru: "" },
};

const emptyHomePhoto: CmsPhoto = {
  id: "",
  slot: "featured_1",
  imageUrl: "",
  alt: { az: "", ru: "" },
};

const emptyGalleryPhoto: CmsGalleryPhoto = {
  id: "",
  category: "makeup",
  imageUrl: "",
  alt: { az: "", ru: "" },
};

const galleryCategoryOptions: { value: CmsGalleryPhoto["category"]; label: string }[] = [
  { value: "lashes", label: "Lashes" },
  { value: "makeup", label: "Makeup" },
  { value: "skincare", label: "Skincare" },
];

const emptyReservation: Omit<Reservation, "id" | "createdAt"> = {
  category: "",
  service: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  notes: "",
};

const TIME_OPTIONS = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

export function AdminPanel() {
  const searchParams = useSearchParams();
  const [role, setRole] = useState<"admin" | "worker" | null>(null);
  const [data, setData] = useState<CmsData | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"services" | "home" | "gallery" | "reservations">("reservations");
  const [newReservation, setNewReservation] = useState(emptyReservation);
  const [createReservationOpen, setCreateReservationOpen] = useState(false);
  const [reservationSearchField, setReservationSearchField] = useState<
    "name" | "phone" | "service" | "category"
  >("name");
  const [reservationSearchValue, setReservationSearchValue] = useState("");
  const [reservationDateFilter, setReservationDateFilter] = useState("");
  const [reservationCategoryFilter, setReservationCategoryFilter] = useState("");
  const [reservationTimeFilter, setReservationTimeFilter] = useState("");

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((json: CmsData) => setData(json));

    fetch("/api/admin/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((json: { role: "admin" | "worker" } | null) => setRole(json?.role ?? null));
  }, []);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "services" || tab === "home" || tab === "gallery" || tab === "reservations") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  const reservationCount = useMemo(() => data?.reservations.length ?? 0, [data]);
  const filteredReservations = useMemo(() => {
    if (!data) return [];
    const q = reservationSearchValue.trim().toLowerCase();
    return data.reservations.filter((reservation) => {
      const matchesText = (() => {
        if (q.length === 0) return true;
        if (reservationSearchField === "name") {
          return `${reservation.firstName} ${reservation.lastName}`.toLowerCase().includes(q);
        }
        if (reservationSearchField === "phone") {
          return reservation.phone.toLowerCase().includes(q);
        }
        if (reservationSearchField === "service") {
          return reservation.service.toLowerCase().includes(q);
        }
        return reservation.category.toLowerCase().includes(q);
      })();

      const matchesDate = reservationDateFilter ? reservation.date === reservationDateFilter : true;
      const matchesCategory = reservationCategoryFilter
        ? reservation.category === reservationCategoryFilter
        : true;
      const matchesTime = reservationTimeFilter ? reservation.time === reservationTimeFilter : true;
      return matchesText && matchesDate && matchesCategory && matchesTime;
    });
  }, [
    data,
    reservationCategoryFilter,
    reservationDateFilter,
    reservationSearchField,
    reservationSearchValue,
    reservationTimeFilter,
  ]);
  const reservationServiceOptions = useMemo(() => {
    if (!newReservation.category) return [];
    const key = newReservation.category as BookingCategory;
    return BOOKING_SERVICES[key] ?? [];
  }, [newReservation.category]);

  async function saveContent(next: CmsData) {
    setSaving(true);
    setMessage(null);
    const res = await fetch("/api/admin/content", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(next),
    });
    setSaving(false);
    if (!res.ok) {
      const err = (await res.json().catch(() => null)) as {
        error?: string;
        detail?: string;
        hint?: string;
      } | null;
      const parts = [
        err?.detail ?? err?.error,
        err?.hint ? ` (${err.hint})` : "",
      ].join("");
      setMessage(parts ? `Could not save content — ${parts}` : "Could not save content.");
      return;
    }
    setData(next);
    setMessage("Saved successfully.");
  }

  async function createReservation() {
    const res = await fetch("/api/admin/reservations", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newReservation),
    });
    if (!res.ok) return;
    const created = (await res.json()) as Reservation;
    if (!data) return;
    setData({ ...data, reservations: [created, ...data.reservations] });
    setNewReservation(emptyReservation);
    setCreateReservationOpen(false);
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin/login";
  }

  async function uploadImage(file: File) {
    setUploading(true);
    setMessage(null);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: form,
    });
    setUploading(false);

    if (!res.ok) {
      const err = await res.json().catch(() => null);
      setMessage(`Upload failed${err?.error ? `: ${err.error}` : "."}`);
      return null;
    }
    const json = (await res.json()) as { url: string };
    setMessage("Upload complete.");
    return json.url;
  }

  if (!data) {
    return <div className="px-4 py-10">Loading admin panel...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-mauve">Admin Panel</h1>
          <p className="mt-1 text-sm text-text-dark/70">
            Services: {data.services.length} · Gallery photos: {data.galleryPhotos.length} · Home photos:{" "}
            {data.homePhotos.length} · Reservations: {reservationCount}
          </p>
          <p className="mt-1 text-sm text-text-dark/60">Role: {role ?? "..."}</p>
        </div>
        <div className="flex items-center gap-2">
          {role === "admin" ? (
            <button
              type="button"
              className="veci-focus-ring rounded-full border border-mauve/30 px-4 py-2 text-sm"
              onClick={() => saveContent(data)}
              disabled={saving || uploading}
            >
              {saving ? "Saving..." : "Save changes"}
            </button>
          ) : null}
          <button type="button" className="veci-focus-ring rounded-full border border-mauve/30 px-4 py-2 text-sm" onClick={logout}>
            Logout
          </button>
        </div>
      </div>

      {message ? <p className="mb-6 text-sm text-rose">{message}</p> : null}
      {saving ? <p className="mb-6 text-sm text-text-dark/60">Saving...</p> : null}
      {uploading ? <p className="mb-6 text-sm text-text-dark/60">Uploading image...</p> : null}

      <div className="mb-6 flex flex-wrap gap-2">
        {role === "admin" ? (
          <>
            <button type="button" className={`rounded-full border px-4 py-2 text-sm ${activeTab === "services" ? "border-rose bg-rose text-white" : "border-mauve/30"}`} onClick={() => setActiveTab("services")}>Services</button>
            <button type="button" className={`rounded-full border px-4 py-2 text-sm ${activeTab === "home" ? "border-rose bg-rose text-white" : "border-mauve/30"}`} onClick={() => setActiveTab("home")}>Home Photos</button>
            <button type="button" className={`rounded-full border px-4 py-2 text-sm ${activeTab === "gallery" ? "border-rose bg-rose text-white" : "border-mauve/30"}`} onClick={() => setActiveTab("gallery")}>Gallery Photos</button>
          </>
        ) : null}
        <button type="button" className={`rounded-full border px-4 py-2 text-sm ${activeTab === "reservations" ? "border-rose bg-rose text-white" : "border-mauve/30"}`} onClick={() => setActiveTab("reservations")}>Reservations</button>
      </div>

      {role === "admin" && activeTab === "services" ? <section className="surface-card mb-8 rounded-2xl p-5">
        <h2 className="font-display text-2xl text-mauve">Services</h2>
        <div className="mt-4 space-y-4">
          {data.services.map((service, index) => (
            <div key={service.id || index} className="grid gap-3 rounded-xl border border-blush/40 p-4 md:grid-cols-2">
              <input className="booking-field" value={service.category} onChange={(e) => {
                const next = structuredClone(data);
                next.services[index].category = e.target.value as CmsService["category"];
                setData(next);
              }} placeholder="category" />
              <input className="booking-field" value={service.price.az} onChange={(e) => {
                const next = structuredClone(data);
                next.services[index].price.az = e.target.value;
                setData(next);
              }} placeholder="price az" />
              <input className="booking-field" value={service.name.az} onChange={(e) => {
                const next = structuredClone(data);
                next.services[index].name.az = e.target.value;
                setData(next);
              }} placeholder="name az" />
              <input className="booking-field" value={service.name.ru} onChange={(e) => {
                const next = structuredClone(data);
                next.services[index].name.ru = e.target.value;
                setData(next);
              }} placeholder="name ru" />
              <button type="button" className="rounded-lg border border-rose/40 px-3 py-2 text-sm text-rose" onClick={() => {
                const next = structuredClone(data);
                next.services.splice(index, 1);
                setData(next);
              }}>Delete service</button>
            </div>
          ))}
        </div>
        <button type="button" className="mt-4 rounded-lg border border-mauve/30 px-4 py-2 text-sm" onClick={() => setData({ ...data, services: [...data.services, { ...emptyService, id: crypto.randomUUID() }] })}>
          Add service
        </button>
      </section> : null}
      {role === "admin" && activeTab === "services" ? (
        <button
          type="button"
          className="mb-8 rounded-full border border-mauve/30 px-4 py-2 text-sm"
          onClick={() => saveContent(data)}
          disabled={saving || uploading}
        >
          {saving ? "Saving..." : "Save services"}
        </button>
      ) : null}

      {role === "admin" && activeTab === "home" ? <section className="surface-card mb-8 rounded-2xl p-5">
        <h2 className="font-display text-2xl text-mauve">Home Photos</h2>
        <p className="mt-2 text-sm text-text-dark/70">
          Use slots: 1 image for the About section and 3 images for the signature cards.
        </p>
        <div className="mt-4 space-y-4">
          {data.homePhotos.map((photo, index) => (
            <div key={photo.id || index} className="grid gap-3 rounded-xl border border-blush/40 p-4 md:grid-cols-2">
              <select
                className="booking-field"
                value={photo.slot ?? ""}
                onChange={(e) => {
                  const next = structuredClone(data);
                  next.homePhotos[index].slot = e.target.value as NonNullable<CmsPhoto["slot"]>;
                  setData(next);
                }}
              >
                <option value="about_main">About section main image</option>
                <option value="featured_1">Signature card image 1</option>
                <option value="featured_2">Signature card image 2</option>
                <option value="featured_3">Signature card image 3</option>
              </select>
              <input className="booking-field" value={photo.imageUrl} onChange={(e) => {
                const next = structuredClone(data);
                next.homePhotos[index].imageUrl = e.target.value;
                setData(next);
              }} />
              <input
                type="file"
                accept="image/*"
                className="booking-field"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = await uploadImage(file);
                  if (!url) return;
                  const next = structuredClone(data);
                  next.homePhotos[index].imageUrl = url;
                  setData(next);
                }}
              />
              <input className="booking-field" value={photo.alt.az} onChange={(e) => {
                const next = structuredClone(data);
                next.homePhotos[index].alt.az = e.target.value;
                setData(next);
              }} />
              <input className="booking-field" value={photo.alt.ru} onChange={(e) => {
                const next = structuredClone(data);
                next.homePhotos[index].alt.ru = e.target.value;
                setData(next);
              }} />
              <button type="button" className="rounded-lg border border-rose/40 px-3 py-2 text-sm text-rose" onClick={() => {
                const next = structuredClone(data);
                next.homePhotos.splice(index, 1);
                setData(next);
              }}>Delete photo</button>
            </div>
          ))}
        </div>
        <button type="button" className="mt-4 rounded-lg border border-mauve/30 px-4 py-2 text-sm" onClick={() => setData({ ...data, homePhotos: [...data.homePhotos, { ...emptyHomePhoto, id: crypto.randomUUID(), slot: "featured_1" }] })}>
          Add home photo
        </button>
      </section> : null}
      {role === "admin" && activeTab === "home" ? (
        <button
          type="button"
          className="mb-8 rounded-full border border-mauve/30 px-4 py-2 text-sm"
          onClick={() => saveContent(data)}
          disabled={saving || uploading}
        >
          {saving ? "Saving..." : "Save home photos"}
        </button>
      ) : null}

      {role === "admin" && activeTab === "gallery" ? <section className="surface-card mb-8 rounded-2xl p-5">
        <h2 className="font-display text-2xl text-mauve">Gallery Photos</h2>
        <p className="mt-2 text-sm text-text-dark/70">
          Manage gallery items with category, image, and localized alt text.
        </p>
        <div className="mt-4 space-y-4">
          {data.galleryPhotos.map((photo, index) => (
            <div key={photo.id || index} className="grid gap-3 rounded-xl border border-blush/40 p-4 md:grid-cols-2">
              <select className="booking-field" value={photo.category} onChange={(e) => {
                const next = structuredClone(data);
                next.galleryPhotos[index].category = e.target.value as CmsGalleryPhoto["category"];
                setData(next);
              }}>
                {galleryCategoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <input className="booking-field" value={photo.imageUrl} onChange={(e) => {
                const next = structuredClone(data);
                next.galleryPhotos[index].imageUrl = e.target.value;
                setData(next);
              }} placeholder="image url" />
              <input
                type="file"
                accept="image/*"
                className="booking-field"
                onChange={async (e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  const url = await uploadImage(file);
                  if (!url) return;
                  const next = structuredClone(data);
                  next.galleryPhotos[index].imageUrl = url;
                  setData(next);
                }}
              />
              <input className="booking-field" value={photo.alt.az} onChange={(e) => {
                const next = structuredClone(data);
                next.galleryPhotos[index].alt.az = e.target.value;
                setData(next);
              }} placeholder="alt az" />
              <input className="booking-field" value={photo.alt.ru} onChange={(e) => {
                const next = structuredClone(data);
                next.galleryPhotos[index].alt.ru = e.target.value;
                setData(next);
              }} placeholder="alt ru" />
              {photo.imageUrl ? (
                <div className="md:col-span-2">
                  <div className="overflow-hidden rounded-xl border border-blush/40 bg-cream/30 p-2">
                    <div
                      role="img"
                      aria-label={photo.alt.az || photo.alt.ru || "Gallery preview"}
                      className="h-40 w-full rounded-lg bg-cover bg-center"
                      style={{ backgroundImage: `url("${photo.imageUrl}")` }}
                    />
                  </div>
                </div>
              ) : null}
              <button type="button" className="rounded-lg border border-rose/40 px-3 py-2 text-sm text-rose" onClick={() => {
                const next = structuredClone(data);
                next.galleryPhotos.splice(index, 1);
                setData(next);
              }}>Delete photo</button>
            </div>
          ))}
        </div>
        <button type="button" className="mt-4 rounded-lg border border-mauve/30 px-4 py-2 text-sm" onClick={() => setData({ ...data, galleryPhotos: [...data.galleryPhotos, { ...emptyGalleryPhoto, id: crypto.randomUUID() }] })}>
          Add gallery photo
        </button>
      </section> : null}
      {role === "admin" && activeTab === "gallery" ? (
        <button
          type="button"
          className="mb-8 rounded-full border border-mauve/30 px-4 py-2 text-sm"
          onClick={() => saveContent(data)}
          disabled={saving || uploading}
        >
          {saving ? "Saving..." : "Save gallery photos"}
        </button>
      ) : null}

      {activeTab === "reservations" ? <section className="surface-card mb-8 rounded-2xl p-5">
        <h2 className="font-display text-2xl text-mauve">Reservations</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-5">
          <select
            className="booking-field"
            value={reservationSearchField}
            onChange={(e) =>
              setReservationSearchField(e.target.value as "name" | "phone" | "service" | "category")
            }
          >
            <option value="name">Search by name</option>
            <option value="phone">Search by phone</option>
            <option value="service">Search by service</option>
            <option value="category">Search by category</option>
          </select>
          <input
            className="booking-field"
            placeholder="Type value..."
            value={reservationSearchValue}
            onChange={(e) => setReservationSearchValue(e.target.value)}
          />
          <select
            className="booking-field"
            value={reservationCategoryFilter}
            onChange={(e) => setReservationCategoryFilter(e.target.value)}
          >
            <option value="">All categories</option>
            {BOOKING_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.label.az}
              </option>
            ))}
          </select>
          <select
            className="booking-field"
            value={reservationTimeFilter}
            onChange={(e) => setReservationTimeFilter(e.target.value)}
          >
            <option value="">All times</option>
            {TIME_OPTIONS.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          <input
            className="booking-field"
            type="date"
            value={reservationDateFilter}
            onChange={(e) => setReservationDateFilter(e.target.value)}
          />
        </div>
        <button
          type="button"
          className="mt-4 rounded-lg border border-mauve/30 px-4 py-2 text-sm"
          onClick={() => setCreateReservationOpen((prev) => !prev)}
        >
          {createReservationOpen ? "Close create form" : "Create reservation"}
        </button>
        {createReservationOpen ? (
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input className="booking-field" placeholder="first name" value={newReservation.firstName} onChange={(e) => setNewReservation({ ...newReservation, firstName: e.target.value })} />
            <input className="booking-field" placeholder="last name" value={newReservation.lastName} onChange={(e) => setNewReservation({ ...newReservation, lastName: e.target.value })} />
            <input className="booking-field" placeholder="phone" value={newReservation.phone} onChange={(e) => setNewReservation({ ...newReservation, phone: e.target.value })} />
            <select
              className="booking-field"
              value={newReservation.category}
              onChange={(e) =>
                setNewReservation({ ...newReservation, category: e.target.value, service: "" })
              }
            >
              <option value="">Select category</option>
              {BOOKING_CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label.az}
                </option>
              ))}
            </select>
            <select
              className="booking-field"
              value={newReservation.service}
              onChange={(e) => setNewReservation({ ...newReservation, service: e.target.value })}
              disabled={!newReservation.category}
            >
              <option value="">{newReservation.category ? "Select service" : "Select category first"}</option>
              {reservationServiceOptions.map((service) => (
                <option key={service.value} value={service.value}>
                  {service.label.az}
                </option>
              ))}
            </select>
            <input className="booking-field" type="date" value={newReservation.date} onChange={(e) => setNewReservation({ ...newReservation, date: e.target.value })} />
            <select
              className="booking-field"
              value={newReservation.time}
              onChange={(e) => setNewReservation({ ...newReservation, time: e.target.value })}
            >
              <option value="">Select time</option>
              {TIME_OPTIONS.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
            <button type="button" className="rounded-lg border border-mauve/30 px-4 py-2 text-sm" onClick={createReservation}>
              Save reservation
            </button>
          </div>
        ) : null}
        <div className="mt-6 space-y-2">
          {filteredReservations.map((reservation) => (
            <div key={reservation.id} className="rounded-lg border border-blush/30 p-3 text-sm">
              <strong>{reservation.firstName} {reservation.lastName}</strong> - {reservation.category} / {reservation.service} - {reservation.date} {reservation.time}
            </div>
          ))}
          {filteredReservations.length === 0 ? (
            <p className="text-sm text-text-dark/60">No reservations match your filters.</p>
          ) : null}
        </div>
      </section>
      : null}
    </div>
  );
}
