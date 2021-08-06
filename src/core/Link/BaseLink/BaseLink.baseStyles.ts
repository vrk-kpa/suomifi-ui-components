import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';
import { allStates } from '../../../utils/css';

export const baseStyles = (theme: SuomifiTheme) => css`
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
    ${theme.focus.boxShadowFocus}
  }

  &:hover,
  &:active {
    text-decoration: underline;
  }
  &:visited {
    color: ${theme.colors.accentTertiaryDark1};
  }
`;
