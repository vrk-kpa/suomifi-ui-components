import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';
import { allStates } from '../../../utils/css';

export const baseStyles = css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('bodyText')}
  ${allStates(`color: ${suomifiTheme.colors.highlightBase};`)};
  color: ${suomifiTheme.colors.highlightBase};
  text-decoration: none;

  &:focus,
  &:focus-within {
    text-decoration: none;
  }

  &:focus {
    ${suomifiTheme.focus.boxShadowFocus}
  }

  &:hover,
  &:active {
    text-decoration: underline;
  }
  &:visited {
    color: ${suomifiTheme.colors.accentTertiaryDark1};
  }
`;
