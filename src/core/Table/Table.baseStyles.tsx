import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';
import { MarginProps, buildSpacingCSS } from '../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  &.fi-table {
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
        padding: ${theme.spacing.m};

        .fi-link {
          font-size: 16px;
        }
      }

      .fi-table_td--align-right {
        text-align: right;
      }
      .fi-table_td--align-center {
        text-align: center;
      }

      .fi-table_th {
        background-color: ${theme.colors.brandBase};
        color: ${theme.colors.whiteBase};

        &.sortable {
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          user-select: none;
        }

        .fi-table_sort-icons {
          display: flex;
          flex-direction: column;
          margin-left: 5px;

          .fi-icon {
            width: 12px;
            height: 10px;

            &.highlighted {
              color: ${theme.colors.accentBase};
            }
          }
        }
      }

      .fi-table_tr {
        &:nth-child(even) {
          background-color: ${theme.colors.depthLight3};
        }
        &:not(:last-child) {
          border-bottom: 1px solid ${theme.colors.depthLight1};
        }
      }

      &.fi-table--condensed {
        .fi-table_th,
        .fi-table_td {
          padding: ${theme.spacing.s} ${theme.spacing.m};
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
  }
`;
