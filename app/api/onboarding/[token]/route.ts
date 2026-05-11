import { NextRequest, NextResponse } from "next/server";
import { getClient, updateAnswers, getClientByAdminToken } from "@/lib/kv";
import type { AnswerValue } from "@/config/types";

async function authorize(
  request: NextRequest,
  token: string,
): Promise<"ok" | "unauthorized"> {
  const url = new URL(request.url);
  const adminToken = url.searchParams.get("admin");
  if (adminToken) {
    const client = await getClientByAdminToken(adminToken);
    if (client?.token === token) return "ok";
  }
  const client = await getClient(token);
  return client ? "ok" : "unauthorized";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const auth = await authorize(request, token);
  if (auth !== "ok") {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  }
  const client = await getClient(token);
  if (!client) {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  }
  return NextResponse.json({
    clientName: client.clientName,
    answers: client.answers,
    status: client.status,
    lastUpdated: client.lastUpdated,
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const auth = await authorize(request, token);
  if (auth !== "ok") {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  }
  const body = await request.json().catch(() => null);
  const patch = body?.patch;
  if (!patch || typeof patch !== "object") {
    return NextResponse.json({ error: "Patch fehlt" }, { status: 400 });
  }
  const updated = await updateAnswers(token, patch as Record<string, AnswerValue>);
  if (!updated) {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  }
  return NextResponse.json({
    ok: true,
    lastUpdated: updated.lastUpdated,
  });
}
