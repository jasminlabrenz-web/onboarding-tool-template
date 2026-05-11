import { branding } from "@/config/branding";

export function BrandFooter() {
  if (branding.footerHide) return null;
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
      <div className="max-w-4xl mx-auto px-4 py-6 text-sm text-gray-500 dark:text-gray-400 text-center">
        Erstellt mit dem{" "}
        <a
          href="https://github.com/jasminlabrenz-web/onboarding-tool-template"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-70"
        >
          Onboarding-Tool-Template
        </a>{" "}
        von Jasmin Labrenz
      </div>
    </footer>
  );
}
