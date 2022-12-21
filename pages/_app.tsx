import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

import { Layout } from "../components";
import { globalStyles } from "../stitches.config";

globalStyles();
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}
