import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element } from '../../theme/reset';

export const baseStyles = css`
  & > [data-reach-menu-button].fi-language-menu_button {
    ${element(suomifiTheme)}
    ${suomifiTheme.typography.bodyText}
      cursor: pointer;

    &.fi-language-menu-language_button {
      ${element(suomifiTheme)}
      ${suomifiTheme.typography.actionElementInnerTextBold}
      padding: 9px ${suomifiTheme.spacing.xs};
      line-height: 24px;
      background-color: ${suomifiTheme.colors.whiteBase};
      border: 1px solid transparent;
      border-radius: ${suomifiTheme.radius.basic};
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
          ${suomifiTheme.focus.absoluteFocus}
        }
      }

      &:hover {
        border-color: ${suomifiTheme.colors.depthLight1};
      }
    }
    &.fi-language-menu-language_button_open {
      border-color: ${suomifiTheme.colors.depthLight1};
      & > .fi-language-menu-language_icon.fi-language-menu-language_icon {
        transform: translateY(0.2em) rotate(180deg);
      }
    }
  }
`;

export const languageMenuPopoverStyles = css`
  &[data-reach-menu-popover] {
    ${element(suomifiTheme)}
    ${suomifiTheme.typography.bodyText}
    background-color: ${suomifiTheme.colors.whiteBase};
    box-shadow: ${suomifiTheme.shadows.menuShadow};
    ${suomifiTheme.typography.actionElementInnerText}
    position: absolute;
    box-sizing: content-box;
    margin-top: 12px;
    border: 1px solid ${suomifiTheme.colors.depthLight1};
    border-radius: ${suomifiTheme.radius.basic};
    &:before,
    &:after {
      content: '';
      position: absolute;
      height: 0;
      width: 0;
      bottom: 100%;
      right: ${suomifiTheme.spacing.l};
      border: solid transparent;
      pointer-events: none;
    }
    &:before {
      border-bottom-color: ${suomifiTheme.colors.depthLight1};
      border-width: 8px;
      margin-right: -8px;
    }
    &:after {
      border-bottom-color: ${suomifiTheme.colors.whiteBase};
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
    ${element(suomifiTheme)}
    ${suomifiTheme.typography.bodyText}
    word-break: break-word;
    &[data-selected] {
      ${suomifiTheme.typography.bodyText}
      color: ${suomifiTheme.colors.blackBase};
      background-color: ${suomifiTheme.colors.highlightLight3};
    }
    &.fi-language-menu-language_item,
    &[data-selected].fi-language-menu-language_item {
      ${suomifiTheme.typography.actionElementInnerText}
      margin: ${suomifiTheme.spacing.xs} 0;
      padding: 0 ${suomifiTheme.spacing.m} 0 ${suomifiTheme.spacing.xxs};
      border-left: 4px solid transparent;
      background-color: transparent;
      &.fi-language-menu-lang-item-selected {
        ${suomifiTheme.typography.actionElementInnerTextBold};
        border-left-color: ${suomifiTheme.colors.highlightBase};
      }
    }
    &[data-selected].fi-language-menu-language_item {
      border-left-color: ${suomifiTheme.colors.highlightBase};
    }
    &:focus {
      outline: 0;
    }
  }
`;
