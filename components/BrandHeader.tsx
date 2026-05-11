import Image from "next/image";
import { branding } from "@/config/branding";

export function BrandHeader() {
  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
        {branding.logoUrl ? (
          <Image
            src={branding.logoUrl}
            alt={branding.vaName}
            width={40}
            height={40}
            className="rounded-md"
            unoptimized
          />
        ) : (
          <div
            className="w-10 h-10 rounded-md flex items-center justify-center text-white font-bold"
            style={{ backgroundColor: branding.primaryColor }}
          >
            {branding.vaName.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="font-semibold text-lg">{branding.vaName}</span>
      </div>
    </header>
  );
}
