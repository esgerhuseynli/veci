import { NextResponse } from "next/server";
import { isMysqlEnabled } from "@/lib/db";
import { readCmsData, sanitizeCmsInput, writeCmsData } from "@/lib/cms";

function errorPayload(error: unknown) {
  const message =
    error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";
  const mysqlCode =
    error && typeof error === "object" && "code" in error ? String((error as { code: unknown }).code) : "";
  const sqlMessage =
    error && typeof error === "object" && "sqlMessage" in error
      ? String((error as { sqlMessage: unknown }).sqlMessage)
      : "";

  console.error("[admin/content PUT]", { message, mysqlCode, sqlMessage });

  let detail = message;
  if (sqlMessage) {
    detail = `${message}${message !== sqlMessage ? ` — ${sqlMessage}` : ""}`;
  }

  let hint: string | undefined;
  if (!isMysqlEnabled() && typeof message === "string" && /EACCES|EROFS|read-only/i.test(message)) {
    hint = "Server filesystem looks read-only — set MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE so content saves to the database.";
  }
  if (typeof message === "string" && /SSL|ECONNRESET|ENOTFOUND|access denied|1045/i.test(message)) {
    hint =
      hint ??
      "Check MYSQL_* env vars and DB user permissions. On shared hosting, try MYSQL_SSL=1; if verification fails, set MYSQL_SSL_REJECT_UNAUTHORIZED=false.";
  }

  return { error: "Failed to save CMS data", detail: detail.slice(0, 900), ...(hint ? { hint } : {}) };
}

export async function GET() {
  const data = await readCmsData();
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const safe = sanitizeCmsInput(body);
    await writeCmsData(safe);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(errorPayload(error), { status: 500 });
  }
}
