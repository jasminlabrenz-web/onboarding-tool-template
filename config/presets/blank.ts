import type { OnboardingConfig } from "../types";

/**
 * BLANK-Preset — leere Vorlage zum Selbstbauen.
 *
 * So funktioniert eine Frage:
 *   { id: "firma", label: "Firmenname", type: "text", required: true }
 *
 * Erlaubte type-Werte:
 *   - "text"         → einzeilige Eingabe
 *   - "longtext"     → mehrzeilige Eingabe (Textarea)
 *   - "url"          → URL-Eingabe mit Validierung
 *   - "email"        → Email-Eingabe mit Validierung
 *   - "select"       → Dropdown — `options` als Array ergänzen
 *   - "multiselect"  → Checkbox-Liste — `options` als Array ergänzen
 *   - "checkbox"     → einzelne Checkbox (z.B. für Zustimmungen)
 *
 * Optional pro Frage:
 *   - description?: string   → Hilfetext unter dem Label
 *   - required?: boolean     → wenn true, kann erst abgeschickt werden, wenn ausgefüllt
 *   - placeholder?: string   → Platzhaltertext im Feld
 *   - options?: string[]     → bei select/multiselect Pflicht
 *
 * Wichtig: jede `id` muss innerhalb des gesamten Formulars eindeutig sein.
 */
export const blank: OnboardingConfig = {
  intro: {
    title: "Willkommen!",
    description: "Bitte fülle das folgende Formular aus.",
  },
  thankYou: {
    title: "Vielen Dank!",
    description: "Ich habe deine Antworten bekommen und melde mich bei dir.",
  },
  sections: [
    {
      id: "beispiel",
      title: "Beispiel-Section",
      description: "Lösche diese Section oder ersetze sie durch deine eigene.",
      questions: [
        {
          id: "firmenname",
          label: "Firmenname",
          type: "text",
          required: true,
        },
        // Hier weitere Fragen hinzufügen
      ],
    },
  ],
};
