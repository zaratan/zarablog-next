/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, ReactNode } from 'react';

type ContextType = {
  toggleDark: () => void;
  isDark: boolean;
};

const defaultContext: ContextType = {
  toggleDark: () => {
    console.warn('Should have been overriden');
  },
  isDark: true,
};

const ThemeContext = createContext(defaultContext);
export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [isDark, setIsDark] = useState(true);
  const context: ContextType = {
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
