import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { removeSession } from "@/lib/user-auth";

const COOKIE_NAME = "veci_user_session";

export async function POST() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (token) {
    await removeSession(token);
  }
  cookies().set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
