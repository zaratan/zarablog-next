import Document, {
  DocumentContext,
  Html,
  Head,
  Main,
  NextScript,
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="google-site-verification"
            content="NRxEEOcQFFgZsHEu39yfQ2UJUX69eNfZof1JrPybwlo"
          />
          <link
            rel="preconnect"
            href="https://fonts.googleapis.com/css?family=Inconsolata&amp;display=swap"
          />
          <link
            rel="preload"
            href="https://fonts.gstatic.com/s/inconsolata/v18/QldKNThLqRwH-OJ1UHjlKGlZ5qhExfHw.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"
            rel="stylesheet"
          />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@zaratan" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
