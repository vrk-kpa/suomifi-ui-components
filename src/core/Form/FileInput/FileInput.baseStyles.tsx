import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { button, element, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-file-input {
    ${element(theme)}
    width: 600px;
    line-height: 0;

    /* stylelint-disable no-descending-specificity */
    /* Nested :hover etc selectors do not work well with this rule. */

    &.fi-file-input--full-width {
      width: 100%;
    }

    &.fi-file-input--error {
      .fi-file-input_input-outer-wrapper {
        .fi-file-input_drag-area {
          border: 1px dashed ${theme.colors.alertBase};
        }
      }
    }

    .fi-file-input_label--visible {
      margin-bottom: ${theme.spacing.xs};
    }

    .fi-hint-text {
      margin-bottom: ${theme.spacing.xs};
    }

    .fi-file-input_statusText--has-content {
      margin-top: ${theme.spacing.xxs};
    }

    .fi-file-input_input-outer-wrapper {
      .fi-file-input_drag-area {
        width: 100%;
        background: ${theme.colors.highlightLight4};
        border: 1px dashed ${theme.colors.highlightBase};
        padding: ${theme.spacing.insetXxl};
        position: relative;

        &.highlight {
          background: ${theme.colors.highlightLight2};
        }

        .fi-file-input_input-wrapper {
          position: relative;
          width: 100%;
          height: 40px;
          display: flex;
          align-items: center;

          .fi-file-input_drag-text-container {
            ${font(theme)('bodyTextSmall')}
            margin-left: ${theme.spacing.insetXxl};
          }

          .fi-file-input_input-element {
            width: 0.1px;
            height: 0.1px;
            opacity: 0;
            z-index: -9999;

            &:focus {
              + label {
                position: relative;
                ${theme.focuses.highContrastFocus} /* For high contrast mode */

                &:after {
                  ${theme.focuses.absoluteFocus}
                }
              }
            }
          }

          label {
            /* Make the label appear as a secondary variant button */
            ${button(theme)}
            padding: 9px ${theme.spacing.insetXxl};
            min-height: 40px;
            color: ${theme.colors.whiteBase};
            background: ${theme.gradients.highlightBaseToHighlightDark1};
            border-radius: ${theme.radiuses.basic};
            text-align: center;
            text-shadow: ${theme.shadows.invertTextShadow};
            cursor: pointer;
            border: 1px solid transparent; /* For high contrast mode */

            &:hover {
              background: ${theme.gradients.whiteBaseToDepthLight2};
            }

            &:active {
              background: none;
              background-color: ${theme.colors.depthLight2};
            }
          }
        }

        .fi-file-input_single-file-container {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          width: 100%;
          height: 100%;
          background: ${theme.colors.whiteBase};
        }
      }
    }
  }
`;
