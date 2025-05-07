import { keyframes } from "@stitches/react";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import type { JSX } from "react";
import { SWRConfig } from "swr";

import { Grid, Header, Footer } from "../components";
import { globalStyles } from "../stitches.config";

const fetcher = async (url: string): Promise<unknown> => {
  const res = await fetch(url);

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");

    error.message = await res.text();
    throw error;
  }

  return res.json();
};

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
});

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Grid
      css={{
        animation: `${fadeIn} 3s ease`,
      }}>
      {globalStyles()}

      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: true,
          revalidateOnReconnect: true,
        }}>
        {/* Header with name and contact info */}
        <Header />
        <Component {...pageProps} />
        <Footer />
        <Analytics />
      </SWRConfig>
    </Grid>
  );
}
