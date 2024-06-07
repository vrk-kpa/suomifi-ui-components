import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  padding-top: 5px;

  & .fi-chip-list_content_wrapper > * {
    margin: 10px 10px 0 0;
    padding-right: -10px;
  }

  & .fi-chip-list_content_wrapper {
    display: inline-flex;
    flex-wrap: wrap;
    width: 100%;
  }
`;
