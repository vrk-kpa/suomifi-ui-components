import React, { useMemo, useContext } from 'react';
import {
  PartialSuomifiTheme,
  getSuomifiTheme,
  defaultSuomifiTheme,
} from '../SuomifiTheme/SuomifiTheme';

export const SuomifiThemeContext = React.createContext({
  suomifiTheme: defaultSuomifiTheme,
});

export const SuomifiThemeConsumer = SuomifiThemeContext.Consumer;

export interface SuomifiThemeProviderProps {
  /**
   * Partial Suomifi Theme with needed tokens and styles defined.
   * Tokens and styles not provided will be merged from default theme.
   * SuomifiTheme values property is not supported.
   * Gradients, Shadows and Focus are derived from provided colors, except if explicitly defined.
   */
  theme: PartialSuomifiTheme;
  /** Children, returns null if no childred are provided */
  children?: JSX.Element;
}

export const SuomifiThemeProvider = (props: SuomifiThemeProviderProps) => {
  const themeContext = useContext(SuomifiThemeContext);
  const derivedThemeContext = useMemo(
    () => ({
      suomifiTheme: getSuomifiTheme({
        customTheme: props.theme,
        defaultTheme: themeContext.suomifiTheme,
      }),
    }),
    [props.theme, themeContext.suomifiTheme],
  );

  if (!props.children) {
    return null;
  }
  return (
    <SuomifiThemeContext.Provider value={derivedThemeContext}>
      {props.children}
    </SuomifiThemeContext.Provider>
  );
};
