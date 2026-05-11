export type QuestionType =
  | "text"
  | "longtext"
  | "url"
  | "email"
  | "select"
  | "multiselect"
  | "checkbox";

export interface Question {
  id: string;
  label: string;
  description?: string;
  type: QuestionType;
  required?: boolean;
  options?: string[];
  placeholder?: string;
}

export interface Section {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface OnboardingConfig {
  intro: {
    title: string;
    description: string;
  };
  thankYou: {
    title: string;
    description: string;
  };
  sections: Section[];
}

export interface Branding {
  vaName: string;
  vaEmail: string;
  primaryColor: string;
  accentColor: string;
  logoUrl?: string;
  greeting: string;
  resendFromEmail: string;
  footerHide: boolean;
}

export type AnswerValue = string | string[] | boolean | null;

export interface ClientSubmission {
  token: string;
  adminToken: string;
  clientName: string;
  clientEmail?: string;
  createdAt: string;
  lastUpdated: string;
  status: "draft" | "submitted";
  answers: Record<string, AnswerValue>;
  dossier?: string;
  emailSentAt?: string;
  emailError?: string;
}
