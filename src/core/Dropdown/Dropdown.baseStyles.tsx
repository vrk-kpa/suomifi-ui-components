import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { DropdownProps } from './Dropdown';
import { element, inputButton, fonts } from '../theme/reset';
import { Omit } from '../../utils/typescript';
import { dataReachMenu } from '../Menu/Menu.baseStyles';

export const baseStyles = ({
  theme = suomifiTheme,
}: Omit<DropdownProps, 'name'>) => css`
  & > [data-reach-menu-button].fi-dropdown-button {
    ${inputButton}
    position: relative;
    padding-right: 30px;
    text-align: left;
    cursor: pointer;
    &:before {
      content: '';
      position: absolute;
      top: 50%;
      right: 10px;
      margin-top: -3px;
      border-style: solid;
      border-color: ${theme.colors.depthDark27} transparent transparent
        transparent;
      border-width: 6px 4px 0 4px;
    }
    &[aria-expanded='true']:before {
      border-color: transparent transparent ${theme.colors.depthDark27}
        transparent;
      border-width: 0 4px 6px 4px;
    }
  }
`;

export const globalStyles = ({ theme = suomifiTheme }: DropdownProps) => css`
  ${dataReachMenu(theme)}

  [data-reach-menu-list].fi-dropdown-list {
    ${element}
    ${fonts.input}
    padding: 0;
    font-size: 100%;
    border: 0;
    background-color: ${theme.colors.whiteBase};
    border-color: ${theme.colors.depthBase};
    border-style: solid;
    border-width: 0 1px 1px 1px;
    border-radius: 0px 0px ${theme.radius.basic} ${theme.radius.basic};
    overflow: hidden;
  }

  [data-reach-menu-item].fi-dropdown-item {
    ${element}
    ${fonts.input}
    padding: ${theme.spacing.s} ${theme.spacing.m};
    border: 0;
    &[data-selected] {
      ${fonts.input}
      color: ${theme.colors.blackBase};
      background-image: none;
      background-color: ${theme.colors.highlightLight50};
      border: 0;
    }
  }
`;
