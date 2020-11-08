/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, ReactNode, useEffect } from 'react';

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

  useEffect(() => {
    const lsDark = JSON.parse(localStorage.getItem('ThemeContext:isDark'));
    console.log({ lsDark });
    if (lsDark !== undefined && lsDark !== null) {
      setIsDark(lsDark);
    }
  }, []);

  const context: ContextType = {
    toggleDark: () => {
      localStorage.setItem('ThemeContext:isDark', String(!isDark));
      setIsDark(!isDark);
    },
    isDark,
  };
  return (
    <ThemeContext.Provider value={context}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
