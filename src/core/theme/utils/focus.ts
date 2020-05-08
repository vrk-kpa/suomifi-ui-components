import { css } from 'styled-components';
import { themeOrTokens, TokensOrThemeProps } from '../utils';

export interface FocusConfig {
  variant?: 'outline' | 'afterPseudo' | 'boxShadow';
  outline?: string;
  noPseudo?: boolean;
}

export const focus = ({
  outline,
  noPseudo,
  variant = 'afterPseudo',
  ...tokensOrTheme
}: TokensOrThemeProps & FocusConfig) => {
  const style =
    variant === 'outline' && !!outline
      ? outline
      : variant === 'afterPseudo'
      ? themeOrTokens(tokensOrTheme).outlines.afterPseudo
      : themeOrTokens(tokensOrTheme).outlines.boxShadow;
  return !!noPseudo
    ? style
    : css`
        &:focus {
          ${style}
        }
      `;
};
