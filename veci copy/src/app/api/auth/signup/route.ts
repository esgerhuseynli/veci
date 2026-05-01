import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createSession, signUpUser } from "@/lib/user-auth";

const COOKIE_NAME = "veci_user_session";

export async function POST(req: Request) {
  const body = (await req.json()) as { name?: string; email?: string; password?: string };
  if (!body.name || !body.email || !body.password) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const result = await signUpUser({
    name: body.name,
    email: body.email,
    password: body.password,
  });
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const token = await createSession(result.user.id);
  cookies().set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({
    user: { id: result.user.id, name: result.user.name, email: result.user.email },
  });
}
