"use client";

import type { Section } from "@/config/types";
import { clsx } from "clsx";

interface Props {
  sections: Section[];
  completed: boolean[];
  activeIdx: number;
  onSelect: (idx: number) => void;
}

export function SectionNav({ sections, completed, activeIdx, onSelect }: Props) {
  return (
    <nav className="space-y-1">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">
        Abschnitte
      </p>
      {sections.map((s, i) => (
        <button
          key={s.id}
          onClick={() => onSelect(i)}
          className={clsx(
            "w-full text-left px-3 py-2 rounded-md text-sm flex items-center gap-2 transition-colors",
            i === activeIdx
              ? "bg-gray-100 dark:bg-gray-800 font-medium"
              : "hover:bg-gray-50 dark:hover:bg-gray-900",
          )}
        >
          <span
            className={clsx(
              "w-4 h-4 rounded-full text-[10px] flex items-center justify-center border",
              completed[i]
                ? "bg-green-500 border-green-500 text-white"
                : "border-gray-300 dark:border-gray-700 text-gray-400",
            )}
          >
            {completed[i] ? "✓" : i + 1}
          </span>
          <span className="flex-1 truncate">{s.title}</span>
        </button>
      ))}
    </nav>
  );
}
