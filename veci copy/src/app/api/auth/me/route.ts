import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getUserBySession } from "@/lib/user-auth";

const COOKIE_NAME = "veci_user_session";

export async function GET() {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) {
    return NextResponse.json({ user: null });
  }
  const user = await getUserBySession(token);
  if (!user) {
    return NextResponse.json({ user: null });
  }
  return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } });
}
