import React, { useMemo, useContext, ReactNode } from 'react';
import { GlobalMargins } from '../utils/spacing';

export const SpacingContext = React.createContext({ margins: {} });

export const SpacingConsumer = SpacingContext.Consumer;

export interface SpacingProviderProps {
  margins: GlobalMargins;
  /** Children, returns null if no children are provided */
  children?: ReactNode;
}

export const SpacingProvider = (props: SpacingProviderProps) => {
  const spacingContext = useContext(SpacingContext);

  const globalMargins = useMemo(
    () => ({
      margins: props.margins,
    }),
    [props.margins, spacingContext.margins],
  );

  if (!props.children) {
    return null;
  }
  return (
    <SpacingContext.Provider value={globalMargins}>
      {props.children}
    </SpacingContext.Provider>
  );
};