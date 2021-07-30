import { css } from 'styled-components';
import { suomifiTheme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = css`
  &.fi-multiselect-empty-item {
    ${font(suomifiTheme)('actionElementInnerText')}
    padding: ${suomifiTheme.spacing.insetL};

    &:focus {
      outline: none;
    }
  }
  & .fi-multiselect-empty-item_content_wrapper {
    display: inline-block;
    width: 100%;
  }
`;
