/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-danger */
import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

import { getCssText } from "../stitches.config";

type Props = {
  css: string;
};

class Document extends NextDocument<Props> {
  static async getInitialProps({ renderPage }: DocumentContext): Promise<any> {
    const page = await renderPage();
    const css = getCssText();
    return { ...page, css };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <style dangerouslySetInnerHTML={{ __html: " " + this.props.css }} id="stitches" />
          <meta charSet="UTF-8" />

          <meta content="https://dolmios.com" property="og:url" />
          <meta content="Jackson Dolman" property="og:title" />
          <meta content="Jackson Dolman's personal website" property="og:description" />
          <meta content="Jackson Dolman" property="og:site_name" />
          <meta content="https://dolmios.com/meta.jpg" property="og:image" />
          <meta content="website" property="og:type" />
          <meta content="en_US" property="og:locale" />

          <meta content="summary" name="twitter:card" />
          <meta content="@jacksondolman" name="twitter:site" />
          <meta content="Jackson Dolman's personal website" name="description" />
          <link href="/favicon.ico" rel="icon" />

          <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
          <link href="/favicon-32x32.png" rel="icon" sizes="32x32" type="image/png" />
          <link href="/favicon-16x16.png" rel="icon" sizes="16x16" type="image/png" />
          <link href="/site.webmanifest" rel="manifest" />
          <meta content="#000000" name="msapplication-TileColor" />
          <meta content="#000000" name="theme-color" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
