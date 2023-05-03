import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('actionElementInnerText')}
  padding: ${theme.spacing.insetL};

  &:focus {
    outline: none;
  }
  & .fi-select-empty-item_content_wrapper {
    display: inline-block;
    width: 100%;
  }

  &.loading {
    & .fi-select-empty-item_content_wrapper {
      display: block; /* Fixes "extra padding" issue with loading spinner */
    }
  }
`;
