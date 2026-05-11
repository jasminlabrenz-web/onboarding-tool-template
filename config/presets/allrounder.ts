import type { OnboardingConfig } from "../types";

export const allrounder: OnboardingConfig = {
  intro: {
    title: "Willkommen an Bord!",
    description:
      "Damit unsere Zusammenarbeit von Anfang an rund läuft, brauche ich ein paar Infos von dir. Nimm dir Zeit — du kannst zwischendurch speichern und später weitermachen.",
  },
  thankYou: {
    title: "Geschafft — vielen Dank!",
    description:
      "Ich habe deine Antworten bekommen und melde mich in den nächsten 1–2 Werktagen bei dir. Falls dir noch etwas einfällt, kannst du diesen Link einfach erneut öffnen und ergänzen.",
  },
  sections: [
    {
      id: "grundinfos",
      title: "Über dich & dein Unternehmen",
      description: "Damit ich weiß, mit wem ich es zu tun habe.",
      questions: [
        {
          id: "firmenname",
          label: "Firmenname",
          type: "text",
          required: true,
        },
        {
          id: "vorname_nachname",
          label: "Dein Name (Vorname & Nachname)",
          type: "text",
          required: true,
        },
        {
          id: "branche",
          label: "Branche / Tätigkeitsbereich",
          type: "text",
        },
        {
          id: "website",
          label: "Website",
          type: "url",
          placeholder: "https://...",
        },
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
      title: "Branding & Tonalität",
      description: "Damit alles, was nach außen geht, nach dir klingt und aussieht.",
      questions: [
        {
          id: "logo_link",
          label: "Logo (Link zu Google Drive, Dropbox oder WeTransfer)",
          description: "Bitte als PNG oder SVG, gern in mehreren Varianten.",
          type: "url",
        },
        {
          id: "brand_colors",
          label: "Markenfarben (Hex-Codes oder Beschreibung)",
          type: "longtext",
          placeholder: "#7371FC, #fc60a8, Schwarz",
        },
        {
          id: "brand_fonts",
          label: "Schriftarten (Name oder Google-Fonts-Link)",
          type: "text",
        },
        {
          id: "anrede",
          label: "Bevorzugte Anrede",
          type: "select",
          options: ["Du (informell)", "Sie (formell)", "Mischung je nach Kontext"],
        },
        {
          id: "tonalitaet",
          label: "Wie soll deine Marke klingen?",
          description:
            "Locker, professionell, humorvoll, sachlich? 3–5 Adjektive reichen.",
          type: "longtext",
        },
        {
          id: "no_gos",
          label: "Tabu-Wörter oder Themen?",
          description: "Was darf in deiner Kommunikation auf keinen Fall vorkommen?",
          type: "longtext",
        },
      ],
    },
    {
      id: "aufgaben",
      title: "Aufgaben & Erwartungen",
      description: "Damit klar ist, was ich für dich übernehme.",
      questions: [
        {
          id: "aufgaben_beschreibung",
          label: "Welche Aufgaben soll ich übernehmen?",
          description: "So konkret wie möglich. Beispiele und Tools sind hilfreich.",
          type: "longtext",
          required: true,
        },
        {
          id: "stundenumfang",
          label: "Geplanter Stundenumfang pro Monat",
          type: "select",
          options: ["bis 10 Std.", "10–20 Std.", "20–40 Std.", "40+ Std.", "noch unklar"],
        },
        {
          id: "startdatum",
          label: "Wunsch-Startdatum",
          type: "text",
          placeholder: "z.B. 01.06.2026 oder „so schnell wie möglich“",
        },
        {
          id: "prioritaeten",
          label: "Was hat zum Start die höchste Priorität?",
          type: "longtext",
        },
      ],
    },
    {
      id: "kommunikation",
      title: "Kommunikation",
      description: "Damit wir uns nicht aneinander vorbei reden.",
      questions: [
        {
          id: "kanaele",
          label: "Bevorzugte Kommunikationskanäle",
          type: "multiselect",
          options: ["Email", "Slack", "Microsoft Teams", "WhatsApp", "Telegram", "Telefon", "Loom-Videos"],
        },
        {
          id: "reaktionszeit",
          label: "Welche Reaktionszeit erwartest du von mir?",
          type: "select",
          options: ["Sofort (max. 1 Std.)", "Am selben Werktag", "Innerhalb 24 Std.", "Innerhalb 48 Std.", "Flexibel"],
        },
        {
          id: "hauptansprechpartner",
          label: "Wer ist mein Hauptansprechpartner?",
          description: "Name, Rolle, Email, gern auch Stellvertretung.",
          type: "longtext",
        },
        {
          id: "meeting_rhythmus",
          label: "Wie oft sollen wir uns synchron austauschen?",
          type: "select",
          options: ["Täglich kurz", "Wöchentliches Jour fixe", "Alle 2 Wochen", "Monatlich", "Nur bei Bedarf"],
        },
      ],
    },
    {
      id: "zugaenge",
      title: "Zugänge & Tools",
      description:
        "Bitte teile keine Passwörter im Klartext — nutze einen Passwort-Manager (1Password, Bitwarden, LastPass) und sende mir den Freigabe-Link.",
      questions: [
        {
          id: "tools",
          label: "Welche Tools nutzt du aktuell?",
          description: "z.B. Notion, Asana, ClickUp, Google Workspace, Microsoft 365 …",
          type: "longtext",
        },
        {
          id: "passwort_manager_link",
          label: "Passwort-Manager-Freigabe (Link)",
          type: "url",
        },
        {
          id: "datenschutz_ok",
          label: "Ich bestätige, dass ich für die geteilten Zugänge berechtigt bin und einen AVV mit der VA abschließen werde.",
          type: "checkbox",
          required: true,
        },
      ],
    },
    {
      id: "sonstiges",
      title: "Sonstiges",
      description: "Alles, was sonst noch wichtig ist.",
      questions: [
        {
          id: "erwartungen",
          label: "Was erwartest du von der Zusammenarbeit — und was nicht?",
          type: "longtext",
        },
        {
          id: "notfall",
          label: "Notfall-Kontakt (für dringende Themen außerhalb der Hauptkontaktwege)",
          type: "text",
        },
        {
          id: "wuensche",
          label: "Was würde diese Zusammenarbeit für dich zum vollen Erfolg machen?",
          type: "longtext",
        },
      ],
    },
  ],
};
