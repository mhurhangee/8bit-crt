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
  title: '8-Bit CRT',
  description: 'Experience the nostalgia of 8-bit computing with our retro-styled website.',
  openGraph: {
    title: '8-Bit CRT',
    description: 'Experience the nostalgia of 8-bit computing with our retro-styled website.',
    images: [
      {
        url: 'https://8bit-crt.vercel.app/api/og?title=8-Bit%20CRT',
        width: 1200,
        height: 630,
        alt: '8-Bit CRT Website Preview',
      },
    ],
    type: 'website',
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={pressStart2P.className}>
        <CRTEffect>
          <EightBitLayout>{children}</EightBitLayout>
        </CRTEffect>
      </body>
    </html>
  );
}