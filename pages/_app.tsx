import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";

import { Layout } from "../components";
import { globalStyles } from "../stitches.config";

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      {globalStyles()}
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}
