/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { useContext } from 'react';

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
  return (
    <ThemeContextProvider>
      <LayoutProvider>
        <WrappedApp {...appProps} />
      </LayoutProvider>
    </ThemeContextProvider>
  );
}

export default MyApp;
