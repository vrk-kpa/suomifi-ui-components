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
    ${element(theme)}
    ${buildSpacingCSS(globalMargins)}
    ${buildSpacingCSS(propMargins, true)}
    font-size: 16px;
    width: 100%;

    .fi-table_caption {
      ${font(theme)('heading3')}
      margin-bottom: ${theme.spacing.s};
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
    }

    .fi-table_tr:nth-child(even) {
      background-color: ${theme.colors.depthLight3};
    }

    &.fi-table--condensed {
      .fi-table_th,
      .fi-table_td {
        padding: ${theme.spacing.s} ${theme.spacing.m};
      }
    }
  }
`;
