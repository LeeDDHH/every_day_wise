'use strcit';

import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { theme } from '../src/theme';
import createEmotionCache from '../src/createEmotionCache';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';

// https://stackoverflow.com/questions/67087999/how-to-properly-type-the-document-tsx-file-from-next-js
import { AppType } from 'next/dist/shared/lib/utils';
import { EmotionCache } from '@emotion/cache';
type EnhanceAppType =
  | AppType
  | React.ComponentType<{ emotionCache: EmotionCache }>;

type MyDocumentProps = {
  emotionStyleTags: EmotionJSX.Element[];
};

export default class MyDocument extends Document<MyDocumentProps> {
  override render() {
    return (
      <Html lang="ja">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicons/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicons/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicons/favicon-16x16.png"
          />
          <link rel="manifest" href="/favicons/site.webmanifest" />
          <link
            rel="mask-icon"
            href="/favicons/safari-pinned-tab.svg"
            color="#5bbad5"
          />
          <link rel="shortcut icon" href="/favicons/favicon.ico" />
          <meta
            name="msapplication-config"
            content="/favicons/browserconfig.xml"
          />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
          />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=M+PLUS+1p:wght@500&display=swap"
            rel="stylesheet"
          />
          {this.props.emotionStyleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App: EnhanceAppType) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
  };
};
