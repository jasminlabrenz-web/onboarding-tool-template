import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { getClient, getClientByAdminToken, saveClient } from "@/lib/kv";
import { config } from "@/config/onboarding";
import { branding } from "@/config/branding";
import { generateDossier } from "@/lib/claude";
import { sendDossierEmail } from "@/lib/email";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const { token } = await params;
  const url = new URL(request.url);
  const adminToken = url.searchParams.get("admin");

  let client = await getClient(token);
  if (!client) {
    return NextResponse.json({ error: "Nicht gefunden" }, { status: 404 });
  }
  if (adminToken) {
    const byAdmin = await getClientByAdminToken(adminToken);
    if (byAdmin?.token !== token) {
      return NextResponse.json({ error: "Nicht autorisiert" }, { status: 403 });
    }
  }

  client = { ...client, status: "submitted" };

  let dossier: string | undefined;
  let emailError: string | undefined;

  try {
    dossier = await generateDossier(client, config, branding);
    client.dossier = dossier;
  } catch (err) {
    emailError = `Dossier-Generierung fehlgeschlagen: ${err instanceof Error ? err.message : String(err)}`;
    console.error(emailError);
  }

  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || "https";
  const adminLink = `${proto}://${host}/onboarding/${token}?admin=${client.adminToken}`;

  try {
    await sendDossierEmail({ submission: client, branding, adminLink });
    client.emailSentAt = new Date().toISOString();
    client.emailError = undefined;
  } catch (err) {
    const msg = `Email-Versand fehlgeschlagen: ${err instanceof Error ? err.message : String(err)}`;
    console.error(msg);
    client.emailError = emailError ? `${emailError}; ${msg}` : msg;
  }

  await saveClient(client);

  if (client.emailError) {
    return NextResponse.json(
      { ok: false, error: client.emailError },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
