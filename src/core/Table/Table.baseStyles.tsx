import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { MarginProps, buildSpacingCSS } from '../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  /* stylelint-disable no-descending-specificity */
  &.fi-table {
    ${font(theme)('bodyText')}
    overflow: auto;
    /* Prevents text in cells from wrapping */
    white-space: nowrap;

    background-image: 
      /* Shadows */
      linear-gradient(to right, white, white),
      linear-gradient(to right, white, white),
      /* Shadow covers */
        linear-gradient(to right, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0)),
      linear-gradient(to left, rgba(0, 0, 0, 0.25), rgba(255, 255, 255, 0));

    background-position:
      left center,
      right center,
      left center,
      right center;
    background-repeat: no-repeat;
    background-color: white;
    background-size:
      30px 100%,
      30px 100%,
      20px 100%,
      20px 100%;

    background-attachment: local, local, scroll, scroll;

    /* This exists as a bit of a hack to make the focus ring work in horizontal scrolling tables */
    border: 2px solid transparent;

    &:focus-visible {
      outline: none;
      border: 2px solid ${theme.colors.accentSecondary};
      border-radius: ${theme.radiuses.focus};
    }

    .fi-table_table {
      ${element(theme)}
      ${buildSpacingCSS(globalMargins)}
      ${buildSpacingCSS(propMargins, true)}
      font-size: 16px;
      width: 100%;

      .fi-table_caption {
        ${font(theme)('heading3')}
        margin-bottom: ${theme.spacing.l};
      }

      .fi-table_thead {
        border: 1px solid ${theme.colors.brandBase};
      }

      .fi-table_tbody {
        border: 1px solid ${theme.colors.depthLight1};
      }

      .fi-table_th,
      .fi-table_td {
        padding: 12px 20px;
        line-height: 2;

        &.fi-table_td--selection {
          min-width: 45px;
          padding: 0;
          position: relative;
        }

        .fi-link {
          font-size: 16px;
          line-height: 1;
        }
        .fi-checkbox {
          height: 19px;
          width: 0;
          margin: auto;
        }

        .fi-radio-button {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          .fi-radio-button_input + .fi-radio-button_icon_wrapper {
            top: 18px;
            left: 20px;
          }
          .fi-radio-button_label {
            position: absolute;
            height: 20px;
            width: 20px;
            top: 18px;
            left: 22px;
            padding: 0;
          }
        }
      }

      .fi-table_th {
        background-color: ${theme.colors.brandBase};
        color: ${theme.colors.whiteBase};

        &.checkbox-header {
          padding: 0;
        }

        .fi-table_sort-button {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          cursor: pointer;
          user-select: none;
          width: 100%;
          ${element(theme)}
          color: ${theme.colors.whiteBase};
          ${font(theme)('bodySemiBold')}
          font-size: 16px;

          .fi-icon {
            margin-left: ${theme.spacing.xs};
            height: 24px;
            width: 24px;
            fill: ${theme.colors.whiteBase};
          }

          &:focus {
            position: relative;
            ${theme.focuses.highContrastFocus} /* For high contrast mode */

            &::after {
              ${theme.focuses.absoluteFocus}
            }
          }
        }
      }

      .fi-table_td--align-right {
        text-align: right;

        &.fi-table_th {
          .fi-table_sort-button {
            justify-content: flex-end;
          }
        }
      }
      .fi-table_td--align-center {
        text-align: center;

        .fi-table_th {
          .fi-table_sort-button {
            justify-content: center;
          }
        }
      }

      .fi-table_tr {
        &:nth-child(even) {
          /* We are not using theme color because transparency is needed for sadow scroll effect */
          background-color: rgba(199, 202, 204, 0.2);
        }
        &:not(:last-child) {
          border-bottom: 1px solid ${theme.colors.depthLight1};
        }

        &.highlighted {
          background-color: ${theme.colors.depthSecondaryDark1};
        }
      }

      &.fi-table--condensed {
        .fi-table_th,
        .fi-table_td {
          padding: ${theme.spacing.xxs} ${theme.spacing.m};
        }
        .fi-table_skeleton-row {
          .fi-table_skeleton-cell {
            padding: 5px 20px;
            height: 43px;
          }

          .fi-table_selection-cell-skeleton {
            min-width: 45px;
            padding: 5px 12px 5px 20px;
          }
        }
      }
    }
    .fi-table_toolbar {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      margin-bottom: ${theme.spacing.m};

      .fi-table_row-count-text {
        ${font(theme)('heading5')}
        padding: 0 ${theme.spacing.m};
      }

      .fi-table_condense-buttons {
        align-self: flex-end;

        .fi-table_condense-button {
          margin-right: 5px;
        }

        .toggled {
          background: ${theme.colors.highlightBase};
          cursor: default;
          color: ${theme.colors.whiteBase};

          &:hover {
            background: ${theme.colors.highlightBase};
          }
        }
      }
    }

    .fi-table_caption--alternative {
      ${font(theme)('heading3')}
    }

    .fi-table_skeleton {
      background-color: ${theme.colors.depthLight2};
      border-radius: 4px;
      animation: shimmer 1.5s infinite linear;
    }

    .fi-table_skeleton-row {
      .fi-table_skeleton-cell {
        padding: 12px 20px;
        height: 57px;
        vertical-align: middle;
      }

      .fi-table_selection-cell-skeleton {
        min-width: 45px;
        padding-right: 12px;
      }
    }

    .fi-table_skeleton-content {
      height: 6px;
      width: 100%;
    }

    @keyframes shimmer {
      0% {
        background-color: ${theme.colors.depthLight2};
      }
      50% {
        background-color: ${theme.colors.depthLight3};
      }
      100% {
        background-color: ${theme.colors.depthLight2};
      }
    }
  }
`;
