import { css } from 'styled-components';
import {
  withSuomifiTheme,
  TokensAndTheme,
  SuomifiThemeProp,
} from '../../theme';
import { element, font } from '../../theme/reset';

const checkedStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-checkbox--checked .fi-checkbox_label {
    &::before,
    &::after {
      border-color: ${theme.colors.brandBase};
    }
  }
`;

const errorStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-checkbox--error {
    & .fi-checkbox_label {
      &::before,
      &::after {
        border-color: ${theme.colors.alertBase};
      }
    }
    & .fi-checkbox_status {
      color: ${theme.colors.alertBase};
    }
  }
`;

const largeVariantStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-checkbox--large {
    & .fi-checkbox_label {
      padding-left: 40px;
      line-height: 30px;
      min-height: 30px;

      &::before {
        content: '';
        position: absolute;
        left: 0px;
        top: 0px;
        display: inline-block;
        box-sizing: border-box;
        height: 30px;
        width: 30px;
        color: ${theme.colors.depthBase};
        border: 2px solid;
        border-radius: 2px;
      }
      &::after {
        display: inline-block;
        position: absolute;
        height: 8px;
        width: 16px;
        border-left: 3px solid;
        border-bottom: 3px solid;
        border-radius: 3px;
        border-bottom-right-radius: 2px;
        border-top-left-radius: 2px;
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
    ${font({ theme })('bodyText')}
    
    &:focus-within {
      & .fi-checkbox_label::before {
        box-shadow: 0 0 0 3px #ffbf47;
      }
    }

    & .fi-checkbox_input {
      position: absolute;
      opacity: 0;
      z-index: -9999;
      background-color: ${theme.colors.whiteBase};

      /* Will show the checkmark depending on the checked status */
      & + .fi-checkbox_label::after {
        content: none;
      }
      &:checked + .fi-checkbox_label::after {
        content: '';
      }
    }
    /*TODO: Separate size and spacings to new entity for variant use */
    & .fi-checkbox_label {
      position: relative;
      display: inline-block;
      padding-left: 26px;
      min-height: 30px;
      min-width: 30px;
      &::before {
        content: '';
        position: absolute;
        left: 0px;
        top: 5px;
        display: inline-block;
        box-sizing: border-box;
        height: 18px;
        width: 18px;
        color: ${theme.colors.depthBase};
        border: 1px solid;
        border-radius: 2px;
      }
      &::after {
        content: '';
        display: inline-block;
        position: absolute;
        height: 5px;
        width: 8px;
        border-left: 2px solid;
        border-bottom: 2px solid;
        border-radius: 2px;
        transform: rotate(-45deg);
        left: 4px;
        top: 8px;
      }
    }

    & .fi-checkbox_hintText {
      display: block;
      padding-left: 26px;
      font-size: ${theme.typography.bodyTextSmall};
      color: ${theme.colors.depthBase};
      margin-bottom: 5px;
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

  `,
);
