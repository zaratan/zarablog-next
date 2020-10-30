/* eslint-disable react/jsx-props-no-spreading */
import type { AppProps } from 'next/app';
import { useContext } from 'react';
import { ThemeProvider } from 'styled-components';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faUser,
  faSun,
  faMoon,
  faMugHot,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

import { faTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import GlobalStyle from '../styles/GlobalStyle';
import ThemeContext, { ThemeContextProvider } from '../contexts/ThemeContext';
import { LayoutProvider } from '../contexts/LayoutContext';

config.autoAddCss = false;
library.add(
  faHome,
  faUser,
  faSun,
  faSun,
  faMoon,
  faMugHot,
  faEnvelope,
  faTwitter,
  faGithub
);

const WrappedApp = ({ Component, pageProps }: AppProps) => {
  const { theme } = useContext(ThemeContext);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
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
