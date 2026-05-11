import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { createClient, listClients } from "@/lib/kv";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }
  const clients = await listClients();
  return NextResponse.json({ clients });
}

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  const clientName = typeof body?.clientName === "string" ? body.clientName.trim() : "";
  const clientEmail =
    typeof body?.clientEmail === "string" && body.clientEmail.trim()
      ? body.clientEmail.trim()
      : undefined;

  if (!clientName) {
    return NextResponse.json({ error: "Name fehlt" }, { status: 400 });
  }

  const client = await createClient(clientName, clientEmail);
  return NextResponse.json({ client });
}
