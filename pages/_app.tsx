/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useContext, useEffect } from 'react';

import ThemeContext, { ThemeContextProvider } from '../contexts/ThemeContext';
import { LayoutProvider } from '../contexts/LayoutContext';

import '../styles/GlobalStyle.scss';
import '../styles/Code.scss';

const WrappedApp = ({ Component, pageProps }: AppProps) => {
  const { isDark } = useContext(ThemeContext);
  return (
    <div className={`${isDark ? 'theme--dark' : 'theme--light'}`}>
      <Component {...pageProps} />
    </div>
  );
};

function MyApp(appProps: AppProps) {
  useEffect(() => {
    const link = document.createElement('link');
    link.href =
      'https://fonts.googleapis.com/css2?family=Inconsolata&display=swap';
    link.rel = 'stylesheet';

    document.head.appendChild(link);
  });
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeContextProvider>
        <LayoutProvider>
          <WrappedApp {...appProps} />
        </LayoutProvider>
      </ThemeContextProvider>
    </>
  );
}

export default MyApp;
