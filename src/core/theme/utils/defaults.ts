import {
  suomifiTheme,
  SuomifiTheme,
  defaultTokens,
  SuomifiTokens,
  DefaultSuomifiTokens,
} from '../';

const internalTokens = (tokens?: SuomifiTokens) =>
  !!tokens ? { ...defaultTokens, ...tokens } : defaultTokens;

/**
 * Check component props and do common defaulting
 * - Check if tokens are given or use default ones
 * - include internal tokens (THESE ARE NOT GEMERATED BY GIVEN TOKENS! but can be overridden by given tokens)
 * @param props All component's props
 */
export const withSuomifiDefaultProps = <T extends { tokens: SuomifiTokens }>({
  tokens,
  ...props
}: Partial<T>): T =>
  ({
    ...props,
    tokens: internalTokens(tokens),
  } as T & { tokens: DefaultSuomifiTokens });

export interface Tokens {
  tokens: SuomifiTokens;
}

export interface Theme {
  theme: SuomifiTheme;
}
export type TokensOrThemeProps = Tokens | Theme;

/**
 * Return theme if defined or theme based on tokens
 * @param {Object} prop.theme Theme if defined
 * @param {Object} prop.tokens Tokens
 */
export const themeOrTokens = (props: TokensOrThemeProps) =>
  'theme' in props ? props.theme : suomifiTheme(props.tokens);
