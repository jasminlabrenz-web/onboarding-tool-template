import type { OnboardingConfig } from "../types";

export const socialMedia: OnboardingConfig = {
  intro: {
    title: "Willkommen — schön, dass du dabei bist!",
    description:
      "Damit ich für dich Content schaffen kann, der wirklich nach dir klingt, brauche ich ein paar Infos. Nimm dir Zeit, du kannst jederzeit speichern und später weitermachen.",
  },
  thankYou: {
    title: "Vielen Dank!",
    description:
      "Ich habe alles erhalten und melde mich bei dir mit den nächsten Schritten. Falls dir noch etwas einfällt, kannst du diesen Link jederzeit erneut öffnen und ergänzen.",
  },
  sections: [
    {
      id: "grundinfos",
      title: "Über dich & dein Unternehmen",
      questions: [
        { id: "firmenname", label: "Firmenname", type: "text", required: true },
        { id: "vorname_nachname", label: "Dein Name", type: "text", required: true },
        { id: "branche", label: "Branche", type: "text" },
        { id: "website", label: "Website", type: "url" },
        {
          id: "kurzbeschreibung",
          label: "In 2–3 Sätzen: Was machst du und für wen?",
          type: "longtext",
          required: true,
        },
      ],
    },
    {
      id: "branding",
      title: "Branding",
      description: "Damit der Content sofort nach dir aussieht.",
      questions: [
        {
          id: "logo_link",
          label: "Logo & visuelle Assets (Drive- oder Dropbox-Link)",
          type: "url",
        },
        { id: "brand_colors", label: "Markenfarben (Hex-Codes)", type: "longtext" },
        { id: "brand_fonts", label: "Schriftarten", type: "text" },
        {
          id: "bildwelt",
          label: "Bildwelt & Stimmung (Link zu Pinterest, Drive oder Beispiel-Posts)",
          type: "url",
        },
        {
          id: "templates",
          label: "Hast du bereits Templates (Canva, Figma)?",
          type: "longtext",
          placeholder: "Link zum Team-Ordner einfügen",
        },
      ],
    },
    {
      id: "markenstimme",
      title: "Markenstimme & Tonalität",
      questions: [
        {
          id: "anrede",
          label: "Anrede deiner Community",
          type: "select",
          options: ["Du", "Sie", "Mischung"],
        },
        {
          id: "adjektive",
          label: "5 Adjektive, die deine Marke beschreiben",
          type: "longtext",
        },
        {
          id: "tonalitaet_details",
          label: "Wie soll dein Content klingen?",
          description: "Bullets reichen — humorvoll, sachlich, emotional, frech, …",
          type: "longtext",
        },
        {
          id: "no_gos",
          label: "Tabu-Wörter oder Themen",
          type: "longtext",
        },
      ],
    },
    {
      id: "plattformen",
      title: "Plattformen",
      questions: [
        {
          id: "plattformen_aktiv",
          label: "Auf welchen Plattformen bist du aktiv (oder willst es werden)?",
          type: "multiselect",
          options: ["Instagram", "LinkedIn", "TikTok", "Pinterest", "Facebook", "YouTube", "Threads", "X / Twitter"],
        },
        {
          id: "handles",
          label: "Account-Handles (eine pro Zeile, mit Plattform)",
          type: "longtext",
          placeholder: "Instagram: @meinaccount\nLinkedIn: linkedin.com/in/...",
        },
        {
          id: "fokus_plattform",
          label: "Welche Plattform hat die höchste Priorität?",
          type: "text",
        },
      ],
    },
    {
      id: "content",
      title: "Content & Strategie",
      questions: [
        {
          id: "posting_frequenz",
          label: "Geplante Posting-Frequenz",
          type: "select",
          options: [
            "Täglich",
            "5x pro Woche",
            "3x pro Woche",
            "2x pro Woche",
            "1x pro Woche",
            "Unregelmäßig / nach Anlass",
          ],
        },
        {
          id: "content_saeulen",
          label: "Content-Säulen (Themen, über die du regelmäßig sprichst)",
          description: "3–5 Säulen mit kurzer Beschreibung",
          type: "longtext",
        },
        {
          id: "top_posts",
          label: "Deine bisherigen Top-Posts (Links)",
          description: "Was lief besonders gut? Hilft mir, deinen Stil zu verstehen.",
          type: "longtext",
        },
        {
          id: "hashtag_sets",
          label: "Bestehende Hashtag-Sets oder Lieblings-Hashtags",
          type: "longtext",
        },
        {
          id: "wettbewerber",
          label: "3 Accounts, die du inspirierend findest",
          type: "longtext",
        },
      ],
    },
    {
      id: "ziele",
      title: "Ziele & KPIs",
      questions: [
        {
          id: "ziel_3_monate",
          label: "Was willst du in den nächsten 3 Monaten erreichen?",
          type: "longtext",
        },
        {
          id: "kpis",
          label: "Welche Kennzahlen sind dir wichtig?",
          type: "multiselect",
          options: [
            "Follower-Wachstum",
            "Reichweite",
            "Engagement-Rate",
            "Story-Views",
            "Webseiten-Klicks",
            "Anfragen / Leads",
            "Verkäufe",
          ],
        },
        {
          id: "zielgruppe",
          label: "Wer ist deine Zielgruppe?",
          description: "Demografie, Beruf, Schmerzpunkte, Sprache",
          type: "longtext",
        },
      ],
    },
    {
      id: "zugaenge",
      title: "Zugänge & Tools",
      description: "Bitte Zugänge nur über einen Passwort-Manager teilen.",
      questions: [
        {
          id: "tools",
          label: "Welche Tools nutzt du für Social Media?",
          description: "Meta Business Suite, Planoly, Later, Canva-Team, Buffer …",
          type: "longtext",
        },
        {
          id: "passwort_manager_link",
          label: "Passwort-Manager-Freigabe (Link)",
          type: "url",
        },
        {
          id: "bildarchiv",
          label: "Wo liegen deine Foto-/Video-Assets?",
          type: "longtext",
        },
        {
          id: "datenschutz_ok",
          label: "Ich bestätige, dass ich für die geteilten Zugänge berechtigt bin.",
          type: "checkbox",
          required: true,
        },
      ],
    },
  ],
};
