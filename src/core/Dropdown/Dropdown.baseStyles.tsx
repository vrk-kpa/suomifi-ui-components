import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { DropdownProps } from './Dropdown';
import { element, input, font } from '../theme/reset';

export const baseStyles = ({ theme = suomifiTheme }: DropdownProps) => css`
  & > [data-reach-menu-button] {
    ${input}
    ${font}
    position: relative;
    padding-right: 30px;
    &:after {
      content: '';
      position: absolute;
      top: 50%;
      right: 10px;
      margin-top: -3px;
      border-style: solid;
      border-color: ${theme.colors.caret} transparent transparent transparent;
      border-width: 6px 4px 0 4px;
    }
    &[aria-expanded='true']:after {
      border-color: transparent transparent ${theme.colors.caret} transparent;
      border-width: 0 4px 6px 4px;
    }
  }
`;

export const globalStyles = ({ theme = suomifiTheme }: DropdownProps) => css`
  [data-reach-menu] {
    ${element}
    ${font}
    margin-top: -2px;
    font-family: inherit;
  }

  [data-reach-menu-list] {
    ${element}
    ${font}
    padding: 0;
    font-size: 100%;
    border: 0;
    background-color: white;
    border-color: ${theme.colors.elementBorder};
    border-style: solid;
    border-width: 0 1px 1px 1px;
    border-radius: 0px 0px 2px 2px;
    overflow: hidden;
  }

  [data-reach-menu-item] {
    ${element}
    ${font}
    padding: 8px 12px;
    border: 0;
    &[data-selected] {
      ${font}
      color: ${theme.colors.text};
      background: ${theme.colors.elementHover} none;
      border: 0;
    }
  }
`;
