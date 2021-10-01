import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-chip-list {
    ${font(theme)('bodyText')}
    padding-top: 5px;
  }

  & .fi-chip-list_content_wrapper > * {
    margin-right: 10px;
    margin-top: 10px;
    padding-right: -10px;
  }

  & .fi-chip-list_content_wrapper {
    display: inline-flex;
    flex-wrap: wrap;
    width: 100%;
  }
`;
