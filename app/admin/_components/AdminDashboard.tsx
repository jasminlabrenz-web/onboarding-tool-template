"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ClientSubmission } from "@/config/types";
import { NewClientForm } from "./NewClientForm";
import { ClientsList } from "./ClientsList";

interface Props {
  clients: ClientSubmission[];
  baseUrl: string;
}

export function AdminDashboard({ clients, baseUrl }: Props) {
  const [showNewForm, setShowNewForm] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Onboarding-Verwaltung</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white underline"
        >
          Abmelden
        </button>
      </div>

      <div className="mb-8">
        {showNewForm ? (
          <NewClientForm
            baseUrl={baseUrl}
            onDone={() => {
              setShowNewForm(false);
              router.refresh();
            }}
            onCancel={() => setShowNewForm(false)}
          />
        ) : (
          <button
            onClick={() => setShowNewForm(true)}
            className="px-4 py-3 rounded-lg font-medium btn-primary"
          >
            + Neue Kundin anlegen
          </button>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-4">
        Kundinnen ({clients.length})
      </h2>
      <ClientsList clients={clients} baseUrl={baseUrl} />
    </div>
  );
}
