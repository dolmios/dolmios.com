import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";

import { Header, Footer } from "@/components";
import { SWRProvider } from "@/components/SWRProvider";
import { Block } from "@/ui";

import "@/ui/global.css";

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Jackson Dolman",
  description: "Jackson Dolman's personal website",
  metadataBase: new URL("https://dolmios.com"),
  openGraph: {
    title: "Jackson Dolman",
    description: "Jackson Dolman's personal website",
    url: "https://dolmios.com",
    siteName: "Jackson Dolman",
    images: [
      {
        url: "https://dolmios.com/meta.jpg",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    site: "@jacksondolman",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180" },
    ],
    other: [
      { rel: "manifest", url: "/site.webmanifest" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SWRProvider>
          <Block
            css={{
              animation: "fadeIn 3s ease",
            }}>
            <Header />
            {children}
            <Footer />
            <Analytics />
          </Block>
        </SWRProvider>
      </body>
    </html>
  );
} 