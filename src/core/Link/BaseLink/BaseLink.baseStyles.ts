import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { allStates } from '../../../utils/css';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}

  &.fi-link {
    ${allStates(`color: ${theme.colors.highlightBase};`)}
    color: ${theme.colors.highlightBase};
    text-decoration: none;

    &:focus,
    &:focus-within {
      text-decoration: none;
    }

    &:focus {
      ${theme.focuses.boxShadowFocus}
    }

    &:hover,
    &:active {
      text-decoration: underline;
    }
    &:visited {
      color: ${theme.colors.accentTertiaryDark1};
    }

    &--initial-underline {
      text-decoration: underline;

      &:focus,
      &:focus-within {
        text-decoration: underline;
      }

      &:hover,
      &:active {
        text-decoration: none;
      }
    }
  }
`;
