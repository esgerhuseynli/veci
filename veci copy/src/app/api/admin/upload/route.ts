import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
]);

function extFromType(type: string) {
  if (type === "image/jpeg") return "jpg";
  if (type === "image/png") return "png";
  if (type === "image/webp") return "webp";
  if (type === "image/gif") return "gif";
  if (type === "image/svg+xml") return "svg";
  return "bin";
}

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("file") as
    | {
        type?: string;
        arrayBuffer?: () => Promise<ArrayBuffer>;
      }
    | null;

  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const mimeType = file.type ?? "";
  if (!ALLOWED_TYPES.has(mimeType)) {
    return NextResponse.json({ error: "Unsupported image format" }, { status: 400 });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });
  const ext = extFromType(mimeType);
  const fileName = `${Date.now()}-${randomUUID().slice(0, 8)}.${ext}`;
  const filePath = path.join(UPLOAD_DIR, fileName);
  const bytes = new Uint8Array(await file.arrayBuffer());
  await fs.writeFile(filePath, bytes);

  return NextResponse.json({ url: `/uploads/${fileName}` }, { status: 201 });
}
