import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = css`
  &.fi-chip-list {
    ${font(theme)('bodyText')}
    padding-top: 15px;
  }

  & .fi-chip-list_content_wrapper {
    display: inline-flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 10px;
  }
`;
