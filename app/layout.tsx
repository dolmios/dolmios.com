import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

import { Providers } from "./providers";
import { Styles } from "./styles";

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
const ogImage = `${baseUrl}/meta.jpg`;

export const metadata: Metadata = {
  alternates: {
    canonical: baseUrl,
  },
  description:
    "Jackson Dolman is a full-stack web developer based in New York City. Working with startups and founders to build modern apps and websites that scale.",
  openGraph: {
    description:
      "Jackson Dolman is a full-stack web developer based in New York City. Working with startups and founders to build modern apps and websites that scale.",
    images: [
      {
        alt: "Jackson Dolman",
        height: 630,
        url: ogImage,
        width: 1200,
      },
    ],
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
      "Jackson Dolman is a full-stack web developer based in New York City. Working with startups and founders to build modern apps and websites that scale.",
    images: [ogImage],
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
      <body suppressHydrationWarning>
        <Styles />
        <Providers initialTheme={initialTheme}>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
