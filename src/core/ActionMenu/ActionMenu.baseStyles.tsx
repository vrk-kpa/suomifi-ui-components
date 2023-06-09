import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-action-menu--full-width {
    width: 100%;
  }

  & .fi-action-menu_button {
    &--icon-only {
      & .fi-button_icon--right {
        & .fi-icon {
          margin-left: 0; /* Fixes issue on Button margin when there is no text */
        }
      }

      min-width: 40px;
      padding: ${theme.spacing.xs};
    }
  }
`;
