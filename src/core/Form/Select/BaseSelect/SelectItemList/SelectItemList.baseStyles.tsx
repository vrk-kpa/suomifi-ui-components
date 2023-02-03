import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';
import { font } from '../../../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  list-style-type: none;
  box-sizing: content-box;
  max-height: 265px;
  background-color: ${theme.colors.whiteBase};
  border-width: 0 1px 1px 1px;
  border-style: solid;
  border-color: ${theme.colors.depthDark3};
  border-bottom-left-radius: ${theme.radiuses.basic};
  border-bottom-right-radius: ${theme.radiuses.basic};
  margin: 0;
  padding: 4px 0 0 0;

  &:focus {
    outline: none;
  }

  & .fi-select-item-list_content_wrapper {
    display: block;
    width: 100%;
    max-height: inherit;
    overflow-y: auto;
    overflow-x: hidden;
  }
`;
