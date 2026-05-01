import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { newId, readCmsData, writeCmsData, type Reservation } from "@/lib/cms";
import { getDbPool, isMysqlEnabled } from "@/lib/db";

export async function GET() {
  if (isMysqlEnabled()) {
    const pool = getDbPool();
    const [rows] = await pool.query<
      Array<
        RowDataPacket & {
        reservation_code: string;
        category: string;
        service: string;
        first_name: string;
        last_name: string;
        email: string | null;
        phone: string;
        reservation_date: string;
        reservation_time: string;
        notes: string | null;
        created_at: string;
        }
      >
    >(
      `SELECT reservation_code, category, service, first_name, last_name, email, phone, reservation_date, reservation_time, notes, created_at
       FROM reservations
       ORDER BY created_at DESC`,
    );
    return NextResponse.json(
      rows.map((row) => ({
        id: row.reservation_code,
        category: row.category,
        service: row.service,
        firstName: row.first_name,
        lastName: row.last_name,
        email: row.email ?? "",
        phone: row.phone,
        date: String(row.reservation_date).slice(0, 10),
        time: String(row.reservation_time).slice(0, 5),
        notes: row.notes ?? "",
        createdAt: row.created_at,
      })),
    );
  }

  const data = await readCmsData();
  return NextResponse.json(data.reservations);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Omit<Reservation, "id" | "createdAt">;
  if (isMysqlEnabled()) {
    const pool = getDbPool();
    const id = newId("res");
    await pool.query(
      `INSERT INTO reservations (reservation_code, category, service, first_name, last_name, email, phone, reservation_date, reservation_time, notes, source, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'admin', 'new')`,
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
    return NextResponse.json(
      { ...body, id, createdAt: new Date().toISOString() },
      { status: 201 },
    );
  }

  const data = await readCmsData();
  const nextItem: Reservation = {
    ...body,
    id: newId("res"),
    createdAt: new Date().toISOString(),
  };
  data.reservations.unshift(nextItem);
  await writeCmsData(data);
  return NextResponse.json(nextItem, { status: 201 });
}
