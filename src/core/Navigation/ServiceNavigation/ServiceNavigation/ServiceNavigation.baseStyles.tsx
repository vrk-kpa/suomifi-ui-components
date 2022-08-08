import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  &.fi-service-navigation {
    & .fi-service-navigation_list {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
  }
`;
