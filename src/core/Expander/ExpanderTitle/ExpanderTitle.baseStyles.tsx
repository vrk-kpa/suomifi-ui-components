import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme, SuomifiTheme } from '../../theme';
import { element, button, font } from '../../theme/reset';
import { allStates } from '../../../utils/css';
import { absoluteFocus } from '../../theme/utils';

import { ExpanderTitleProps } from './ExpanderTitle';

/* stylelint-disable no-descending-specificity, no-duplicate-selectors */
export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & Partial<ExpanderTitleProps>) => {
    return css`
      ${expanderTitleBaseStyle(theme)}
      & .fi-expander_title-button {
        ${expanderTitleButtonBaseStyle(theme)}
        font-size: ${theme.typography.bodySemiBold};
        width: 100%;
        max-width: 100%;
        min-height: 60px;
        padding: 17px ${theme.spacing.xxxl} 16px ${theme.spacing.m};
      }
      ${expanderTitleIconBaseStyle(theme)}
    `;
  },
);

export const expanderTitleBaseStyle = (theme: SuomifiTheme) => {
  return css`
    ${element({ theme })}
    position: relative;
    display: block;
    width: 100%;
    max-width: 100%;
    min-height: 60px;
  `;
};

export const expanderTitleButtonBaseStyle = (theme: SuomifiTheme) => {
  return css`
    ${button({ theme })}
    ${font({ theme })('bodyText')}
    background-color: ${theme.colors.whiteBase};
    color: ${theme.colors.highlightBase};
    display: block;
    &:focus {
      outline: 0;
    }
    &:focus-within {
      outline: 0;
      &:after {
        ${absoluteFocus}
      }
    }
    &,
    & * {
      cursor: pointer;
    }
    ${allStates('cursor: pointer;')}
  `;
};

export const expanderTitleIconBaseStyle = (theme: SuomifiTheme) => {
  return css`
    & .fi-expander_title-icon {
      position: absolute;
      height: 20px;
      width: 20px;
      top: 0;
      right: 0;
      margin: ${theme.spacing.m};
    }
    & .fi-expander_title--open .fi-expander_title-icon,
    & .fi-expander_title-icon--open {
      transform: rotate(-180deg);
    }
  `;
};
