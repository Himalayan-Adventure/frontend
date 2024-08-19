import type { Metadata } from "next";
import { Overpass, Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
const overpass = Overpass({ subsets: ["latin"], variable: "--font-overpass" });
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

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
          "font-overpass font-poppins min-h-screen bg-background antialiased",
          overpass.className,
          poppins.className,
        )}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
