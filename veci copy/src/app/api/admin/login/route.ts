import { NextResponse } from "next/server";
import { isValidCredentials, setAdminSession, type UserRole } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const body = (await req.json()) as { role?: UserRole; email?: string; password?: string };
  if (!body.role || !body.email || !body.password) {
    return NextResponse.json({ error: "Missing credentials" }, { status: 400 });
  }

  if (!isValidCredentials({ role: body.role, email: body.email, password: body.password })) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  setAdminSession(body.role);
  return NextResponse.json({ ok: true, role: body.role });
}
