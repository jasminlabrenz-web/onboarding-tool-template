import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, setAdminCookie } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const password = body?.password;

  if (typeof password !== "string" || !password) {
    return NextResponse.json({ error: "Passwort fehlt" }, { status: 400 });
  }

  if (!verifyPassword(password)) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
  }

  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
