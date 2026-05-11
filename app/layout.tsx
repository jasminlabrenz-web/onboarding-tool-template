import type { Metadata } from "next";
import { branding } from "@/config/branding";
import "./globals.css";

export const metadata: Metadata = {
  title: `Onboarding bei ${branding.vaName}`,
  description: `Onboarding-Formular für neue Kundinnen von ${branding.vaName}.`,
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const brandStyles = `
    :root {
      --brand-primary: ${branding.primaryColor};
      --brand-accent: ${branding.accentColor};
    }
  `;

  return (
    <html lang="de">
      <head>
        <style dangerouslySetInnerHTML={{ __html: brandStyles }} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
