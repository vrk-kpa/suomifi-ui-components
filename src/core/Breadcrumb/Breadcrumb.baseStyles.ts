import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { nav, list, listItem, font } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${nav(theme)}
  ${font(theme)('bodyTextSmall')}
  height: 1.5em;

  & .fi-breadcrumb {
    &_list {
      ${list(theme)}
      margin: 0;
      padding: 0;
    }
    &_item {
      ${listItem(theme)}
      float: left;
    }
  }
`;
