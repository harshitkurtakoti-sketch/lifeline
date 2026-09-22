import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LIFELINE — AI Emergency Detection & First Response",
  description:
    "When you can't explain what happened, LIFELINE understands it. An on-device AI emergency detection and contextual response system for the iQOO Hackathon.",
  keywords: [
    "iQOO Hackathon",
    "Emergency Detection",
    "AI Safety",
    "Motion Telemetry",
    "Local-First AI",
    "First Responder",
  ],
  authors: [{ name: "LIFELINE Engineering Team" }],
};

export const viewport: Viewport = {
  themeColor: "#06070a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} dark antialiased`}>
      <body className="min-h-screen bg-[#06070a] text-slate-100 font-sans selection:bg-[#ff2d55]/30 selection:text-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
