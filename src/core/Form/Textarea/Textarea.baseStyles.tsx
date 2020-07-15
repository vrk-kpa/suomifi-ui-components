import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { disabledCursor } from '../../../components/utils/css';
import { element, font } from '../../theme/reset';
import { focus } from '../../theme/utils/focus';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}

    &.fi-textarea {
      display: flex;
      flex-direction: column;

      &--disabled {
        color: blue;

        & .fi-textarea_textarea {
          ${disabledCursor}
        }
      }

      & .fi-textarea_label {
        ${font({ theme })('actionElementInnerTextBold')};
        color: ${theme.colors.blackBase};
      }

      & .fi-textarea_hintText {
        display: block;
        color: ${theme.colors.depthDark1};
        ${theme.typography.bodyTextSmall};
        margin-bottom: ${theme.spacing.insetL};
      }

      & .fi-textarea_textarea {
        border-radius: 2px;
        border: 1px solid ${theme.colors.depthLight1};
        box-shadow: ${theme.shadows.actionElementBoxShadow};
        resize: vertical;
        padding: 8px 14px 13px 10px;

        &:focus {
          ${focus({ theme, noPseudo: true, variant: 'boxShadow' })}
        }
      }
    }
  `,
);
