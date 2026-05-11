"use client";

import type { Question, AnswerValue } from "@/config/types";

interface Props {
  question: Question;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
}

const inputClass =
  "w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900";

export function QuestionRenderer({ question, value, onChange }: Props) {
  const labelEl = (
    <label className="block text-sm font-medium mb-1">
      {question.label}
      {question.required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );

  const descEl = question.description ? (
    <p className="text-xs text-gray-500 mb-2">{question.description}</p>
  ) : null;

  switch (question.type) {
    case "text":
    case "url":
    case "email":
      return (
        <div>
          {labelEl}
          {descEl}
          <input
            type={question.type === "text" ? "text" : question.type}
            value={typeof value === "string" ? value : ""}
            placeholder={question.placeholder}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          />
        </div>
      );

    case "longtext":
      return (
        <div>
          {labelEl}
          {descEl}
          <textarea
            value={typeof value === "string" ? value : ""}
            placeholder={question.placeholder}
            onChange={(e) => onChange(e.target.value)}
            rows={5}
            className={`${inputClass} resize-y`}
          />
        </div>
      );

    case "select":
      return (
        <div>
          {labelEl}
          {descEl}
          <select
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(e.target.value)}
            className={inputClass}
          >
            <option value="">— bitte auswählen —</option>
            {question.options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      );

    case "multiselect": {
      const current = Array.isArray(value) ? value : [];
      return (
        <div>
          {labelEl}
          {descEl}
          <div className="space-y-2">
            {question.options?.map((opt) => {
              const checked = current.includes(opt);
              return (
                <label
                  key={opt}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => {
                      const next = checked
                        ? current.filter((v) => v !== opt)
                        : [...current, opt];
                      onChange(next);
                    }}
                  />
                  <span className="text-sm">{opt}</span>
                </label>
              );
            })}
          </div>
        </div>
      );
    }

    case "checkbox":
      return (
        <div>
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={value === true}
              onChange={(e) => onChange(e.target.checked)}
              className="mt-0.5"
            />
            <span className="text-sm">
              {question.label}
              {question.required && <span className="text-red-500 ml-1">*</span>}
              {question.description && (
                <span className="block text-xs text-gray-500 mt-0.5">
                  {question.description}
                </span>
              )}
            </span>
          </label>
        </div>
      );

    default:
      return null;
  }
}
