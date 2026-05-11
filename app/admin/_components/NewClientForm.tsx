"use client";

import { useState } from "react";
import type { ClientSubmission } from "@/config/types";
import { CopyableLink } from "./CopyableLink";

interface Props {
  baseUrl: string;
  onDone: () => void;
  onCancel: () => void;
}

export function NewClientForm({ baseUrl, onDone, onCancel }: Props) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<ClientSubmission | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientName: clientName.trim(),
          clientEmail: clientEmail.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Fehler beim Anlegen");
        setLoading(false);
        return;
      }
      setCreated(data.client);
      setLoading(false);
    } catch {
      setError("Verbindungsfehler");
      setLoading(false);
    }
  }

  if (created) {
    const clientLink = `${baseUrl}/onboarding/${created.token}`;
    const adminLink = `${baseUrl}/onboarding/${created.token}?admin=${created.adminToken}`;
    return (
      <div className="border-2 border-brand rounded-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold">
          Kundin „{created.clientName}" angelegt
        </h3>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium mb-1">
              Kundinnen-Link (an deine Kundin schicken):
            </p>
            <CopyableLink link={clientLink} />
          </div>
          <div>
            <p className="text-sm font-medium mb-1">
              Admin-Link (für dich — vorausfüllen, einsehen, ergänzen):
            </p>
            <CopyableLink link={adminLink} />
          </div>
        </div>
        <button
          onClick={onDone}
          className="px-4 py-2 rounded-lg font-medium btn-primary"
        >
          Fertig
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 space-y-4"
    >
      <h3 className="text-lg font-semibold">Neue Kundin anlegen</h3>
      <div>
        <label className="block text-sm font-medium mb-1">
          Name der Kundin
        </label>
        <input
          type="text"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
          autoFocus
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Email der Kundin (optional)
        </label>
        <input
          type="email"
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900"
        />
        <p className="text-xs text-gray-500 mt-1">
          Wird als Reply-To gesetzt, wenn das Dossier per Mail kommt.
        </p>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading || !clientName.trim()}
          className="px-4 py-2 rounded-lg font-medium btn-primary"
        >
          {loading ? "..." : "Anlegen"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
        >
          Abbrechen
        </button>
      </div>
    </form>
  );
}
