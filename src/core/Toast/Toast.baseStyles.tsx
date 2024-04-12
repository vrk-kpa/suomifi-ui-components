import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element } from '../theme/reset';
import { MarginProps, buildSpacingCSS } from '../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}
  ${buildSpacingCSS(margins)}
  border-top: 4px solid ${theme.colors.successBase};
  width: 100%;
  box-shadow: ${theme.shadows.wideBoxShadow};
  border-radius: 4px;
  overflow: hidden;
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
    }
  }
`;
