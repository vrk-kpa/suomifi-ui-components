import { css } from '@emotion/core';
import { suomifiTheme, Theme } from '../theme';
import { MenuProps } from './Menu';
import { element, font, fontInput, fontSemibold } from '../theme/reset';
import { Omit } from '../../utils/typescript';

export const baseStyles = ({
  theme = suomifiTheme,
}: Omit<MenuProps, 'name'>) => css`
  & > [data-reach-menu-button].fi-menu-button {
    ${element}
    ${font}
    &.fi-menu-language-button {
      ${element}
      ${fontSemibold}
      padding: 8px 6px 8px 10px;
      border: 1px solid ${suomifiTheme.colors.elementBorder};
      border-radius: 2px;
      text-transform: uppercase;
    }
    &:focus {
      ${theme.outlines.basic}
    }
  }
`;

export const iconBaseStyles = css`
  height: 16px;
  width: 16px;
  margin-left: 2px;
`;

export const dataReachMenu = (theme: Theme = suomifiTheme) => css`
  [data-reach-menu] {
    ${element}
    ${font}
    z-index: ${theme.zindexes.menu};
    margin-top: -2px;
    font-family: inherit;
  }
`;

export const globalStyles = ({ theme = suomifiTheme }: MenuProps) => css`
  ${dataReachMenu(theme)}

  [data-reach-menu-list].fi-menu-list {
    ${element}
    ${font}
    background-color: ${theme.colors.white};
    border: none;
    box-shadow: ${theme.shadows.menuShadow};
    &.fi-menu-language-list {
      ${fontInput}
      position: absolute;
      right: 0;
      top: 0;
      margin-top: 12px;
      padding: 10px 0;
      border: 1px solid ${suomifiTheme.colors.elementBorder};
      border-radius: 2px;
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
        border-bottom-color: ${suomifiTheme.colors.elementBorder};
        border-width: 8px;
        margin-right: -8px;
      }
      &:after {
        border-bottom-color: ${suomifiTheme.colors.white};
        border-width: 7px;
        margin-right: -7px;
      }
    }
  }

  [data-reach-menu-item].fi-menu-item {
    ${element}
    ${font}
    &[data-selected] {
      ${font}
      color: ${theme.colors.text};
      background-color: ${theme.colors.elementHover};
    }
    &.fi-menu-language-item,
    &[data-selected].fi-menu-language-item {
      ${fontInput}
      padding: 6px 20px 6px 14px;
      border-left: 6px solid transparent;
      background-color: transparent;
      &.fi-menu-lang-item-selected {
        font-weight: ${theme.typography.fontWeightSemibold};
      }
    }
    &[data-selected].fi-menu-language-item {
      border-left-color: ${theme.colors.secondaryColor};
    }
  }
`;
