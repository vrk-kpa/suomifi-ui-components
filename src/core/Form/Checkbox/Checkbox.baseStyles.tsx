import { css } from 'styled-components';
import {
  withSuomifiTheme,
  TokensAndTheme,
  SuomifiThemeProp,
} from '../../theme';
import { disabledCursor } from '../../../components/utils/css';
import { element, font } from '../../theme/reset';

/* stylelint-disable */
const checkedStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-checkbox--checked {
    & .fi-checkbox_label {
      &::before,
      &::after {
        border-color: ${theme.colors.highlightBase};
      }
    }
  }
`;

const disabledStyles = ({ theme }: SuomifiThemeProp) => css`
    &.fi-checkbox--disabled{    
        & .fi-checkbox_label{
            ${disabledCursor}
    color: ${theme.colors.depthBase};
        &::before, ::after{
            background-color: ${theme.colors.depthLight3};
            border-color: ${theme.colors.depthLight1};
        }
    }
}
`;

const errorStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-checkbox--error {
    & .fi-checkbox_label {
      &::before {
        border-color: ${theme.colors.alertBase};
        border-width: 2px;
      }
      &::after {
        border-color: ${theme.colors.alertBase};
      }
    }
    & .fi-checkbox_status {
      color: ${theme.colors.alertBase};
      margin-top: ${theme.spacing.xxs};
    }
  }
`;

const largeVariantStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-checkbox--large {
    & .fi-checkbox_label {
      padding-left: 40px;
      min-height: 30px;

      &::before {
        content: '';
        position: absolute;
        left: 0px;
        top: 0px;
        box-sizing: border-box;
        height: 30px;
        width: 30px;
        color: ${theme.colors.depthBase};
        border: 2px solid;
      }
      &::after {
        position: absolute;
        height: 8px;
        width: 16px;
        border-left: 4px solid;
        border-bottom: 4px solid;
        border-radius: 3px;
        border-bottom-right-radius: ${theme.radius.basic};
        border-top-left-radius: ${theme.radius.basic};
        transform: rotate(-45deg);
        left: 6px;
        top: 6px;
      }
    }

    & .fi-checkbox_hintText {
      padding-left: 40px;
    }
  }
`;

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })(
      'bodyText',
    )}
    
    /*TODO: use suomi.fi focus style */
    &:focus-within {
      & .fi-checkbox_label {
        &::before {
          box-shadow: 0 0 0 3px #ffbf47;
          outline: 3px solid transparent; /* For Windows high contrast mode. */
        }
      }
    }

    & .fi-checkbox_input {
      position: absolute;
      opacity: 0;
      z-index: -9999;

      & + .fi-checkbox_label::after {
        content: none;
      }
      &:checked + .fi-checkbox_label::after {
        content: '';
      }
    }
    & .fi-checkbox_label {
      position: relative;
      display: block;
      padding-left: ${theme.spacing.l};
      cursor: pointer;
      min-height: 27px;
      line-height: 1.5em;
      padding-top: 1px;
      &::before {
        content: '';
        position: absolute;
        left: 0px;
        top: ${theme.spacing.xxs};
        box-sizing: border-box;
        height: 18px;
        width: 18px;
        color: ${theme.colors.depthBase};
        border: 1px solid;
        border-radius: ${theme.radius.basic};
        background-color: ${theme.colors.whiteBase};
      }
      &::after {
        content: '';
        position: absolute;
        height: 5px;
        width: 8px;
        border-left: 2px solid;
        border-bottom: 2px solid;
        border-radius: ${theme.radius.basic};
        transform: rotate(-45deg);
        left: 4px;
        top: 8px;
      }
    }

    & .fi-checkbox_hintText {
      display: block;
      padding-left: ${theme.spacing.l};
      font-size: ${theme.typography.bodyTextSmall};
      color: ${theme.colors.depthBase};
    }

    & .fi-checkbox_status {
      display: block;
      color: ${theme.colors.blackBase};
      font-size: 14px;
      font-weight: 600;
    }

    ${largeVariantStyles({ theme })};
    ${checkedStyles({ theme })};
    ${errorStyles({ theme })};
    ${disabledStyles({ theme })};
  `,
);
