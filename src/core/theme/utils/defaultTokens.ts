import { defaultTokens, TokensProp, DefaultTokensProp } from '../';

const internalTokens = (tokens?: TokensProp) =>
  !!tokens ? { ...defaultTokens, ...tokens } : defaultTokens;

/**
 * Check if tokens are given or use default ones
 * include internal tokens
 * (THESE ARE NOT GEMERATED BY GIVEN TOKENS! but can be overridden by given tokens)
 * @param props All component props
 */
export const withDefaultTokens = <T extends { tokens: TokensProp }>({
  tokens,
  ...props
}: Partial<T>): T =>
  ({
    ...props,
    tokens: internalTokens(tokens),
  } as T & { tokens: DefaultTokensProp });
