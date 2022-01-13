import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}
  border-top: 4px solid ${theme.colors.successBase};
  width: 100%;
  box-shadow: ${theme.shadows.wideBoxShadow};
  border-radius: 4px;

  & .fi-toast-wrapper {
    margin: 20px 0;
    padding: 0 15px 0 15px;

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
      margin-bottom: ${theme.spacing.xxs};
    }
    & .fi-toast_icon-wrapper {
      flex: 0;
      margin-right: ${theme.spacing.xs};
      & .fi-toast_icon {
        height: 24px;
        width: 24px;
      }
    }
  }
`;
