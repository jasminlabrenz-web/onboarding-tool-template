import { NextRequest, NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteClient, getClient } from "@/lib/kv";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }
  const { token } = await params;
  const client = await getClient(token);
  if (!client) {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  }
  await deleteClient(token);
  return NextResponse.json({ ok: true });
}
