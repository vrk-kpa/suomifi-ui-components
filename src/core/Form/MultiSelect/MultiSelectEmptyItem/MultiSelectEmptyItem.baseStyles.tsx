import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-multiselect-empty-item {
    ${font(theme)('actionElementInnerText')}
    padding: ${theme.spacing.insetL};

    &:focus {
      outline: none;
    }
  }
  & .fi-multiselect-empty-item_content_wrapper {
    display: inline-block;
    width: 100%;
  }
`;
