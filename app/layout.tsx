import type { Metadata } from "next";
import { DM_Sans, Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import "./v2.css";

const sans = DM_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Manrope({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });

export const metadata: Metadata = {
  title: "VÉRTICE | Essentials for the Modern Man",
  metadataBase: new URL("https://vertice-eight-omega.vercel.app"),
  description: "VÉRTICE é uma experiência conceitual de e-commerce masculino premium. Uma curadoria feita para quem sabe onde quer chegar.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${sans.variable} ${heading.variable} ${serif.variable}`}>{children}</body>
    </html>
  );
}