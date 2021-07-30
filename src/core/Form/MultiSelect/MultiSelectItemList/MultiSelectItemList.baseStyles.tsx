import { css } from 'styled-components';
import { suomifiTheme } from '../../../theme';
import { font } from '../../../theme/reset';

export const baseStyles = css`
  &.fi-multiselect-item-list {
    ${font(suomifiTheme)('bodyText')}
    list-style-type: none;

    background-color: ${suomifiTheme.colors.whiteBase};
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: ${suomifiTheme.colors.depthDark3};
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;

    overflow-y: auto;
    overflow-x: hidden;
    max-height: 260px;

    margin: 0;
    padding: 0;

    &:focus {
      outline: none;
    }
  }

  & .fi-multiselect-item-list_content_wrapper {
    display: inline-block;
    width: 100%;
  }
`;
