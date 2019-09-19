import { defaultTokens, TokensProp, DefaultTokensProp } from '../';

const internalTokens = (tokens?: TokensProp) =>
  !!tokens ? { ...defaultTokens, ...tokens } : defaultTokens;

/**
 * Check if tokens are given or use default ones
 * @param props All component props
 */
export const withDefaultTheme = <T extends { tokens: TokensProp }>({
  tokens,
  ...props
}: Partial<T>): T =>
  ({
    ...props,
    tokens: internalTokens(tokens),
  } as T & { tokens: DefaultTokensProp });
