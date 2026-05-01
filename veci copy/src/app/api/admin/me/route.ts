import { NextResponse } from "next/server";
import { getSessionRole } from "@/lib/admin-auth";

export async function GET() {
  const role = getSessionRole();
  if (!role) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ role });
}
