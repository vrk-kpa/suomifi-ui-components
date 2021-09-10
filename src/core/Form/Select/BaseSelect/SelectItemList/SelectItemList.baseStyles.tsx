import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-select-item-list {
    ${font(theme)('bodyText')}
    list-style-type: none;

    background-color: ${theme.colors.whiteBase};
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: ${theme.colors.depthDark3};
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;

    overflow-y: auto;
    overflow-x: hidden;
    max-height: 265px;

    margin: 0;
    padding: 0;

    &:focus {
      outline: none;
    }
  }

  & .fi-select-item-list_content_wrapper {
    display: inline-block;
    width: 100%;
  }
`;
