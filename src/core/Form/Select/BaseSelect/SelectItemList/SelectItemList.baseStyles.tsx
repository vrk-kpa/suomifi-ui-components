import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-select-item-list {
    ${font(theme)('bodyText')}
    box-sizing: content-box;
    background-color: ${theme.colors.whiteBase};
    margin: 0;
    max-height: inherit;

    &:focus {
      outline: none;
    }
  }

  & .fi-select-item-list_content_wrapper {
    display: block;
    list-style-type: none;
    border-width: 0 1px 1px 1px;
    border-style: solid;
    border-color: ${theme.colors.depthDark3};
    border-bottom-left-radius: ${theme.radius.basic};
    border-bottom-right-radius: ${theme.radius.basic};
    margin: 0;
    padding: 4px 0 0 0;

    width: 100%;
    max-height: 265px;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;
