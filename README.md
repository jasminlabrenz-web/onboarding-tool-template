# Onboarding-Tool für VAs

Self-Hosting-Template für ein gebrandetes Kundinnen-Onboarding-Formular mit Resume-Link, Auto-Save und Claude-veredeltem Dossier per Email.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fjasminlabrenz-web%2Fonboarding-tool-template&env=BRAND_VA_NAME,BRAND_VA_EMAIL,BRAND_PRIMARY_COLOR,BRAND_ACCENT_COLOR,BRAND_GREETING,ADMIN_PASSWORD,ANTHROPIC_API_KEY,RESEND_API_KEY&envDescription=Pflicht%3A+BRAND_VA_EMAIL%2C+ADMIN_PASSWORD%2C+ANTHROPIC_API_KEY%2C+RESEND_API_KEY.+Rest+kann+nachtr%C3%A4glich+im+Dashboard+gesetzt+werden.&project-name=onboarding&repository-name=onboarding-tool&stores=%5B%7B%22type%22%3A%22kv%22%7D%5D)

## Was das Tool kann

- Du legst im Admin-Bereich eine neue Kundin an und bekommst zwei Links: einen für deine Kundin (zum Ausfüllen) und einen Admin-Link (zum Vorausfüllen oder Einsehen)
- Deine Kundin füllt das Formular in ihrem Tempo aus — Tab schließen und später wiederkommen funktioniert
- Beim Absenden generiert Claude aus den Antworten ein sauberes Markdown-Dossier (Kurzprofil, Eckdaten, Branding, Auftragsumfang, To-Dos, offene Fragen)
- Du bekommst eine Email mit dem Dossier inline + `.md`- und `.json`-Anhang zum Direkt-Import in Notion, Obsidian etc.
- Die Fragen kommen aus einer einzigen Config-Datei mit 5 fertigen Presets (Allrounder, Social Media, Buchhaltung, Copywriter, Blank)
- Du hostest selbst — eigene Domain möglich, eigene Daten, eigenes Branding

## Setup in 10 Minuten

### 1. Eigene Kopie erstellen

Klick oben rechts auf **„Use this template"** → **„Create a new repository"** → wähle einen Namen wie `onboarding-{deinname}`.

### 2. Auf Vercel deployen

Klick den **„Deploy with Vercel"**-Button oben oder gehe auf [vercel.com/new](https://vercel.com/new) und wähle dein neu erstelltes Repo aus.

### 3. Vercel KV anschließen

Im Vercel-Projekt: **Storage → Create Database → Marketplace → Upstash → Redis** wählen. Region **Frankfurt (eu-west-1)** wählen, dann **Create**. Anschließend **Connect to Project** → dein Projekt wählen.

**⚠️ Wichtig:** Im Dialog **„Connect Project"** beim Feld **„Custom Environment Variable Prefix"** den Default `STORAGE` durch **`KV`** ersetzen — sonst findet das Tool die Datenbank nicht und die Admin-Seite zeigt einen 500-Fehler.

### 4. ENV-Variablen setzen

Im Vercel-Dashboard unter **Settings → Environment Variables**:

| Variable | Pflicht | Beschreibung |
|----------|---------|--------------|
| `BRAND_VA_EMAIL` | ✅ | Deine Email — hier landen die Dossiers |
| `ADMIN_PASSWORD` | ✅ | Frei wählbar — schützt den Admin-Bereich |
| `ANTHROPIC_API_KEY` | ✅ | Von [console.anthropic.com/settings/keys](https://console.anthropic.com/settings/keys) |
| `RESEND_API_KEY` | ✅ | Von [resend.com/api-keys](https://resend.com/api-keys) (Free Tier reicht) |
| `BRAND_VA_NAME` | ⬜ | Dein Name oder Firmenname (Default: „Deine VA") |
| `BRAND_PRIMARY_COLOR` | ⬜ | Hex-Code, z.B. `#7371FC` |
| `BRAND_ACCENT_COLOR` | ⬜ | Hex-Code für Akzentfarbe |
| `BRAND_LOGO_URL` | ⬜ | URL zu deinem Logo |
| `BRAND_GREETING` | ⬜ | Begrüßungstext oben im Formular |
| `BRAND_RESEND_FROM_EMAIL` | ⬜ | Absender (Default: `onboarding@resend.dev`) |
| `FOOTER_HIDE` | ⬜ | `true`, wenn du den Footer-Hinweis ausblenden willst |

### 5. Preset wählen

Öffne `config/onboarding.ts` (direkt in GitHub-Web-UI mit dem Stift-Icon editieren oder lokal). Ersetze den Import durch dein Preset:

```ts
export { socialMedia as config } from "./presets/social-media";
// oder
export { buchhaltung as config } from "./presets/buchhaltung";
// oder
export { copywriter as config } from "./presets/copywriter";
// oder
export { blank as config } from "./presets/blank";
```

Speichern → Vercel deployt automatisch neu in ~60 Sekunden.

### 6. Erste Kundin anlegen

Gehe auf `https://deinurl.vercel.app/admin`, logge dich mit `ADMIN_PASSWORD` ein, lege eine Test-Kundin an, füll das Formular aus, sende ab und prüfe, ob die Mail bei dir ankommt.

---

## Eigene Fragen definieren

Editiere `config/onboarding.ts` (oder das gewählte Preset in `config/presets/`). Jede Frage hat dieses Format:

```ts
{
  id: "firmenname",           // muss eindeutig sein
  label: "Firmenname",        // wird über dem Feld angezeigt
  description: "Optional",    // kleiner Hilfetext darunter
  type: "text",               // Feld-Typ (siehe unten)
  required: true,             // Pflichtfeld?
  placeholder: "z.B. ...",    // Platzhalter im Feld
}
```

Verfügbare `type`-Werte:

- `text` — einzeiliges Textfeld
- `longtext` — mehrzeiliges Textfeld
- `url` — URL mit Validierung
- `email` — Email mit Validierung
- `select` — Dropdown (`options: string[]` als Array)
- `multiselect` — Checkbox-Liste (`options: string[]`)
- `checkbox` — einzelne Checkbox (gut für Zustimmungen)

Vollständige Doku in `config/types.ts`.

---

## API-Keys besorgen

### Anthropic (Claude)

1. [console.anthropic.com](https://console.anthropic.com) → Settings → API Keys
2. „Create Key" → kopieren, in Vercel als `ANTHROPIC_API_KEY` eintragen
3. Pro Dossier kostet ca. 0,01–0,02 € (Sonnet 4.6) — Free-Credits reichen für die ersten Tests

### Resend (Email)

1. [resend.com](https://resend.com) → Account anlegen
2. API Keys → neuer Key → kopieren, in Vercel als `RESEND_API_KEY`
3. Free Tier: 3.000 Mails/Monat — reicht locker
4. **Optional aber empfohlen:** eigene Domain unter „Domains" verifizieren, dann `BRAND_RESEND_FROM_EMAIL` auf `onboarding@deinedomain.de` setzen. Ohne Domain-Verifikation funktioniert der Default `onboarding@resend.dev`, Mails landen aber öfter im Spam.

---

## Lokal entwickeln

```bash
pnpm install
cp .env.example .env.local
# .env.local mit deinen Werten füllen
pnpm dev
```

Für lokales KV-Testen entweder Vercel KV via `vercel env pull` ziehen oder Vercel CLI nutzen.

---

## FAQ

**Wer kann das Formular ausfüllen?**
Jeder, der den Token-Link bekommt. Der Link hat 16 zufällige Zeichen — nicht erratbar, aber auch nicht weitergabe-geschützt. Behandle ihn wie einen Magic-Link.

**Was passiert beim Absenden?**
Status wird auf „eingereicht" gesetzt, Claude generiert das Dossier, Resend schickt dir die Mail. Deine Kundin sieht die Danke-Seite.

**Kann die Kundin nach dem Absenden noch ändern?**
Ja — Link nochmal öffnen, Antworten ergänzen, erneut absenden. Du bekommst eine neue Mail.

**Wo liegen die Daten?**
In Vercel KV (Redis) in der Frankfurt-Region. Wenn du eine Kundin löschst, sind alle ihre Daten weg.

**Was kostet das?**
- Vercel Hobby: kostenlos (für deinen eigenen Use Case)
- Vercel KV Free Tier: 30k Commands/Monat — reicht für 50+ Kundinnen
- Anthropic: ~0,01–0,02 € pro Dossier
- Resend: kostenlos bis 3.000 Mails/Monat

**DSGVO?**
Du bist Verantwortliche für die Daten deiner Kundinnen. Schließe einen AVV mit deiner Kundin und mit Vercel + Resend + Anthropic. Im Tool selbst werden keine Tracking-Cookies o.ä. gesetzt.

**Kann ich mehrere unterschiedliche Formulare betreiben?**
Pro Deploy ein Formular. Wenn du z.B. ein Social-Media- und ein Buchhaltungs-Onboarding parallel brauchst: einfach ein zweites Vercel-Projekt aus demselben Repo deployen, andere ENV-Variablen, anderes Preset.

---

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS 4
- Vercel KV (Redis)
- Anthropic SDK (Claude Sonnet 4.6)
- Resend (Email)
- `nanoid` für Token-Generierung

## Lizenz

MIT — nutz es, fork es, pass es an. Wenn du es nützlich findest und es weiterempfiehlst, freu ich mich.

Erstellt von [Jasmin Labrenz](https://jasminlabrenz.de) für den Claude-Code-Kurs (Modul 1).
