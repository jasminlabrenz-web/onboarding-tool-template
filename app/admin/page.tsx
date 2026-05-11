import { isAdmin } from "@/lib/auth";
import { listClients } from "@/lib/kv";
import { BrandHeader } from "@/components/BrandHeader";
import { AdminLogin } from "./_components/AdminLogin";
import { AdminDashboard } from "./_components/AdminDashboard";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const loggedIn = await isAdmin();

  if (!loggedIn) {
    return (
      <>
        <BrandHeader />
        <div className="max-w-md mx-auto px-4 py-16">
          <AdminLogin />
        </div>
      </>
    );
  }

  const clients = await listClients();
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const proto = h.get("x-forwarded-proto") || "https";
  const baseUrl = `${proto}://${host}`;

  return (
    <>
      <BrandHeader />
      <AdminDashboard clients={clients} baseUrl={baseUrl} />
    </>
  );
}
