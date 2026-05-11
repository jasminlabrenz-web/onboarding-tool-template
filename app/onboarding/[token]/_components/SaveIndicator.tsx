"use client";

export type SaveState = "idle" | "saving" | "saved" | "error";

export function SaveIndicator({ state }: { state: SaveState }) {
  if (state === "idle") return null;
  const label =
    state === "saving"
      ? "Wird gespeichert…"
      : state === "saved"
        ? "Gespeichert ✓"
        : "Fehler beim Speichern";
  const color =
    state === "error"
      ? "text-red-600"
      : state === "saved"
        ? "text-green-600"
        : "text-gray-500";
  return <span className={`text-xs ${color}`}>{label}</span>;
}
