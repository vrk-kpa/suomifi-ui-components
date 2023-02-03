import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  & > [data-reach-menu-button].fi-language-menu_button {
    ${element(theme)}
    ${theme.typography.bodyText}
      cursor: pointer;

    &.fi-language-menu-language_button {
      ${element(theme)}
      ${theme.typography.actionElementInnerTextBold}
      padding: 9px ${theme.spacing.xs};
      line-height: 24px;
      background-color: ${theme.colors.whiteBase};
      border: 1px solid transparent;
      border-radius: ${theme.radiuses.basic};
      word-break: break-word;
      & > .fi-language-menu-language_icon {
        height: 1em;
        width: 1em;
        transform: translateY(0.2em);
        margin-left: ${theme.spacing.xs};

        & .fi-icon-base-fill {
          fill: ${theme.colors.highlightBase};
        }
      }

      &:focus {
        outline: 0;
        position: relative;

        &::after {
          ${theme.focuses.absoluteFocus}
        }
      }

      &:hover {
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
`;

export const languageMenuPopoverStyles = (theme: SuomifiTheme) => css`
  &[data-reach-menu-popover] {
    ${element(theme)}
    ${theme.typography.bodyText}
    background-color: ${theme.colors.whiteBase};
    box-shadow: ${theme.shadows.menuShadow};
    ${theme.typography.actionElementInnerText}
    position: absolute;
    box-sizing: content-box;
    margin-top: 12px;
    border: 1px solid ${theme.colors.depthLight1};
    border-radius: ${theme.radiuses.basic};
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

  & [data-reach-menu-items] {
    border: 0;
    padding: 0;
    white-space: normal;
  }

  & [data-reach-menu-item].fi-language-menu_item {
    ${element(theme)}
    ${theme.typography.bodyText}
    word-break: break-word;
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
`;
