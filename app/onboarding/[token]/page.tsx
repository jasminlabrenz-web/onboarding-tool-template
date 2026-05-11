import { notFound } from "next/navigation";
import { getClient, getClientByAdminToken } from "@/lib/kv";
import { config } from "@/config/onboarding";
import { branding } from "@/config/branding";
import { BrandHeader } from "@/components/BrandHeader";
import { BrandFooter } from "@/components/BrandFooter";
import { OnboardingForm } from "./_components/OnboardingForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ admin?: string }>;
}

export default async function OnboardingPage({ params, searchParams }: Props) {
  const { token } = await params;
  const { admin: adminToken } = await searchParams;

  let client = await getClient(token);
  let isAdminMode = false;

  if (!client && adminToken) {
    const byAdmin = await getClientByAdminToken(adminToken);
    if (byAdmin?.token === token) {
      client = byAdmin;
    }
  }

  if (!client) {
    notFound();
  }

  if (adminToken) {
    const byAdmin = await getClientByAdminToken(adminToken);
    if (byAdmin?.token === token) {
      isAdminMode = true;
    }
  }

  return (
    <>
      <BrandHeader />
      {isAdminMode && (
        <div
          className="px-4 py-2 text-sm text-center"
          style={{ backgroundColor: branding.accentColor, color: "white" }}
        >
          Admin-Modus — du bearbeitest gerade die Antworten von {client.clientName}.
        </div>
      )}
      <OnboardingForm
        token={token}
        adminToken={isAdminMode ? adminToken : undefined}
        clientName={client.clientName}
        initialAnswers={client.answers}
        initialStatus={client.status}
        config={config}
        greeting={branding.greeting}
      />
      <BrandFooter />
    </>
  );
}
