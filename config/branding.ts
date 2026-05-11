import type { Branding } from "./types";

export const branding: Branding = {
  vaName: process.env.BRAND_VA_NAME || "Deine VA",
  vaEmail: process.env.BRAND_VA_EMAIL || "",
  primaryColor: process.env.BRAND_PRIMARY_COLOR || "#7371FC",
  accentColor: process.env.BRAND_ACCENT_COLOR || "#fc60a8",
  logoUrl: process.env.BRAND_LOGO_URL || undefined,
  greeting:
    process.env.BRAND_GREETING ||
    "Schön, dass du da bist! Bitte fülle das folgende Formular aus, damit ich dich optimal unterstützen kann.",
  resendFromEmail: process.env.BRAND_RESEND_FROM_EMAIL || "onboarding@resend.dev",
  footerHide: process.env.FOOTER_HIDE === "true",
};

export function brandingFromEnv(): Branding {
  return branding;
}
