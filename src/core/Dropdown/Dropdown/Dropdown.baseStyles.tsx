import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element, inputButton } from '../../theme/reset';

export const baseStyles = css`
  &.fi-dropdown {
    display: inline-block;
  }

  & [data-reach-listbox-button].fi-dropdown_button {
    ${inputButton(suomifiTheme)}
    position: relative;
    display: inline-block;
    word-break: break-word;
    overflow-wrap: break-word;
    min-height: 22px;
    padding: 7px 38px 7px 7px;
    border-color: ${suomifiTheme.colors.depthDark3};
    text-align: left;
    line-height: 1.5;
    background-color: ${suomifiTheme.colors.whiteBase};
    box-shadow: ${suomifiTheme.shadows.actionElementBoxShadow};
    cursor: pointer;

    &:focus {
      outline: 0;
      position: relative;

      &:after {
        ${suomifiTheme.focus.absoluteFocus}
      }
    }

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      right: 16px;
      margin-top: -3px;
      border-style: solid;
      border-color: ${suomifiTheme.colors.depthDark3} transparent transparent
        transparent;
      border-width: 6px 4px 0 4px;
    }
    &[aria-expanded='true']:before {
      border-color: transparent transparent ${suomifiTheme.colors.depthDark3}
        transparent;
      border-width: 0 4px 6px 4px;
    }
    &.fi-dropdown--disabled {
      background-color: ${suomifiTheme.colors.depthLight3};
      color: ${suomifiTheme.colors.depthBase};
      opacity: 1;
      cursor: not-allowed;
      &:before {
        border-color: ${suomifiTheme.colors.depthBase} transparent transparent
          transparent;
      }
    }
  }
  &[data-reach-listbox-popover].fi-dropdown_popover {
    ${element(suomifiTheme)}
    ${suomifiTheme.typography.actionElementInnerText}
    margin-top: -1px;
    padding: 0;
    box-sizing: border-box;
    font-size: 100%;
    border: 0;
    background-color: ${suomifiTheme.colors.whiteBase};
    border-color: ${suomifiTheme.colors.depthDark3};
    border-style: solid;
    border-width: 0 1px 1px 1px;
    /* stylelint-disable */
    /* prettier-ignore */
    border-radius: 0px 0px ${suomifiTheme.radius.basic} ${suomifiTheme.radius
      .basic};
    overflow: hidden;
    &:focus-within {
      outline: 0;
      box-shadow: none;
    }
  }

  &.fi-dropdown--noSelectedStyles {
    & [data-reach-listbox-option][data-current-selected].fi-dropdown_item {
      background-color: ${suomifiTheme.colors.whiteBase};
      ${suomifiTheme.typography.actionElementInnerText};
    }
    & [data-reach-listbox-option][data-current-nav].fi-dropdown_item {
      color: ${suomifiTheme.colors.blackBase};
      background-image: none;
      background-color: ${suomifiTheme.colors.highlightLight3};
      border: 0;
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
