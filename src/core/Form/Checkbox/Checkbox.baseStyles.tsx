import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';
import { MarginProps, getCssMargins } from '../../theme/utils/spacing';

/* stylelint-disable no-descending-specificity */
const checkedStyles = (theme: SuomifiTheme) => css`
  &.fi-checkbox--checked {
    & .fi-checkbox_label {
      &::before {
        border-color: ${theme.colors.highlightBase};
        background-color: ${theme.colors.highlightBase};
      }
      & > .fi-checkbox_icon .fi-icon-base-fill {
        fill: ${theme.colors.whiteBase};
      }
    }
    &.fi-checkbox--disabled {
      & .fi-checkbox_label {
        &::before {
          border-color: ${theme.colors.depthLight1};
          background-color: ${theme.colors.depthLight1};
        }
        & > .fi-checkbox_icon .fi-icon-base-fill {
          fill: ${theme.colors.depthLight3};
        }
      }
    }
    &.fi-checkbox--error {
      & .fi-checkbox_label {
        &::before {
          border-color: ${theme.colors.alertBase};
          background-color: ${theme.colors.alertBase};
          border-width: 2px;
        }
        & > .fi-checkbox_icon .fi-icon-base-fill {
          fill: ${theme.colors.whiteBase};
        }
      }
    }
  }
`;

const disabledStyles = (theme: SuomifiTheme) => css`
  &.fi-checkbox--disabled {
    & .fi-checkbox_label {
      cursor: not-allowed;
      color: ${theme.colors.depthBase};
      &::before {
        background-color: ${theme.colors.depthLight3};
        border-color: ${theme.colors.depthLight1};
        border-width: 1px;
      }
      & > .fi-checkbox_icon .fi-icon-base-fill {
        fill: ${theme.colors.depthLight3};
      }
    }
    & .fi-hint-text {
      color: ${theme.colors.depthBase};
    }
    &.fi-checkbox--large {
      & .fi-checkbox_label::before {
        border-width: 2px;
      }
    }
  }
`;

const errorStyles = (theme: SuomifiTheme) => css`
  &.fi-checkbox--error {
    & .fi-checkbox_label {
      &::before {
        border-color: ${theme.colors.alertBase};
        border-width: 2px;
      }
      & > .fi-checkbox_icon .fi-icon-base-fill {
        fill: ${theme.colors.alertBase};
      }
    }
  }
`;

const largeVariantStyles = (theme: SuomifiTheme) => css`
  &.fi-checkbox--large {
    & .fi-checkbox_label {
      padding-left: ${theme.spacing.xxl};
      line-height: 30px;

      &::before {
        content: '';
        position: absolute;
        left: 0px;
        top: 0px;
        box-sizing: border-box;
        height: 30px;
        width: 30px;
        color: ${theme.colors.depthDark3};
        border: 2px solid;
      }
      & .fi-checkbox_icon {
        height: 20px;
        width: 20px;
        left: 5px;
        top: 4px;
      }
    }
    & .fi-hint-text {
      padding-left: ${theme.spacing.xxl};
    }

    &:focus-within {
      & .fi-checkbox_label {
        &::after {
          width: 32px;
          height: 32px;
          top: -1px;
          left: -1px;
        }
      }
    }
  }
`;

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}
  ${getCssMargins(margins)}
  
  & .fi-checkbox_label {
    position: relative;
    display: block;
    padding-left: ${theme.spacing.l};
    cursor: pointer;
    line-height: 27px;

    &::before {
      content: '';
      position: absolute;
      left: 0px;
      top: ${theme.spacing.xxs};
      box-sizing: border-box;
      height: 18px;
      width: 18px;
      border: 1px solid ${theme.colors.depthDark3};
      border-radius: ${theme.radiuses.basic};
      background-color: ${theme.colors.whiteBase};
    }
  }

  & .fi-checkbox_icon {
    position: absolute;
    height: 10px;
    width: 10px;
    left: 4px;
    top: 9px;
  }

  &:focus-within {
    & .fi-checkbox_label {
      /* Modified version of theme.focuses.absoluteFocus */
      &::after {
        content: '';
        position: absolute;
        pointer-events: none;
        top: 4px;
        left: -1px;
        border-radius: 2px;
        background-color: transparent;
        border: 0px solid ${theme.colors.whiteBase};
        box-sizing: border-box;
        box-shadow: 0 0 0 2px ${theme.colors.accentSecondary};
        z-index: 9999;
        width: 20px;
        height: 20px;
        outline: 2px solid transparent; /* For high contrast mode */
      }
    }
  }

  & .fi-checkbox_input {
    position: absolute;
    opacity: 0;
    z-index: -9999;
  }

  & .fi-hint-text {
    padding-left: ${theme.spacing.l};
    color: ${theme.colors.depthDark1};
  }

  & .fi-status-text {
    line-height: 18px;
    &.fi-checkbox_statusText--has-content {
      margin-top: ${theme.spacing.xxs};
    }
  }

  ${largeVariantStyles(theme)};
  ${checkedStyles(theme)};
  ${errorStyles(theme)};
  ${disabledStyles(theme)};
`;
