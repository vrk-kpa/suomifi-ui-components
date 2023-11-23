import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';
import { transparentize } from 'polished';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-error-summary {
    ${element(theme)}
    ${font(theme)('bodyTextSmall')}
    width: 100%;
    padding: 5px 0px 4px 0px;
    border: 1px solid;

    background-color: ${theme.colors.alertLight1};
    border-color: ${transparentize(0.8, theme.colors.alertBase)};
    border-left: 4px solid ${theme.colors.alertBase};

    & .fi-error-summary_style-wrapper {
      display: flex;
      align-items: flex-start;
    }

    & .fi-error-summary_icon {
      margin-left: ${theme.spacing.m};
      margin-top: ${theme.spacing.insetXl};
      min-height: 24px;
      min-width: 24px;
      height: 24px;
      width: 24px;

      & .fi-icon-base-fill {
        fill: ${theme.colors.blackBase};
      }
    }

    & .fi-error-summary_text-content-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 ${theme.spacing.s};
      margin: ${theme.spacing.s} 0;

      & .fi-error-summary_heading {
        ${font(theme)('bodySemiBold')}
        margin-bottom: ${theme.spacing.xxs};

        position: relative;
        display: inline-block;
        max-width: 100%;
        &:focus {
          outline: 0;
          &:after {
            ${theme.focuses.absoluteFocus}
          }
        }
      }

      & .fi-error-summary_content {
        ${font(theme)('bodyTextSmall')}
        vertical-align: middle;

        ul {
          margin: 0;
          padding: 0;
        }
      }
    }

    &.fi-error-summary--small-screen {
      & .fi-error-summary_icon {
        margin-left: ${theme.spacing.s};
      }
      & .fi-error-summary_text-content-wrapper {
        padding: 0 ${theme.spacing.xs} 0 ${theme.spacing.xs};
      }
    }
  }
`;
