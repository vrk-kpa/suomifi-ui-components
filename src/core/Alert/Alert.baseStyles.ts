import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}

  &.fi-alert {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.alertLight1};
    min-height: 55px;
    width: 900px;
  }

  & .fi-alert-label {
    padding-left: 40px;
    margin-top: ${theme.spacing.insetXxl};
    margin-bottom: ${theme.spacing.insetXs};
    font-weight: 600;
  }

  & .fi-alert-icon {
    margin-left: 10px;
    vertical-align: bottom;
    height: 24px;
    width: 24px;
  }

  & .fi-alert-content {
    padding-left: 40px;
    text-align: baseline;
  }

  & .fi-alert-content-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: calc(100% * (2 / 3));
    padding: 5px;
  }

  & .fi-alert-text-content-wrapper {
    display: flex;
    flex-direction: column;
  }

  & .fi-alert-close-button {
    margin-left: auto;
    & .fi-icon {
      vertical-align: bottom;
      width: 14px;
      height: 14px;
      margin-left: 7px;
    }
  }

  &.fi-alert--inline {
    border-left: 5px solid ${theme.colors.alertBase};
    min-height: 64px;
  }
`;
