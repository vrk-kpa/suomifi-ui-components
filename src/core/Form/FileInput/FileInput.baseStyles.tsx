import { css } from 'styled-components';
import { MarginProps, SuomifiTheme } from '../../theme';
import { button, element, fixInternalMargins, font } from '../../theme/reset';
import { buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  &.fi-file-input {
    /* stylelint-disable no-descending-specificity */
    /* Nested :hover etc selectors do not work well with this rule. */

    ${element(theme)}
    width: 100%;
    max-width: 600px;
    ${buildSpacingCSS(globalMargins)}
    ${buildSpacingCSS(propMargins, true)}
    line-height: 0;
    ${fixInternalMargins()}

    &.fi-file-input--full-width {
      width: 100%;
      max-width: none;

      .fi-file-input_single-file-container {
        max-width: none;
      }
    }

    &.fi-file-input--error {
      .fi-file-input_input-outer-wrapper {
        .fi-file-input_drag-area {
          border: 2px dashed ${theme.colors.alertBase};
        }
      }
      .fi-file-input_single-file-container {
        border: 2px dashed ${theme.colors.alertBase};
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

    .fi-file-input_single-file-container {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      max-width: 600px;
      height: 100%;
      background: ${theme.colors.whiteBase};
      padding: ${theme.spacing.insetXxl};
    }

    .fi-file-input_multi-file-container {
      margin-top: ${theme.spacing.insetXl};

      .fi-file-input_file-item-outer-wrapper {
        padding: ${theme.spacing.xxs};

        :not(:last-child) {
          border-bottom: 1px solid ${theme.colors.depthLight2};
        }
      }
    }

    .fi-file-input_file-item {
      display: flex;
      justify-content: space-between;
      .fi-file-input_file-info {
        display: flex;
        align-items: center;
        gap: ${theme.spacing.insetL};
        flex-shrink: 1;

        .fi-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
        }

        .fi-file-input_file-name {
          overflow-wrap: break-word;
          flex-grow: 1;
          flex-shrink: 1;
          font-size: 16px;

          &:not(.is-link) {
            &:focus {
              position: relative;
              outline: 0;
              &:after {
                ${theme.focuses.absoluteFocus}
              }
            }
          }
        }

        .fi-file-input_file-size {
          color: ${theme.colors.blackLight1};
          min-width: 70px;
          margin-right: ${theme.spacing.insetL};
        }
      }

      .fi-file-input_remove-file-button {
        flex-shrink: 0;
      }
    }

    .fi-file-input_input-outer-wrapper {
      &.appears-focused {
        position: relative;
        ${theme.focuses.highContrastFocus}
        &:after {
          ${theme.focuses.absoluteFocus}
        }
      }
      .fi-file-input_drag-area {
        width: 100%;
        background: ${theme.colors.highlightLight4};
        border: 1px dashed ${theme.colors.highlightBase};
        padding: ${theme.spacing.insetXxl};
        position: relative;

        &.highlight {
          background: ${theme.colors.highlightLight2};
        }

        &.fi-file-input_drag-area--has-file {
          border: 1px solid ${theme.colors.depthLight2};
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

            &:not(.fi-file-input_label--hidden-under-file) {
              &:focus {
                + .fi-file-input_input-label {
                  position: relative;
                  ${theme.focuses
                    .highContrastFocus} /* For high contrast mode */

                &:after {
                    ${theme.focuses.absoluteFocus}
                  }
                }
              }
            }
          }

          .fi-file-input_input-label {
            /* Make the label appear as a secondary variant button */
            ${button(theme)}
            padding: 9px ${theme.spacing.insetXxl};
            min-height: 40px;
            color: ${theme.colors.highlightBase};
            background: none;
            background-color: ${theme.colors.whiteBase};
            border: 1px solid ${theme.colors.highlightBase};
            text-shadow: none;
            cursor: pointer;

            &:hover {
              background: ${theme.gradients.whiteBaseToDepthLight2};
            }

            &:active {
              background: none;
              background-color: ${theme.colors.depthLight2};
            }
          }
        }
      }
    }

    &.fi-file-input--small-screen {
      .fi-file-input_input-outer-wrapper {
        .fi-file-input_drag-area {
          .fi-file-input_input-wrapper {
            flex-direction: column-reverse;
            align-items: flex-start;
            height: auto;

            .fi-file-input_drag-text-container {
              margin-left: 0;
              margin-bottom: ${theme.spacing.insetXl};
            }

            .fi-file-input_input-label {
              width: 100%;
              text-align: center;
            }
          }
        }
      }

      .fi-file-input_single-file-container {
        .fi-file-input_file-item {
          height: 100%;
          flex-direction: column;
          .fi-file-input_file-info {
            margin-bottom: ${theme.spacing.insetXl};
            .fi-file-input_file-size {
              justify-content: space-between;
              flex-shrink: revert;
              flex-grow: revert;
              margin-right: 0;
            }
          }
        }
      }
    }

    .fi-file-input_error-icon {
      color: ${theme.colors.alertBase};
    }

    .fi-file-input_loading-icon {
      animation: rotation 1.5s infinite linear;
    }

    @keyframes rotation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(359deg);
      }
    }
    @media (prefers-reduced-motion) {
      &.fi-loadingSpinner.fi-loadingSpinner--loading {
        .fi-loadingSpinner_icon {
          animation: rotation 10s infinite linear;
        }
      }
    }

    .fi-file-input_file-item-error-text {
      ${font(theme)('bodySemiBoldSmall')};
      font-size: 14px;
      color: ${theme.colors.alertBase};
    }
  }
`;
