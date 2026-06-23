import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import Script from "next/script";

import { SiteStructuredData } from "@/components/SiteStructuredData";
import { buildOpenGraph, buildTwitter } from "@/lib/site-metadata";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_SEO_NAME,
  SITE_URL,
} from "@/lib/site";

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
  applicationName: SITE_SEO_NAME,
  title: {
    default: SITE_NAME,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: buildOpenGraph(),
  twitter: buildTwitter(),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaMeasurementId =
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ??
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <SiteStructuredData />
      </head>
      <body className="flex min-h-screen flex-col bg-white text-zinc-950 antialiased">
        {children}
        {gaMeasurementId ? (
          <>
            <Script
              id="google-analytics-init"
              strategy="afterInteractive"
            >{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}');
            `}</Script>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
              strategy="afterInteractive"
            />
          </>
        ) : null}
      </body>
    </html>
  );
}
