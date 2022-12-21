// eslint-disable-next-line import/no-unresolved
import { Analytics } from "@vercel/analytics/react";
import { setup } from "goober";
import { prefix } from "goober/prefixer";
import type { AppProps } from "next/app";
import { createElement } from "react";

import { Layout } from "../components";
import { reset } from "../styles";

setup(createElement, prefix);
reset();
export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}
