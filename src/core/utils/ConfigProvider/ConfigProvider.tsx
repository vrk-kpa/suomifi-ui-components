import React, { createContext, useContext, ReactNode, useMemo } from 'react';

export interface ConfigContextProps {
  idPrefix?: string;
}

const ConfigContext = createContext<ConfigContextProps>({});

export const ConfigProvider = ({
  idPrefix,
  children,
}: {
  idPrefix?: string;
  children: ReactNode;
}) => {
  const value = useMemo(() => ({ idPrefix }), [idPrefix]);

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => useContext(ConfigContext);
