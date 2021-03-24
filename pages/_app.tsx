/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { GoogleFonts } from 'next-google-fonts';
import { appWithTranslation } from 'next-i18next';
import ThemeContext, { ThemeContextProvider } from '../contexts/ThemeContext';
import { LayoutProvider } from '../contexts/LayoutContext';

import '../styles/GlobalStyle.scss';
import '../styles/Code.scss';
import { PreferencesProvider } from '../contexts/PreferencesContext';

const WrappedApp = appWithTranslation(({ Component, pageProps }: AppProps) => {
  const { isDark } = useContext(ThemeContext);
  useEffect(() => {
    document.querySelector('html').className = isDark ? 'dark' : 'light';
  }, [isDark]);
  return (
    <div className={`${isDark ? 'theme--dark' : 'theme--light'}`}>
      <Component {...pageProps} />
    </div>
  );
});

function MyApp(appProps: AppProps) {
  return (
    <>
      <GoogleFonts href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap" />
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <ThemeContextProvider>
        <LayoutProvider>
          <PreferencesProvider>
            <WrappedApp {...appProps} />
          </PreferencesProvider>
        </LayoutProvider>
      </ThemeContextProvider>
    </>
  );
}

export default MyApp;
