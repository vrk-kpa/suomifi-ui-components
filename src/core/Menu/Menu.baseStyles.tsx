import { css } from 'styled-components';
import { suomifiTheme, ThemeProp } from '../theme';
import { MenuProps } from './Menu';
import { element, fonts, focus } from '../theme/reset';
import { Omit } from '../../utils/typescript';
import { padding } from '../theme/utils';

export const baseStyles = ({
  theme = suomifiTheme,
}: Omit<MenuProps, 'name'>) => css`
  & > [data-reach-menu-button].fi-menu_button {
    ${element(theme)}
    ${fonts(theme).body}
    ${focus(theme)}
    cursor: pointer;
    &.fi-menu-language_button {
      ${element(theme)}
      ${fonts(theme).inputSemibold}
      ${padding(theme)('s', 'xs', 's', 's')}
      background-color: ${theme.colors.whiteBase};
      border: 1px solid ${theme.colors.depthBase};
      border-radius: ${theme.radius.basic};
      text-transform: uppercase;
      & > .fi-menu-language_icon {
        height: 16px;
        width: 16px;
        margin-left: ${theme.spacing.xxs};
      }
    }
  }
`;

export const menuListStyles = ({
  theme = suomifiTheme,
}: {
  theme: ThemeProp;
}) => css`
  &[data-reach-menu-list].fi-menu_list {
    ${element(theme)}
    ${fonts(theme).body}
    margin-top: -2px;
    background-color: ${theme.colors.whiteBase};
    border: none;
    box-shadow: ${theme.shadows.menuShadow};
    &.fi-menu-language_list {
      ${fonts(theme).input}
      position: absolute;
      right: 0;
      top: 0;
      margin-top: 12px;
      padding: 10px 0;
      border: 1px solid ${suomifiTheme.colors.depthBase};
      border-radius: ${theme.radius.basic};
      &:before,
      &:after {
        content: '';
        position: absolute;
        height: 0;
        width: 0;
        bottom: 100%;
        right: 20px;
        border: solid transparent;
        pointer-events: none;
      }
      &:before {
        border-bottom-color: ${suomifiTheme.colors.depthBase};
        border-width: 8px;
        margin-right: -8px;
      }
      &:after {
        border-bottom-color: ${suomifiTheme.colors.whiteBase};
        border-width: 7px;
        margin-right: -7px;
      }
    }
  }

  & [data-reach-menu-item].fi-menu_item {
    ${element(theme)}
    ${fonts(theme).body}
    &[data-selected] {
      ${fonts(theme).body}
      color: ${theme.colors.blackBase};
      background-color: ${theme.colors.highlightLight50};
    }
    &.fi-menu-language_item,
    &[data-selected].fi-menu-language_item {
      ${fonts(theme).input}
      padding: 6px 20px 6px 14px;
      border-left: 6px solid transparent;
      background-color: transparent;
      &.fi-menu-lang-item-selected {
        ${fonts(theme).inputSemibold};
      }
    }
    &[data-selected].fi-menu-language_item {
      border-left-color: ${theme.colors.highlightBase};
    }
  }
`;
