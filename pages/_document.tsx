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
