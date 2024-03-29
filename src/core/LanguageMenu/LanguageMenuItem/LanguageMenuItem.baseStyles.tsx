import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  /* stylelint-disable no-descending-specificity */
  &.fi-language-menu-item {
    ${element(theme)}
    margin: ${theme.spacing.xxs} 0;

    ${theme.typography.actionElementInnerText}
    word-break: break-word;
    color: ${theme.colors.blackBase};
    display: inline-block;
    width: 100%;
    padding: 0 ${theme.spacing.m} 0 ${theme.spacing.xxs};
    border-left: 4px solid transparent;

    &:active,
    &:focus,
    &:visited {
      outline: none;
      color: ${theme.colors.blackBase};
    }

    &--isHighlighted {
      border-left-color: ${theme.colors.highlightBase};
      position: relative;

      &:after {
        content: '';

        @media (forced-colors: active) {
          position: absolute;
          left: 1px;
          right: 1px;
          top: 1px;
          bottom: 1px;
          border: solid 3px Highlight;
        }
      }
    }

    &--selected {
      font-weight: bold;
      border-left-color: ${theme.colors.highlightBase};
    }
  }
`;
