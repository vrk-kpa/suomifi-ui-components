import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element } from '../theme/reset';
import { MarginProps, buildSpacingCSS } from '../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
  border-top: 4px solid ${theme.colors.successBase};
  width: 100%;
  box-shadow: ${theme.shadows.wideBoxShadow};
  border-radius: 4px;
  &.fi-toast {
    background-color: ${theme.colors.whiteBase};
    & .fi-toast-wrapper {
      padding: 20px 15px;
      display: flex;
      align-items: flex-start;
      & .fi-icon .fi-icon-base-fill {
        fill: ${theme.colors.successBase};
      }
      & .fi-toast-content-wrapper {
        vertical-align: middle;
        ${font(theme)('bodyTextSmall')}
        flex-grow: 1;
      }
      & .fi-toast-heading {
        ${font(theme)('bodySemiBold')}
        margin-top: -1px;
        padding-bottom: ${theme.spacing.xxs};
      }
      & .fi-toast_icon-wrapper {
        flex: 0;
        padding-right: ${theme.spacing.xs};
        & .fi-toast_icon {
          height: 24px;
          width: 24px;
        }
      }
      & .fi-toast_close-button {
        height: 40px;
        padding: 3px 6px 3px 6px;
        margin-right: -15px;
        margin-top: -20px;
        border: 1px solid transparent;
        color: ${theme.colors.highlightBase};

        & .fi-icon {
          margin: 0 ${theme.spacing.xxs};
          font-size: 16px;
          & .fi-icon-base-fill {
            fill: ${theme.colors.highlightBase};
          }
        }

        &:focus-visible {
          outline: 0;
          position: relative;

          &:after {
            ${theme.focuses.absoluteFocus}
            ${theme.focuses.highContrastFocus} /* For high contrast mode */
          }
        }
      }
    }
  }
`;
