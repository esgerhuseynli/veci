import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { RowDataPacket } from "mysql2";
import { readCmsData } from "@/lib/cms";
import { getDbPool, isMysqlEnabled } from "@/lib/db";
import { getUserBySession } from "@/lib/user-auth";

const USER_SESSION_COOKIE = "veci_user_session";

export async function GET() {
  const token = cookies().get(USER_SESSION_COOKIE)?.value;
  if (!token) {
    return NextResponse.json({ reservations: [] }, { status: 200 });
  }

  const user = await getUserBySession(token);
  if (!user) {
    return NextResponse.json({ reservations: [] }, { status: 200 });
  }

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
       WHERE LOWER(email) = ?
       ORDER BY created_at DESC`,
      [user.email.toLowerCase()],
    );

    return NextResponse.json({
      reservations: rows.map((row) => ({
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
    });
  }

  const data = await readCmsData();
  const reservations = data.reservations.filter(
    (reservation) => reservation.email.toLowerCase() === user.email.toLowerCase(),
  );
  return NextResponse.json({ reservations });
}
