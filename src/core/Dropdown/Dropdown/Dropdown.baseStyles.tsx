import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { element, inputButton } from '../../theme/reset';
import { absoluteFocus } from '../../theme/utils';

export const baseStyles = css`
  & [data-reach-listbox-button].fi-dropdown_button {
    ${inputButton(theme)}
    position: relative;
    display: inline-block;
    word-break: break-word;
    overflow-wrap: break-word;
    min-height: 22px;
    padding: 7px 38px 7px 7px;
    border-color: ${theme.colors.depthDark3};
    text-align: left;
    line-height: 1.5;
    background-color: ${theme.colors.whiteBase};
    box-shadow: ${theme.shadows.actionElementBoxShadow};
    cursor: pointer;

    &:focus {
      outline: 0;
      position: relative;

      &:after {
        ${absoluteFocus}
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      right: 16px;
      margin-top: -3px;
      border-style: solid;
      border-color: ${theme.colors.depthDark3} transparent transparent
        transparent;
      border-width: 6px 4px 0 4px;
    }
    &[aria-expanded='true']:before {
      border-color: transparent transparent ${theme.colors.depthDark3}
        transparent;
      border-width: 0 4px 6px 4px;
    }
    &.fi-dropdown--disabled {
      background-color: ${theme.colors.depthLight3};
      color: ${theme.colors.depthBase};
      opacity: 1;
      cursor: not-allowed;
      &:before {
        border-color: ${theme.colors.depthBase} transparent transparent
          transparent;
      }
    }
  }
  &[data-reach-listbox-popover].fi-dropdown_popover {
    ${element(theme)}
    ${theme.typography.actionElementInnerText}
    margin-top: -1px;
    padding: 0;
    box-sizing: border-box;
    font-size: 100%;
    border: 0;
    background-color: ${theme.colors.whiteBase};
    border-color: ${theme.colors.depthDark3};
    border-style: solid;
    border-width: 0 1px 1px 1px;
    border-radius: 0px 0px ${theme.radius.basic} ${theme.radius.basic};
    overflow: hidden;
    &:focus-within {
      outline: 0;
      box-shadow: none;
    }
  }

  &.fi-dropdown--noSelectedStyles {
    & [data-reach-listbox-option][data-current].fi-dropdown_item {
      background-color: ${theme.colors.whiteBase};
      ${theme.typography.actionElementInnerText};
    }
  }

  & [data-reach-listbox-list] {
    border: 0;
    padding: 0;
    margin: 0;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
  }
`;
