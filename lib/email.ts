import { Resend } from "resend";
import { marked } from "marked";
import type { ClientSubmission, Branding } from "@/config/types";

interface SendArgs {
  submission: ClientSubmission;
  branding: Branding;
  adminLink: string;
}

export async function sendDossierEmail({
  submission,
  branding,
  adminLink,
}: SendArgs): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY ist nicht gesetzt");
  if (!branding.vaEmail) throw new Error("BRAND_VA_EMAIL ist nicht gesetzt");

  const resend = new Resend(apiKey);
  const dossierMd = submission.dossier ?? "_(Dossier konnte nicht erstellt werden — siehe JSON-Anhang.)_";
  const dossierHtml = await marked.parse(dossierMd);

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 720px; margin: 0 auto; padding: 24px;">
      <p>Hallo ${escapeHtml(branding.vaName)},</p>
      <p><strong>${escapeHtml(submission.clientName)}</strong> hat das Onboarding-Formular abgeschickt. Hier das automatisch generierte Dossier:</p>
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
      <div>${dossierHtml}</div>
      <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 24px 0;" />
      <p style="color: #666; font-size: 14px;">
        Anhänge: <code>dossier.md</code> zum Direkt-Import in Notion/Obsidian, <code>raw.json</code> als Backup.<br />
        Bearbeitungs-Link für Korrekturen: <a href="${escapeHtml(adminLink)}">${escapeHtml(adminLink)}</a>
      </p>
    </div>
  `;

  const textBody = `Hallo ${branding.vaName},

${submission.clientName} hat das Onboarding-Formular abgeschickt. Hier das Dossier:

---

${dossierMd}

---

Anhänge:
- dossier.md (für Notion / Obsidian)
- raw.json (Backup)

Bearbeitungs-Link: ${adminLink}
`;

  const attachments = [
    {
      filename: `dossier-${slug(submission.clientName)}.md`,
      content: Buffer.from(dossierMd, "utf-8").toString("base64"),
    },
    {
      filename: `raw-${slug(submission.clientName)}.json`,
      content: Buffer.from(JSON.stringify(submission, null, 2), "utf-8").toString(
        "base64",
      ),
    },
  ];

  const fromAddress = `${branding.vaName} Onboarding <${branding.resendFromEmail}>`;

  await resend.emails.send({
    from: fromAddress,
    to: branding.vaEmail,
    replyTo: submission.clientEmail || undefined,
    subject: `Neues Onboarding: ${submission.clientName}`,
    html: htmlBody,
    text: textBody,
    attachments,
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40) || "kundin";
}
