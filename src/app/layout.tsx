import type { Metadata } from "next";
import { Overpass } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
const overpass = Overpass({ subsets: ["latin"], variable: "--font-overpass" });

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
          "font-overpass min-h-screen bg-background antialiased",
          overpass.className,
        )}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
