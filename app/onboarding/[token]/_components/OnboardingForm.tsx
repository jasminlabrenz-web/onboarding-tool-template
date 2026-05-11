"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type {
  OnboardingConfig,
  AnswerValue,
  Question,
} from "@/config/types";
import { QuestionRenderer } from "./QuestionRenderer";
import { SectionNav } from "./SectionNav";
import { SaveIndicator, type SaveState } from "./SaveIndicator";

interface Props {
  token: string;
  adminToken?: string;
  clientName: string;
  initialAnswers: Record<string, AnswerValue>;
  initialStatus: "draft" | "submitted";
  config: OnboardingConfig;
  greeting: string;
}

function buildQueryString(adminToken?: string): string {
  return adminToken ? `?admin=${adminToken}` : "";
}

function isAnswered(question: Question, value: AnswerValue): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "boolean") return value === true;
  return false;
}

function sectionComplete(
  section: OnboardingConfig["sections"][number],
  answers: Record<string, AnswerValue>,
): boolean {
  return section.questions
    .filter((q) => q.required)
    .every((q) => isAnswered(q, answers[q.id] ?? null));
}

function allRequiredAnswered(
  config: OnboardingConfig,
  answers: Record<string, AnswerValue>,
): boolean {
  return config.sections.every((s) => sectionComplete(s, answers));
}

export function OnboardingForm({
  token,
  adminToken,
  clientName,
  initialAnswers,
  initialStatus,
  config,
  greeting,
}: Props) {
  const router = useRouter();
  const [answers, setAnswers] = useState(initialAnswers);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingPatch = useRef<Record<string, AnswerValue>>({});

  const flushSave = useCallback(async () => {
    const patch = pendingPatch.current;
    if (Object.keys(patch).length === 0) return;
    pendingPatch.current = {};
    setSaveState("saving");
    try {
      const res = await fetch(
        `/api/onboarding/${token}${buildQueryString(adminToken)}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ patch }),
        },
      );
      if (!res.ok) throw new Error("save failed");
      setSaveState("saved");
      setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 2000);
    } catch {
      setSaveState("error");
    }
  }, [token, adminToken]);

  const scheduleSave = useCallback(
    (patch: Record<string, AnswerValue>) => {
      pendingPatch.current = { ...pendingPatch.current, ...patch };
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(flushSave, 500);
    },
    [flushSave],
  );

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, []);

  function handleChange(id: string, value: AnswerValue) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    scheduleSave({ [id]: value });
  }

  async function handleSubmit() {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    await flushSave();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(
        `/api/onboarding/${token}/submit${buildQueryString(adminToken)}`,
        { method: "POST" },
      );
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error || "Etwas ist schiefgegangen");
        setSubmitting(false);
        return;
      }
      router.push("/danke");
    } catch {
      setSubmitError("Verbindungsfehler");
      setSubmitting(false);
    }
  }

  const activeSection = config.sections[activeSectionIdx];
  const completed = config.sections.map((s) => sectionComplete(s, answers));
  const canSubmit = allRequiredAnswered(config, answers);
  const isLast = activeSectionIdx === config.sections.length - 1;
  const isFirst = activeSectionIdx === 0;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-[220px_1fr] gap-8">
      <aside className="md:sticky md:top-4 md:self-start">
        <SectionNav
          sections={config.sections}
          completed={completed}
          activeIdx={activeSectionIdx}
          onSelect={setActiveSectionIdx}
        />
      </aside>

      <div className="min-w-0">
        {activeSectionIdx === 0 && (
          <div className="mb-8 p-6 rounded-lg bg-gray-50 dark:bg-gray-900">
            <h1 className="text-2xl font-bold mb-2">
              {config.intro.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Hallo {clientName}! {greeting}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {config.intro.description}
            </p>
            {initialStatus === "submitted" && (
              <p className="mt-4 text-sm bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-2 rounded">
                Du hast dieses Formular bereits abgeschickt. Du kannst Antworten
                weiter bearbeiten und erneut absenden.
              </p>
            )}
          </div>
        )}

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{activeSection.title}</h2>
          <SaveIndicator state={saveState} />
        </div>
        {activeSection.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
            {activeSection.description}
          </p>
        )}

        <div className="space-y-6">
          {activeSection.questions.map((q) => (
            <QuestionRenderer
              key={q.id}
              question={q}
              value={answers[q.id] ?? null}
              onChange={(v) => handleChange(q.id, v)}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 sticky bottom-0 bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 py-4 -mx-4 px-4">
          <button
            onClick={() => setActiveSectionIdx((i) => Math.max(0, i - 1))}
            disabled={isFirst}
            className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 disabled:opacity-30"
          >
            ← Zurück
          </button>

          {!isLast ? (
            <button
              onClick={() =>
                setActiveSectionIdx((i) =>
                  Math.min(config.sections.length - 1, i + 1),
                )
              }
              className="px-4 py-2 rounded-lg btn-primary"
            >
              Weiter →
            </button>
          ) : (
            <button
              onClick={() => setShowSubmitConfirm(true)}
              disabled={!canSubmit}
              className="px-4 py-2 rounded-lg btn-primary"
            >
              Absenden
            </button>
          )}
        </div>

        {!canSubmit && isLast && (
          <p className="text-sm text-amber-700 dark:text-amber-400 mt-2">
            Bitte fülle noch alle mit * markierten Pflichtfelder aus.
          </p>
        )}

        {showSubmitConfirm && (
          <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50"
            onClick={() => !submitting && setShowSubmitConfirm(false)}
          >
            <div
              className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="font-semibold text-lg mb-2">
                Wirklich absenden?
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Du kannst Antworten danach noch ergänzen, aber es geht jetzt
                eine Mail raus mit dem aktuellen Stand.
              </p>
              {submitError && (
                <p className="text-sm text-red-600 mb-3">{submitError}</p>
              )}
              <div className="flex gap-2 justify-end">
                <button
                  onClick={() => setShowSubmitConfirm(false)}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700"
                >
                  Abbrechen
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="px-4 py-2 rounded-lg btn-primary"
                >
                  {submitting ? "Wird verarbeitet…" : "Ja, absenden"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
