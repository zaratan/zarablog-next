/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, useState, ReactNode } from 'react';

type ContextType = {
  isProfileOpen: boolean;
  toggleProfileOpen: () => void;
  closeProfile: () => void;
};

const defaultContext: ContextType = {
  isProfileOpen: false,
  toggleProfileOpen: () => console.warn('Should have been overriden'),
  closeProfile: () => console.warn('Should have been overriden'),
};
const LayoutContext = createContext(defaultContext);
export const LayoutProvider = ({ children }: { children: ReactNode }) => {
  const [isProfileOpen, setProfileOpen] = useState(
    defaultContext.isProfileOpen
  );

  const toggleProfileOpen = () => {
    setProfileOpen(!isProfileOpen);
  };

  const closeProfile = () => {
    setProfileOpen(false);
  };

  const context: ContextType = {
    isProfileOpen,
    toggleProfileOpen,
    closeProfile,
  };
  return (
    <LayoutContext.Provider value={context}>{children}</LayoutContext.Provider>
  );
};

export default LayoutContext;
