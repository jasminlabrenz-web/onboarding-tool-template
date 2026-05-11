import { BrandHeader } from "@/components/BrandHeader";
import { BrandFooter } from "@/components/BrandFooter";
import { branding } from "@/config/branding";

export default function Home() {
  return (
    <>
      <BrandHeader />
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Willkommen!</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
          Dies ist das Onboarding-Tool von <strong>{branding.vaName}</strong>.
        </p>
        <p className="text-gray-600 dark:text-gray-300">
          Bitte folge dem persönlichen Link, den du per Email bekommen hast.
        </p>
      </div>
      <BrandFooter />
    </>
  );
}
