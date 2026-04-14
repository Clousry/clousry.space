import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const siteUrl = "https://clousry.space";
const themeBootstrapScript = `
(() => {
  try {
    const storageKey = "clousry-theme";
    const savedTheme = window.localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const resolvedTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : systemTheme;
    const isAndroid = /android/i.test(window.navigator.userAgent);
    const supportsBackdrop =
      window.CSS?.supports?.("backdrop-filter: blur(1px)") ||
      window.CSS?.supports?.("-webkit-backdrop-filter: blur(1px)");
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.dataset.platform = isAndroid ? "android" : "default";
    document.documentElement.dataset.backdrop = supportsBackdrop ? "supported" : "unsupported";
  } catch {
    document.documentElement.dataset.theme = "light";
    document.documentElement.dataset.platform = "default";
    document.documentElement.dataset.backdrop = "unsupported";
  }
})();
`;

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} scroll-smooth`}
    >
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrapScript }} />
        {children}
      </body>
    </html>
  );
}
