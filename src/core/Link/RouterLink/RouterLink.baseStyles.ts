import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { allStates } from '../../../utils/css';

export const RouterLinkStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}

  &.fi-link--router {
    ${allStates(`color: ${theme.colors.highlightBase};`)}
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
  }
`;
