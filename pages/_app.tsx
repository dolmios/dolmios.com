// eslint-disable-next-line import/no-unresolved
import { Analytics } from '@vercel/analytics/react';
import { setup } from 'goober';
import { prefix } from 'goober/prefixer';
import type { AppProps } from 'next/app';
import { createElement } from 'react';

import { Layout } from '../components/Layout';
import { GlobalStyles } from '../styles/globals';

setup(createElement, prefix);

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Layout>
      <GlobalStyles />
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}
