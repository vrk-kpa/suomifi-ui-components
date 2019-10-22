import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { MenuProps } from './Menu';
import { element, focus } from '../theme/reset';
import { padding } from '../theme/utils';

export const baseStyles = withSuomifiTheme(
  ({ theme, tokens }: TokensAndTheme & Partial<MenuProps>) => css`
  & > [data-reach-menu-button].fi-menu_button {
    ${element({ theme })}
    ${theme.typography.bodyText}
    ${focus({ theme })}
    cursor: pointer;
    &.fi-menu-language_button {
      ${element({ theme })}
      ${theme.typography.actionElementInnerTextBold}
      ${padding(tokens)('s', 'xs', 's', 's')}
      background-color: ${theme.colors.whiteBase};
      border: 1px solid ${theme.colors.depthBase};
      border-radius: ${theme.radius.basic};
      text-transform: uppercase;
      & > .fi-menu-language_icon {
        height: 1.2em;
        width: 1.2em;
        transform: translateY(0.3em); 
        margin-left: ${theme.spacing.xs};

      }
    }
  }
`,
);

export const menuListStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
  &[data-reach-menu-list].fi-menu_list {
    ${element({ theme })}
    ${theme.typography.bodyText}
    margin-top: -2px;
    background-color: ${theme.colors.whiteBase};
    border: none;
    box-shadow: ${theme.shadows.menuShadow};
    &.fi-menu-language_list {
      ${theme.typography.actionElementInnerText}
      position: absolute;
      right: 0;
      top: 0;
      margin-top: 12px;
      padding: 10px 0;
      border: 1px solid ${theme.colors.depthBase};
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
        border-bottom-color: ${theme.colors.depthBase};
        border-width: 8px;
        margin-right: -8px;
      }
      &:after {
        border-bottom-color: ${theme.colors.whiteBase};
        border-width: 7px;
        margin-right: -7px;
      }
    }
  }

  & [data-reach-menu-item].fi-menu_item {
    ${element({ theme })}
    ${theme.typography.bodyText}
    &[data-selected] {
      ${theme.typography.bodyText}
      color: ${theme.colors.blackBase};
      background-color: ${theme.colors.highlightLight50};
    }
    &.fi-menu-language_item,
    &[data-selected].fi-menu-language_item {
      ${theme.typography.actionElementInnerText}
      padding: 6px 20px 6px 14px;
      border-left: 6px solid transparent;
      background-color: transparent;
      &.fi-menu-lang-item-selected {
        ${theme.typography.actionElementInnerTextBold};
      }
    }
    &[data-selected].fi-menu-language_item {
      border-left-color: ${theme.colors.highlightBase};
    }
  }
`,
);
