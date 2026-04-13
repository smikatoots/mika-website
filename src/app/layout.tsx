import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";

import { SITE_NAME, SITE_URL } from "@/lib/site";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: "Mika Reyes — AI, startups, and life.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    description: "Mika Reyes — AI, startups, and life.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1024,
        height: 537,
        alt: "Mika Reyes — follow for real talk on founder life, AI, and living time-rich.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-white text-zinc-950 antialiased">
        {children}
      </body>
    </html>
  );
}
