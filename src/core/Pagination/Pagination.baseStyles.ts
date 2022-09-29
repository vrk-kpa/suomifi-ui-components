import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}
  &.fi-loadingSpinner {
    display: block;
    text-align: center;
    & .fi-loadingSpinner_icon {
      display: inline-block;
      width: 40px;
      height: 40px;
    }
    & .fi-loadingSpinner_text {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      margin-top: 6px;
    }
  }
`;
