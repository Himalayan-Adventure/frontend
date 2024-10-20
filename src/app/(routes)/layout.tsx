import type { Metadata } from "next";
import "@/app/globals.css";
import { Navbar } from "@/components/navbar";
import { Suspense } from "react";
import { siteConfig } from "@/config/site-config";

export const metadata: Metadata = {
  title: {
    default: siteConfig.siteName,
    template: `%s - ${siteConfig.siteName}`,
  },
  description: siteConfig.siteDescription,
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Suspense>
        <Navbar />
      </Suspense>
      {children}
    </main>
  );
}
