import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { element, font } from '../../theme/reset';
import { allStates } from '../../../utils/css';
import { boxShadowFocus } from '../../theme/utils/focus';

export const baseStyles = css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${allStates(`color: ${theme.colors.highlightBase};`)};
  color: ${theme.colors.highlightBase};
  text-decoration: none;

  &:focus,
  &:focus-within {
    text-decoration: none;
  }

  &:focus {
    ${boxShadowFocus}
  }

  &:hover,
  &:active {
    text-decoration: underline;
  }
  &:visited {
    color: ${theme.colors.accentTertiaryDark1};
  }
`;
