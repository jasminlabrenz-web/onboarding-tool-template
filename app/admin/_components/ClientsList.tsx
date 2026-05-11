"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ClientSubmission } from "@/config/types";

interface Props {
  clients: ClientSubmission[];
  baseUrl: string;
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ClientsList({ clients, baseUrl }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  if (clients.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 italic">
        Noch keine Kundinnen angelegt.
      </p>
    );
  }

  async function copyLink(text: string, key: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedToken(key);
      setTimeout(() => setCopiedToken(null), 1500);
    } catch {
      // ignore
    }
  }

  async function handleDelete(token: string, name: string) {
    if (!confirm(`„${name}" wirklich löschen? Alle Daten gehen verloren.`)) {
      return;
    }
    setDeleting(token);
    await fetch(`/api/clients/${token}`, { method: "DELETE" });
    setDeleting(null);
    router.refresh();
  }

  return (
    <div className="space-y-3">
      {clients.map((c) => {
        const clientLink = `${baseUrl}/onboarding/${c.token}`;
        const adminLink = `${baseUrl}/onboarding/${c.token}?admin=${c.adminToken}`;
        return (
          <div
            key={c.token}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
          >
            <div className="flex items-start justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-semibold">{c.clientName}</h3>
                {c.clientEmail && (
                  <p className="text-sm text-gray-500">{c.clientEmail}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  Erstellt {formatDate(c.createdAt)}
                  {c.lastUpdated !== c.createdAt && (
                    <> · zuletzt aktualisiert {formatDate(c.lastUpdated)}</>
                  )}
                </p>
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full font-medium ${
                  c.status === "submitted"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                }`}
              >
                {c.status === "submitted" ? "Eingereicht" : "Entwurf"}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <button
                onClick={() => copyLink(clientLink, `client-${c.token}`)}
                className="text-xs px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {copiedToken === `client-${c.token}`
                  ? "Kopiert ✓"
                  : "Kundinnen-Link"}
              </button>
              <button
                onClick={() => copyLink(adminLink, `admin-${c.token}`)}
                className="text-xs px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {copiedToken === `admin-${c.token}`
                  ? "Kopiert ✓"
                  : "Admin-Link"}
              </button>
              <a
                href={adminLink}
                className="text-xs px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Öffnen
              </a>
              <button
                onClick={() => handleDelete(c.token, c.clientName)}
                disabled={deleting === c.token}
                className="text-xs px-3 py-1.5 rounded-md border border-red-300 text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-950"
              >
                {deleting === c.token ? "..." : "Löschen"}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
