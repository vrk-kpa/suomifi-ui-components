import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  /* stylelint-disable no-descending-specificity */
  &.fi-language-menu-item {
    ${element(theme)}
    margin: ${theme.spacing.xxs} 0;
    border-left: 4px solid transparent;
    background-color: transparent;

    .fi-link--router {
      ${theme.typography.actionElementInnerText}
      word-break: break-word;
      color: ${theme.colors.blackBase};
      display: inline-block;
      width: 100%;
      padding: 0 ${theme.spacing.m} 0 ${theme.spacing.xxs};

      &:hover {
        text-decoration: none;
      }
    }

    &--hasKeyboardFocus {
      border-left-color: ${theme.colors.highlightBase};
    }

    &--selected {
      .fi-link--router {
        font-weight: bold;
      }
      border-left-color: ${theme.colors.highlightBase};
    }

    &:hover {
      border-left-color: ${theme.colors.highlightBase};
    }
  }
`;
