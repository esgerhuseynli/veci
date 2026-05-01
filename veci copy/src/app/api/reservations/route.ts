import { NextResponse } from "next/server";
import { newId, readCmsData, writeCmsData, type Reservation } from "@/lib/cms";
import { getDbPool, isMysqlEnabled } from "@/lib/db";

export async function POST(req: Request) {
  const body = (await req.json()) as Omit<Reservation, "id" | "createdAt">;

  if (!body.firstName || !body.lastName || !body.phone || !body.date || !body.time) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  if (isMysqlEnabled()) {
    const pool = getDbPool();
    const id = newId("res");
    await pool.query(
      `INSERT INTO reservations (reservation_code, category, service, first_name, last_name, email, phone, reservation_date, reservation_time, notes, source, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'site', 'new')`,
      [
        id,
        body.category,
        body.service,
        body.firstName,
        body.lastName,
        body.email || null,
        body.phone,
        body.date,
        body.time,
        body.notes || null,
      ],
    );
    return NextResponse.json({ ok: true, reservationId: id }, { status: 201 });
  }

  const data = await readCmsData();
  const nextItem: Reservation = {
    ...body,
    id: newId("res"),
    createdAt: new Date().toISOString(),
  };
  data.reservations.unshift(nextItem);
  await writeCmsData(data);

  return NextResponse.json({ ok: true, reservationId: nextItem.id }, { status: 201 });
}
