import { css, FlattenSimpleInterpolation } from 'styled-components';
import { SuomifiDesignTokens } from '.';

export const absoluteFocus: (
  tokens: SuomifiDesignTokens,
) => FlattenSimpleInterpolation = (
  tokens: SuomifiDesignTokens,
): FlattenSimpleInterpolation => css`
  content: '';
  position: absolute;
  pointer-events: none;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  border-radius: ${tokens.radius.focus};
  background-color: transparent;
  border: 0px solid ${tokens.colors.whiteBase};
  box-sizing: border-box;
  box-shadow: 0 0 0 2px ${tokens.colors.accentSecondary};
  z-index: ${tokens.zindexes.focus};
`;

export const boxShadowFocus: (
  tokens: SuomifiDesignTokens,
) => FlattenSimpleInterpolation = (tokens: SuomifiDesignTokens) => css`
  outline: 0;
  border-radius: ${tokens.radius.focus};
  box-shadow: 0 0 0 2px ${tokens.colors.accentSecondary};
`;

export const noMouseFocus = css`
  :not(:focus-visible) {
    outline: 0;
    &:after {
      content: none;
    }
  }
`;
