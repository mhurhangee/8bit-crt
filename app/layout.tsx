import "./globals.css";
import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import EightBitLayout from "@/components/EBLayout";
import CRTEffect from "@/components/CRTEffect";

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "8-Bit CRT App",
  description: "A retro-styled website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pressStart2P.className}>
        <CRTEffect />
        <EightBitLayout>{children}</EightBitLayout>
      </body>
    </html>
  );
}
