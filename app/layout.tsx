import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import { cookies } from "next/headers";

import { Providers } from "@/app/providers";
import { Styles } from "@/app/styles";

const standardFont = localFont({
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  src: [
    {
      path: "../public/fonts/standard-book.woff2",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/fonts/standard-bold.woff2",
      style: "normal",
      weight: "500",
    },
  ],
  variable: "--font-standard",
});

const baseUrl = "https://dolmios.com";

export const metadata: Metadata = {
  alternates: {
    canonical: baseUrl,
  },
  appleWebApp: {
    title: "DOLMIOS",
  },
  description:
    "Full-Stack Developer in New York. I build web applications, work with AI, and help teams ship product.",
  icons: {
    apple: "/apple-touch-icon.png",
    icon: [
      { sizes: "96x96", type: "image/png", url: "/favicon-96x96.png" },
      { type: "image/svg+xml", url: "/favicon.svg" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    description:
      "Full-Stack Developer in New York. I build web applications, work with AI, and help teams ship product.",
    siteName: "dolmios.com",
    title: "Jackson Dolman",
    type: "website",
    url: baseUrl,
  },
  title: {
    default: "dolmios.com",
    template: "%s | dolmios.com",
  },
  twitter: {
    card: "summary_large_image",
    description:
      "Full-Stack Developer in New York. I build web applications, work with AI, and help teams ship product.",
    site: "@jacksondolman",
    title: "Jackson Dolman",
  },
};

export const viewport: Viewport = {
  initialScale: 1,
  maximumScale: 5,
  width: "device-width",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}): Promise<ReactNode> {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("dolmios-theme");
  const initialTheme = themeCookie?.value || "light";

  return (
    <html
      className={standardFont.variable}
      data-theme={initialTheme}
      lang="en"
      suppressHydrationWarning>
      <body
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
        suppressHydrationWarning>
        <Styles />
        <Providers initialTheme={initialTheme}>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
