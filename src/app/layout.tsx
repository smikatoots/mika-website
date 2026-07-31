import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Hanken_Grotesk } from "next/font/google";
import Script from "next/script";

import { SiteStructuredData } from "@/components/SiteStructuredData";
import { buildOpenGraph, buildTwitter } from "@/lib/site-metadata";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
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
      className={`${bricolage.variable} ${hanken.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <SiteStructuredData />
      </head>
      <body className="flex min-h-screen flex-col antialiased" style={{ background: "var(--mr-bg)", color: "var(--mr-ink)" }}>
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
