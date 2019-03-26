import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { DropdownProps } from './Dropdown';
import { element, input, fontInput } from '../theme/reset';
import { Omit } from '../../utils/typescript';
import { dataReachMenu } from '../Menu/Menu.baseStyles';

export const baseStyles = ({
  theme = suomifiTheme,
}: Omit<DropdownProps, 'name'>) => css`
  & > [data-reach-menu-button].fi-dropdown-button {
    ${input}
    ${fontInput}
    position: relative;
    padding-right: 30px;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      right: 10px;
      margin-top: -3px;
      border-style: solid;
      border-color: ${theme.colors.caret} transparent transparent transparent;
      border-width: 6px 4px 0 4px;
    }
    &[aria-expanded='true']:before {
      border-color: transparent transparent ${theme.colors.caret} transparent;
      border-width: 0 4px 6px 4px;
    }
  }
`;

export const globalStyles = ({ theme = suomifiTheme }: DropdownProps) => css`
  ${dataReachMenu(theme)}

  [data-reach-menu-list].fi-dropdown-list {
    ${element}
    ${fontInput}
    padding: 0;
    font-size: 100%;
    border: 0;
    background-color: ${theme.colors.white};
    border-color: ${theme.colors.elementBorder};
    border-style: solid;
    border-width: 0 1px 1px 1px;
    border-radius: 0px 0px 2px 2px;
    overflow: hidden;
  }

  [data-reach-menu-item].fi-dropdown-item {
    ${element}
    ${fontInput}
    padding: 8px 12px;
    border: 0;
    &[data-selected] {
      ${fontInput}
      color: ${theme.colors.text};
      background-image: none;
      background-color: ${theme.colors.elementHover};
      border: 0;
    }
  }
`;
