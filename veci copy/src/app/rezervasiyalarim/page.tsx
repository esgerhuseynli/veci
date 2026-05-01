"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Reservation = {
  id: string;
  category: string;
  service: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  notes: string;
  createdAt: string;
};

export default function MyReservationsPage() {
  const [loading, setLoading] = useState(true);
  const [isAuthed, setIsAuthed] = useState(false);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const router = useRouter();

  useEffect(() => {
    Promise.all([fetch("/api/auth/me"), fetch("/api/reservations/me")])
      .then(async ([authRes, reservationsRes]) => {
        const authJson = (await authRes.json()) as {
          user: { id: string; name: string; email: string } | null;
        };
        const reservationsJson = (await reservationsRes.json()) as {
          reservations: Reservation[];
        };
        setIsAuthed(Boolean(authJson.user));
        setReservations(reservationsJson.reservations ?? []);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="mx-auto max-w-5xl px-4 py-16">Loading...</div>;
  }

  if (!isAuthed) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16">
        <h1 className="font-display text-4xl text-mauve">Rezervasiyalarım</h1>
        <p className="mt-3 text-sm text-text-dark/70">
          Bu səhifəni görmək üçün əvvəlcə daxil olun.
        </p>
        <div className="mt-6">
          <button
            type="button"
            className="rounded-full border border-mauve/30 px-4 py-2 text-sm"
            onClick={() => router.push("/booking?auth=signin")}
          >
            Daxil ol
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <h1 className="font-display text-5xl text-mauve">Rezervasiyalarım</h1>
      <p className="mt-2 text-sm text-text-dark/70">Hesabınıza aid bütün rezervasiyalar.</p>

      <div className="mt-8 space-y-4">
        {reservations.map((reservation) => (
          <article
            key={reservation.id}
            className="rounded-2xl border border-blush/40 bg-cream/70 p-5"
          >
            <h2 className="font-display text-2xl text-text-dark">
              {reservation.category} / {reservation.service}
            </h2>
            <p className="mt-2 text-sm text-text-dark/75">
              {reservation.date} • {reservation.time}
            </p>
            <p className="mt-1 text-sm text-text-dark/70">
              {reservation.firstName} {reservation.lastName} • {reservation.phone}
            </p>
            {reservation.notes ? (
              <p className="mt-2 text-sm text-text-dark/70">{reservation.notes}</p>
            ) : null}
          </article>
        ))}
      </div>

      {reservations.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-blush/40 bg-pearl/70 p-5 text-sm text-text-dark/70">
          Hələ rezervasiyanız yoxdur.{" "}
          <Link href="/booking" className="text-rose underline underline-offset-2">
            İndi rezerv et
          </Link>
        </div>
      ) : null}
    </div>
  );
}
