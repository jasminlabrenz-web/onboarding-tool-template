import type { OnboardingConfig } from "../types";

export const buchhaltung: OnboardingConfig = {
  intro: {
    title: "Willkommen — schön, dass du dich für eine Zusammenarbeit entschieden hast!",
    description:
      "Damit ich deine Buchhaltung sauber übernehmen kann, brauche ich ein paar Eckdaten. Bitte teile sensible Zugänge nur über einen Passwort-Manager. Du kannst zwischendurch speichern und später weitermachen.",
  },
  thankYou: {
    title: "Vielen Dank!",
    description:
      "Ich habe alle Infos erhalten und melde mich mit den nächsten Schritten. Falls dir noch etwas einfällt, kannst du diesen Link erneut öffnen und ergänzen.",
  },
  sections: [
    {
      id: "firmendaten",
      title: "Firmen- & Steuerdaten",
      questions: [
        { id: "firmenname", label: "Firmenname (rechtlich)", type: "text", required: true },
        { id: "vorname_nachname", label: "Inhaber:in / Geschäftsführung", type: "text", required: true },
        {
          id: "rechtsform",
          label: "Rechtsform",
          type: "select",
          options: ["Einzelunternehmen", "GbR", "UG (haftungsbeschränkt)", "GmbH", "Freiberufler:in", "Sonstige"],
        },
        {
          id: "steuernummer",
          label: "Steuernummer",
          type: "text",
        },
        {
          id: "ust_idnr",
          label: "USt-IdNr. (falls vorhanden)",
          type: "text",
        },
        {
          id: "finanzamt",
          label: "Zuständiges Finanzamt",
          type: "text",
        },
        {
          id: "geschaeftsjahr",
          label: "Geschäftsjahr",
          type: "select",
          options: ["Kalenderjahr (01.01.–31.12.)", "Abweichendes Geschäftsjahr"],
        },
        {
          id: "umsatzsteuerpflicht",
          label: "Umsatzsteuerpflicht",
          type: "select",
          options: ["Regelbesteuerung", "Kleinunternehmer (§19 UStG)", "Steuerfrei", "Unklar"],
        },
      ],
    },
    {
      id: "steuerberater",
      title: "Steuerberatung & Software",
      questions: [
        {
          id: "steuerberater_name",
          label: "Name des Steuerberaters / der Kanzlei",
          type: "text",
        },
        {
          id: "steuerberater_kontakt",
          label: "Kontaktdaten Steuerberater (Email + Telefon)",
          type: "longtext",
        },
        {
          id: "buchhaltungs_software",
          label: "Eingesetzte Buchhaltungs-Software",
          type: "select",
          options: ["DATEV (Unternehmen online)", "sevDesk", "lexoffice", "Buchhaltungsbutler", "Papierkram", "Bexio", "Excel", "Sonstige", "Noch keine"],
        },
        {
          id: "software_zugang",
          label: "Wie bekomme ich Zugang zur Software?",
          description: "Bestehender Mandanten-Zugang? Neuer User notwendig?",
          type: "longtext",
        },
        {
          id: "schnittstellen",
          label: "Bestehende Schnittstellen / Integrationen",
          description: "z.B. GetMyInvoices, Pleo, Bank-API, Shopify-Anbindung",
          type: "longtext",
        },
      ],
    },
    {
      id: "bankkonten",
      title: "Bankkonten",
      description: "Bitte keine Klartext-Zugänge — Passwort-Manager nutzen.",
      questions: [
        {
          id: "hauptbank",
          label: "Hauptbankkonto (Bank + IBAN)",
          type: "longtext",
        },
        {
          id: "weitere_konten",
          label: "Weitere Konten (Bank + IBAN + Zweck)",
          type: "longtext",
        },
        {
          id: "kreditkarten",
          label: "Geschäfts-Kreditkarten (Anbieter + Inhaber)",
          type: "longtext",
        },
        {
          id: "paypal_stripe",
          label: "PayPal / Stripe / sonstige Zahlungsdienstleister",
          type: "longtext",
        },
        {
          id: "passwort_manager_link",
          label: "Passwort-Manager-Freigabe (Link)",
          type: "url",
        },
      ],
    },
    {
      id: "belegprozess",
      title: "Belegprozess",
      questions: [
        {
          id: "belege_eingang",
          label: "Wie kommen Belege bisher rein?",
          type: "multiselect",
          options: ["Email-Postfach", "Drive/Dropbox-Ordner", "Foto-App (z.B. GetMyInvoices)", "Postalisch", "Direkt vom Lieferanten an Steuerberater"],
        },
        {
          id: "belege_volumen",
          label: "Wie viele Belege ungefähr pro Monat?",
          type: "select",
          options: ["bis 20", "20–50", "50–100", "100–250", "250+"],
        },
        {
          id: "belege_aktueller_stand",
          label: "Aktueller Buchungsstand",
          description: "Bis wann ist alles erfasst? Wo gibt es Rückstände?",
          type: "longtext",
        },
        {
          id: "kasse",
          label: "Gibt es eine Barkasse?",
          type: "select",
          options: ["Nein", "Ja, geführt", "Ja, aber Nachholbedarf"],
        },
      ],
    },
    {
      id: "aufgabenumfang",
      title: "Aufgabenumfang",
      questions: [
        {
          id: "aufgaben",
          label: "Welche Aufgaben soll ich übernehmen?",
          type: "multiselect",
          options: [
            "Belege erfassen & sortieren",
            "Rechnungen schreiben",
            "Mahnwesen",
            "USt-Voranmeldung",
            "Reisekosten",
            "Lohnbuchhaltung",
            "Vorbereitung Jahresabschluss",
            "Reporting / Auswertungen",
          ],
        },
        {
          id: "umfang_monat",
          label: "Geschätzter Aufwand pro Monat (Stunden)",
          type: "text",
        },
        {
          id: "spezielles",
          label: "Besonderheiten / Spezialfälle?",
          description: "Auslandsrechnungen, Reverse Charge, OSS-Verfahren, Anlagenverzeichnis …",
          type: "longtext",
        },
      ],
    },
    {
      id: "termine",
      title: "Fristen & Termine",
      questions: [
        {
          id: "ust_rhythmus",
          label: "USt-Voranmeldung",
          type: "select",
          options: ["Monatlich", "Quartalsweise", "Jährlich", "Nicht relevant"],
        },
        {
          id: "wichtige_termine",
          label: "Wichtige wiederkehrende Termine",
          description: "z.B. Reporting an Investoren am 5. jedes Monats",
          type: "longtext",
        },
        {
          id: "datenschutz_ok",
          label: "Ich bestätige, dass ich für die geteilten Zugänge berechtigt bin und einen AVV mit der VA abschließen werde.",
          type: "checkbox",
          required: true,
        },
      ],
    },
  ],
};
