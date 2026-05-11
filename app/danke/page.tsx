import { config } from "@/config/onboarding";
import { BrandHeader } from "@/components/BrandHeader";
import { BrandFooter } from "@/components/BrandFooter";

export default function DankePage() {
  return (
    <>
      <BrandHeader />
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">{config.thankYou.title}</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          {config.thankYou.description}
        </p>
      </div>
      <BrandFooter />
    </>
  );
}
