/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, ReactNode, useEffect } from 'react';

type ContextType = { wideCodeBlock: boolean; toggleWideCodeBlocks: () => void };

const defaultContext: ContextType = {
  wideCodeBlock: false,
  toggleWideCodeBlocks: () => {
    console.log('Should have been overriden');
  },
};

const PreferencesContext = createContext(defaultContext);

const lsWideCodeBlockKey = 'PreferencesContext:wideCodeBlock';

export const PreferencesProvider = ({ children }: { children: ReactNode }) => {
  const [wideCodeBlock, setWideCodeBlock] = useState(false);

  useEffect(() => {
    const lsWideCodeBlock = JSON.parse(
      localStorage.getItem(lsWideCodeBlockKey)
    );

    if (lsWideCodeBlock !== undefined && lsWideCodeBlock !== null) {
      setWideCodeBlock(lsWideCodeBlock);
    }
  }, []);

  const context: ContextType = {
    wideCodeBlock,
    toggleWideCodeBlocks: () => {
      localStorage.setItem(lsWideCodeBlockKey, String(!wideCodeBlock));
      setWideCodeBlock(!wideCodeBlock);
    },
  };

  return (
    <PreferencesContext.Provider value={context}>
      {children}
    </PreferencesContext.Provider>
  );
};

export default PreferencesContext;
