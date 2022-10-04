"use strcit";

import Document, { Html, Head, Main, NextScript } from "next/document";
import { theme } from "../src/theme";
import createEmotionCache from "../src/createEmotionCache";
import { EmotionJSX } from "@emotion/react/types/jsx-namespace";

type MyDocumentProps = {
  emotionStyleTags: EmotionJSX.Element[];
};

export default class MyDocument extends Document<MyDocumentProps> {
  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta name="theme-color" content={theme.palette.primary.main} />
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
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
      enhanceApp: (App: any) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
  };
};
