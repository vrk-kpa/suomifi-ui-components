import { css } from 'styled-components';
import { SuomifiTheme } from '../../core/theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${theme.typography.bodyText}
  display: block;
  max-width: 100%;
  margin: 0;
  font-size: 13px;

  .prop-default {
    color: rgb(51, 51, 51);
    font-family: Consolas, 'Liberation Mono', Menlo, monospace;
  }

  .prop-name {
    color: rgb(102, 153, 0);
  }

  table {
    text-align: left;
    th {
      font-family: 'Source Sans Pro', sans-serif;
      font-weight: bold;
    }
    td {
      padding-right: 16px;
      font-family: Consolas, 'Liberation Mono', Menlo, monospace;
      padding-top: 8px;
      padding-bottom: 8px;
      vertical-align: top;
    }
  }
`;
