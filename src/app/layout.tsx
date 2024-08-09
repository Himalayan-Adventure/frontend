import type { Metadata } from "next";
import { Overpass } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
const overpass = Overpass({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Himalayan Adventure",
  description: "Find your Adventure",
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
          "min-h-screen bg-background font-serif antialiased",
          overpass.className,
        )}
      >
        {children}
      </body>
    </html>
  );
}
