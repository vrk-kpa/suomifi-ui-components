import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element, fixInternalMargins } from '../theme/reset';
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
  ${fixInternalMargins()}
  &.fi-pagination {
    & .fi-pagination_style-wrapper {
      display: inline-flex;
      align-items: flex-start;
    }

    & .fi-pagination_buttons-wrapper {
      display: inline-flex;

      & .fi-pagination_arrow-button {
        min-width: 40px;
        height: 40px;
        width: 40px;
        padding-left: 0;
        padding-right: 0;
        margin: 0;

        & > .fi-button_icon > .fi-icon {
          margin-right: auto;
          margin-left: auto;
        }
      }

      & .fi-pagination_page-numbers {
        display: inline-flex;
        align-items: center;
        color: ${theme.colors.depthDark1};
        ${theme.typography.bodySemiBoldSmall};
        margin-left: ${theme.spacing.m};
        margin-right: ${theme.spacing.m};
      }
    }

    & .fi-pagination_page-input-wrapper {
      width: 175px;
      margin-left: ${theme.spacing.m};
    }
  }

  /** Small screen variant styles */
  &.fi-pagination--small-screen {
    display: inline-block;

    & .fi-pagination_style-wrapper {
      display: inline-flex;
      flex-wrap: wrap;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      & .fi-pagination_page-input-wrapper {
        margin-top: ${theme.spacing.s};
        width: 0; /* Allows input to take 100% but still grow and shrink with buttons wrap */
        min-width: 100%; /* Allows input to take 100% but still grow and shrink with buttons wrap */
        margin-left: 0;
        margin-right: 0;
      }
    }
  }
`;
