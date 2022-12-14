import { extractCss } from 'goober';
import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

type Props = {
  css: string;
};

class Document extends NextDocument<Props> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async getInitialProps({ renderPage }: DocumentContext): Promise<any> {
    const page = await renderPage();
    const css = extractCss();
    return { ...page, css };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <style id={'_goober'} dangerouslySetInnerHTML={{ __html: ' ' + this.props.css }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            defer
            strategy='beforeInteractive'
            src='https://api.pirsch.io/pirsch.js'
            id='pirschjs'
            data-code='PSlcyQFqdKiXPOKF50ayJF2i27Ev61uI'
          />
        </body>
      </Html>
    );
  }
}

export default Document;
