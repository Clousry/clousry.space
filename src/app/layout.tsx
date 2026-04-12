import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const siteUrl = "https://clousry.space";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "CLOUSRY",
  description: "Personal portfolio for post-production, motion, editing and visual craft.",
  openGraph: {
    title: "CLOUSRY",
    description: "Personal portfolio for post-production, motion, editing and visual craft.",
    url: siteUrl,
    siteName: "CLOUSRY",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CLOUSRY portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CLOUSRY",
    description: "Personal portfolio for post-production, motion, editing and visual craft.",
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
