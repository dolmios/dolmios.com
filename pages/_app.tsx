import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { SWRConfig } from "swr";

import { Grid, Header } from "../components";
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

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Grid>
      <Header />
      {globalStyles()}
      <SWRConfig
        value={{
          fetcher,
          revalidateOnFocus: true,
          revalidateOnReconnect: true,
        }}>
        <Component {...pageProps} />
        <Analytics />
      </SWRConfig>
    </Grid>
  );
}
