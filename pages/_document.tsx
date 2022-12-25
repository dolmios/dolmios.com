import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from "next/document";

import { getCssText } from "../stitches.config";

type Props = {
  css: string;
};

class Document extends NextDocument<Props> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async getInitialProps({ renderPage }: DocumentContext): Promise<any> {
    const page = await renderPage();
    const css = getCssText();
    return { ...page, css };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          <style id="stitches" dangerouslySetInnerHTML={{ __html: " " + this.props.css }} />
          <meta charSet="UTF-8" />

          <meta property="og:url" content="https://dolmios.com" />
          <meta property="og:title" content="Jackson Dolman" />
          <meta property="og:description" content="Jackson Dolman's personal website" />
          <meta property="og:site_name" content="Jackson Dolman" />
          <meta property="og:image" content="https://dolmios.com/meta.jpg" />
          <meta property="og:type" content="website" />
          <meta property="og:locale" content="en_US" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:site" content="@jacksondolman" />
          <meta name="description" content="Jackson Dolman's personal website" />
          <link rel="icon" href="/favicon.ico" />

          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="msapplication-TileColor" content="#000000" />
          <meta name="theme-color" content="#000000" />
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
