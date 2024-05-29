import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { element, font } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}

  &.fi-details {
    & .fi-details_summary {
      color: ${theme.colors.highlightBase};
      ${font(theme)('bodyTextSmall')}

      &:focus {
        position: relative;
        ${theme.focuses.highContrastFocus} /* For high contrast mode */

    &::after {
          ${theme.focuses.absoluteFocus}
        }
      }
    }
    & .fi-details_content {
      border-left: 2px solid ${theme.colors.highlightBase};
      padding-left: 15px;
      padding-top: 10px;
      padding-bottom: 5px;
      margin-left: 4px;
    }
  }
`;
