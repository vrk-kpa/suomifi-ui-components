import { css } from 'styled-components';
import { themeOrTokens, TokensOrThemeProps } from '../utils';

export const focus = ({
  outline,
  noPseudo,
  ...tokensOrTheme
}: TokensOrThemeProps & {
  outline?: string;
  noPseudo?: boolean;
}) => {
  const style = !!outline
    ? outline
    : themeOrTokens(tokensOrTheme).outlines.basic;
  return !!noPseudo
    ? style
    : css`
        &:focus {
          ${style}
        }
      `;
};
