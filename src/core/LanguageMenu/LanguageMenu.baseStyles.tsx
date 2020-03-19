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
      padding: 5px ${theme.spacing.xs} 5px ${theme.spacing.s};
      line-height: 28px;
      background-color: ${theme.colors.whiteBase};
      border: 1px solid ${theme.colors.depthBase};
      border-radius: ${theme.radius.basic};
      text-transform: uppercase;
      & > .fi-language-menu-language_icon {
        height: 1.2em;
        width: 1.2em;
        transform: translateY(0.3em); 
        margin-left: ${theme.spacing.xs};
      }
    }
    &.fi-language-menu-language_button_open {
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
      padding: 6px 20px 6px 14px;
      border-left: 6px solid transparent;
      background-color: transparent;
      &.fi-language-menu-lang-item-selected {
        ${theme.typography.actionElementInnerTextBold};
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
