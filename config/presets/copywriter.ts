import type { OnboardingConfig } from "../types";

export const copywriter: OnboardingConfig = {
  intro: {
    title: "Willkommen — freue mich, dir Worte zu leihen!",
    description:
      "Damit ich Texte schreibe, die wirklich nach dir klingen, brauche ich Einblicke in deine Marke und deine Sprache. Du kannst zwischendurch speichern und später weitermachen.",
  },
  thankYou: {
    title: "Vielen Dank!",
    description:
      "Ich habe alle Infos erhalten und melde mich bei dir mit den nächsten Schritten. Falls dir noch etwas einfällt, kannst du diesen Link erneut öffnen und ergänzen.",
  },
  sections: [
    {
      id: "grundinfos",
      title: "Über dich & dein Unternehmen",
      questions: [
        { id: "firmenname", label: "Firmenname", type: "text", required: true },
        { id: "vorname_nachname", label: "Dein Name", type: "text", required: true },
        { id: "website", label: "Website", type: "url" },
        {
          id: "kurzbeschreibung",
          label: "In 2–3 Sätzen: Was machst du und für wen?",
          type: "longtext",
          required: true,
        },
        {
          id: "alleinstellungsmerkmal",
          label: "Was macht dich anders als deine Wettbewerber?",
          type: "longtext",
        },
      ],
    },
    {
      id: "markenstimme",
      title: "Markenstimme",
      questions: [
        {
          id: "anrede",
          label: "Bevorzugte Anrede",
          type: "select",
          options: ["Du", "Sie", "Mischung je nach Format"],
        },
        {
          id: "sprachebene",
          label: "Sprachebene",
          type: "select",
          options: ["Sehr locker, fast wie ein Gespräch", "Locker aber kompetent", "Professionell-freundlich", "Formell-sachlich", "Wissenschaftlich-präzise"],
        },
        {
          id: "adjektive",
          label: "5 Adjektive, die deine Marke beschreiben",
          type: "longtext",
        },
        {
          id: "stimme_beispiele",
          label: "Beispiele für „so klingt meine Marke“",
          description: "Gern Sätze, die du selbst geschrieben hast und liebst",
          type: "longtext",
        },
        {
          id: "no_gos_woerter",
          label: "Tabu-Wörter / No-Gos",
          description: "Welche Begriffe sollen niemals vorkommen?",
          type: "longtext",
        },
        {
          id: "no_gos_themen",
          label: "Themen oder Aussagen, die du meidest",
          type: "longtext",
        },
      ],
    },
    {
      id: "zielgruppe",
      title: "Zielgruppe",
      questions: [
        {
          id: "wer",
          label: "Wer liest deine Texte? (Demografie + Beruf + Lebenssituation)",
          type: "longtext",
          required: true,
        },
        {
          id: "schmerzpunkte",
          label: "Welche Schmerzpunkte / Probleme hat deine Zielgruppe?",
          type: "longtext",
        },
        {
          id: "traeume",
          label: "Was träumen, wünschen, hoffen sie?",
          type: "longtext",
        },
        {
          id: "einwaende",
          label: "Typische Einwände gegen dein Angebot",
          type: "longtext",
        },
      ],
    },
    {
      id: "beispiele",
      title: "Texte, die du liebst (und hasst)",
      description: "Damit ich verstehe, was bei dir funktioniert.",
      questions: [
        {
          id: "lieblings_texte",
          label: "3 Texte von dir, die du richtig liebst (Links oder Zitate)",
          type: "longtext",
        },
        {
          id: "lieblings_marken",
          label: "3 fremde Marken / Texter:innen, deren Sprache du bewunderst",
          type: "longtext",
        },
        {
          id: "hass_texte",
          label: "Texte, die du furchtbar findest — und warum",
          type: "longtext",
        },
      ],
    },
    {
      id: "formate",
      title: "Formate & Umfang",
      questions: [
        {
          id: "formate_bedarf",
          label: "Welche Textformate brauchst du?",
          type: "multiselect",
          options: [
            "Blogartikel",
            "Newsletter / Mails",
            "Sales-Pages / Landing-Pages",
            "Social-Media-Captions",
            "Ads / Anzeigen",
            "Skripte (Video / Podcast)",
            "Produkttexte",
            "Pressetexte",
            "Web-Copy",
          ],
        },
        {
          id: "umfang_pro_format",
          label: "Geplanter Umfang pro Format",
          description: "z.B. 2 Blogartikel/Monat à 1500 Wörter; 4 Newsletter à 500 Wörter",
          type: "longtext",
        },
        {
          id: "startaufgabe",
          label: "Welches Format brauchst du zuerst?",
          type: "text",
        },
      ],
    },
    {
      id: "prozess",
      title: "Briefing & Freigabe-Prozess",
      questions: [
        {
          id: "briefing_form",
          label: "Wie kommen Briefings zu mir?",
          type: "multiselect",
          options: ["Loom-Video", "Notion-Doc", "Email", "Telefon / Call", "Mündlich im Jour fixe", "Mischung"],
        },
        {
          id: "freigabe_prozess",
          label: "Wer gibt Texte frei und wie schnell?",
          type: "longtext",
        },
        {
          id: "feedback_kanal",
          label: "Wo gibst du mir Feedback?",
          type: "select",
          options: ["Google Docs Kommentare", "Notion Kommentare", "Email", "Loom als Antwort", "Telefon"],
        },
        {
          id: "deadlines",
          label: "Typische Deadline-Logik",
          description: "Wie viel Vorlauf brauchst du? Welche Tage sind heilig?",
          type: "longtext",
        },
        {
          id: "datenschutz_ok",
          label: "Ich bestätige, dass die mit mir geteilten Inhalte für die Zusammenarbeit verwendet werden dürfen.",
          type: "checkbox",
          required: true,
        },
      ],
    },
  ],
};
