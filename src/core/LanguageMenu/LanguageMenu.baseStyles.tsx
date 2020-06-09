import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../theme';
import { LanguageMenuProps } from './LanguageMenu';
import { element, focus } from '../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & Partial<LanguageMenuProps>) => css`
  & > [data-reach-menu-button].fi-language-menu_button {
    ${element({ theme })}
    ${theme.typography.bodyText}
    ${focus({ theme })}
    cursor: pointer;
    &.fi-language-menu-language_button {
      ${element({ theme })}
      ${theme.typography.actionElementInnerTextBold}
      padding: 9px ${theme.spacing.xs};
      line-height: 24px;
      background-color: ${theme.colors.whiteBase};
      border: 1px solid transparent;
      border-radius: ${theme.radius.basic};
      & > .fi-language-menu-language_icon {
        height: 1em;
        width: 1em;
        transform: translateY(0.2em); 
        margin-left: ${theme.spacing.xs};
        fill: ${theme.colors.highlightBase};
      }
      &:hover{
        border-color: ${theme.colors.depthLight1};
      }
    }
    &.fi-language-menu-language_button_open {
      border-color: ${theme.colors.depthLight1};
        & > .fi-language-menu-language_icon.fi-language-menu-language_icon {
          transform: translateY(0.2em) rotate(180deg);
        }
      }
  }
`,
);

export const languageMenuPopoverStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
  &[data-reach-menu-popover].fi-language-menu_popover {
    ${element({ theme })}
    ${theme.typography.bodyText}
    margin-top: -2px;
    background-color: ${theme.colors.whiteBase};
    border: none;
    box-shadow: ${theme.shadows.menuShadow};
    &.fi-language-menu-language_popover {
      ${theme.typography.actionElementInnerText}
      position: absolute;
      box-sizing: content-box;
      margin-top: 12px;
      border: 1px solid ${theme.colors.depthLight1};
      border-radius: ${theme.radius.basic};
      &:before,
      &:after {
        content: '';
        position: absolute;
        height: 0;
        width: 0;
        bottom: 100%;
        right: ${theme.spacing.l};
        border: solid transparent;
        pointer-events: none;
      }
      &:before {
        border-bottom-color: ${theme.colors.depthLight1};
        border-width: 8px;
        margin-right: -8px;
      }
      &:after {
        border-bottom-color: ${theme.colors.whiteBase};
        border-width: 6.5px;
        margin-right: -6.5px;
      }
    }
  }

  & [data-reach-menu-items] {
    border: 0;
    padding: 0;
  }

  & [data-reach-menu-item].fi-language-menu_item {
    ${element({ theme })}
    ${theme.typography.bodyText}
    &[data-selected] {
      ${theme.typography.bodyText}
      color: ${theme.colors.blackBase};
      background-color: ${theme.colors.highlightLight3};
    }
    &.fi-language-menu-language_item,
    &[data-selected].fi-language-menu-language_item {
      ${theme.typography.actionElementInnerText}
      margin: ${theme.spacing.xs} 0;
      padding: 0 ${theme.spacing.m} 0 ${theme.spacing.xxs};
      border-left: 4px solid transparent;
      background-color: transparent;
      &.fi-language-menu-lang-item-selected {
        ${theme.typography.actionElementInnerTextBold};
        border-left-color: ${theme.colors.highlightBase};
      }
    }
    &[data-selected].fi-language-menu-language_item {
      border-left-color: ${theme.colors.highlightBase};
    }
    &:focus {
      outline: 0;
    }
  }
`,
);
