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
      ${theme.focuses.highContrastFocus}
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
    &.fi-link--accent {
      text-decoration: none;
      & .fi-link--accent_icon {
        font-size: 16px;
        margin-left: -3px;
        margin-right: 2px;
        transform: translateY(0.1em);
      }
    }
    &.fi-link--small {
      font-size: 16px;
      &.fi-link--accent {
        text-decoration: none;
        & .fi-link--accent_icon {
          transform: translateY(0.15em);
        }
      }
    }
  }
`;
