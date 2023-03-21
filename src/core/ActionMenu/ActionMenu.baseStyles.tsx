import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { containerIEFocus, font } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  width: 150px;

  &.fi-action-menu--full-width {
    width: 100%;
  }

  & .fi-action-menu_button {
    ${containerIEFocus(theme)}

    &--menu--closed {
      &:focus-within {
        position: relative;

        &::after {
          ${theme.focuses.absoluteFocus}
        }
      }
    }

    &--icon-only {
      & .fi-button_icon {
        margin: 0;
      }
    }

    height: 100%;
    min-width: 40px;
    text-align: center;
    padding: ${theme.spacing.xs};
    border: 1px solid ${theme.colors.highlightBase};
    border-radius: ${theme.radiuses.basic};
    &:focus {
      outline: 3px solid transparent;
    }
  }
`;
