import { css } from 'styled-components';
import { themeOrTokens, TokensOrThemeProps } from '../utils';

import { radius } from '../radius';
import { colors } from '../colors';
import { zindexes } from '../zindexes';

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

export const absoluteFocus = css`
  content: '';
  position: absolute;
  pointer-events: none;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  border-radius: ${radius.focus};
  background-color: transparent;
  border: 0px solid ${colors.whiteBase};
  box-sizing: border-box;
  box-shadow: 0 0 0 2px ${colors.accentSecondary};
  z-index: ${zindexes.focus};
`;

export const boxShadowFocus = css`
  outline: 0;
  border-radius: ${radius.focus};
  box-shadow: 0 0 0 2px ${colors.accentSecondary};
`;
