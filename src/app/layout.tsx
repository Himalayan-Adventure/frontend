import type { Metadata } from "next";
import { Overpass, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import Providers from "@/providers";
import { siteConfig } from "@/config/site-config";
import { AppProgressBar } from "@/components/ui/app-progress-bar";
const overpass = Overpass({
  subsets: ["latin"],
  variable: "--font-overpass",
  display: "swap",
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

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
    <html lang="en">
      <body
        className={cn(
          `min-h-screen bg-background font-overpass antialiased`,
          overpass.variable,
          poppins.variable,
        )}
      >
        <Suspense>
          <AppProgressBar />
        </Suspense>
        <Toaster richColors />
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
