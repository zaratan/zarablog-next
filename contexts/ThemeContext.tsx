/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, ReactNode } from 'react';
import baseTheme, { lightTheme, darkTheme } from '../styles/BaseTheme';

type ThemeType = {
  yellow: string;
  orange: string;
  red: string;
  magenta: string;
  violet: string;
  blue: string;
  cyan: string;
  green: string;
  base0: string;
  base1: string;
  base2: string;
  base3: string;
  base00: string;
  base01: string;
  base02: string;
  base03: string;
};

type ContextType = {
  theme: ThemeType;
  toggleDark: () => void;
  isDark: boolean;
};

const fullDarkTheme = { ...baseTheme, ...darkTheme };
const fullLightTheme = { ...baseTheme, ...lightTheme };

const defaultContext: ContextType = {
  theme: fullDarkTheme,
  toggleDark: () => {
    console.warn('Should have been overriden');
  },
  isDark: true,
};

const ThemeContext = createContext(defaultContext);
export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const context: ContextType = {
    theme: isDark ? fullDarkTheme : fullLightTheme,
    toggleDark: () => {
      setIsDark(!isDark);
    },
    isDark,
  };
  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
