import {
  suomifiTheme,
  SuomifiTheme,
  defaultTokens,
  SuomifiTokens,
  DefaultSuomifiTokens,
  TokensProp,
} from '../';
import { asPropType } from '../../../utils/typescript';

const internalTokens = (props: TokensProp) =>
  !!props.tokens ? { ...defaultTokens, ...props.tokens } : defaultTokens;

/**
 * Check component props and do common defaulting
 * - Check if tokens are given or use default ones
 * - include internal tokens (THESE ARE NOT GEMERATED BY GIVEN TOKENS! but can be overridden by given tokens)
 * - If as-prop (styled-components) set pass it as asProp
 * @param props All component's props
 */
export const withSuomifiDefaultProps = <
  T extends TokensProp & { asProp?: asPropType }
>({
  tokens,
  as,
  ...props
}: Partial<T> & { as?: asPropType }): T & { tokens: DefaultSuomifiTokens } =>
  ({
    ...props,
    tokens: internalTokens({ tokens }),
    ...(!!as ? { asProp: as } : {}),
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
