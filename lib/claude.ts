import Anthropic from "@anthropic-ai/sdk";
import type {
  ClientSubmission,
  OnboardingConfig,
  AnswerValue,
  Branding,
} from "@/config/types";
import { buildSystemPrompt } from "./prompts";

function formatAnswerValue(value: AnswerValue): string {
  if (value === null || value === undefined) return "_(nicht beantwortet)_";
  if (typeof value === "boolean") return value ? "Ja" : "Nein";
  if (Array.isArray(value)) {
    if (value.length === 0) return "_(nichts ausgewählt)_";
    return value.map((v) => `- ${v}`).join("\n");
  }
  if (typeof value === "string") {
    return value.trim() ? value : "_(leer)_";
  }
  return String(value);
}

function formatAnswersAsMarkdown(
  config: OnboardingConfig,
  answers: Record<string, AnswerValue>,
): string {
  const parts: string[] = [];
  for (const section of config.sections) {
    parts.push(`## ${section.title}`);
    for (const q of section.questions) {
      parts.push(`### ${q.label}`);
      parts.push(formatAnswerValue(answers[q.id] ?? null));
      parts.push("");
    }
  }
  return parts.join("\n");
}

export async function generateDossier(
  submission: ClientSubmission,
  config: OnboardingConfig,
  branding: Branding,
): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error("ANTHROPIC_API_KEY ist nicht gesetzt");
  }

  const client = new Anthropic({ apiKey });
  const systemPrompt = buildSystemPrompt(branding.vaName, submission.clientName);
  const rawAnswers = formatAnswersAsMarkdown(config, submission.answers);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4096,
    system: [
      {
        type: "text",
        text: systemPrompt,
        cache_control: { type: "ephemeral" },
      },
    ],
    messages: [
      {
        role: "user",
        content: `Hier sind die Rohantworten von ${submission.clientName}:\n\n${rawAnswers}`,
      },
    ],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("Keine Text-Antwort von Claude erhalten");
  }
  return textBlock.text;
}
