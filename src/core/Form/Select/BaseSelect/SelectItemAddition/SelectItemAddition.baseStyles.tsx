import { font } from '../../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../../theme';

export const selectItemAdditionStyles = (theme: SuomifiTheme) => css`
  & .fi-select-item-addition_hint-text {
    padding: 8px 32px 8px 10px;
    ${font(theme)('bodyTextSmall')}
    background: ${theme.colors.depthLight3};
    color: ${theme.colors.depthDark1};
  }

  & .fi-select-item-addition_item {
    padding: 8px 32px 8px 10px;
    cursor: pointer;
    ${font(theme)('actionElementInnerText')}
    font-weight: bold;
    &:hover {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};
    }
    &--hasKeyboardFocus {
      background-color: ${theme.colors.highlightBase};
      color: ${theme.colors.whiteBase};
    }
  }
`;
