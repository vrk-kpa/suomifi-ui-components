import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { element, button, font } from '../../theme/reset';
import { allStates } from '../../../utils/css';
import { absoluteFocus, noMouseFocus } from '../../theme/utils';

import { ExpanderTitleProps } from './ExpanderTitle';

export const expanderTitleBaseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & Partial<ExpanderTitleProps>) => {
    return css`
      ${element({ theme })}
      ${font({ theme })('bodyText')}
      font-size: ${theme.typography.bodySemiBold};
      position: relative;
      display: block;
      width: 100%;
      max-width: 100%;
      min-height: 60px;
      background-color: ${theme.colors.highlightLight4};
      padding: 17px ${theme.spacing.xxxl} 16px ${theme.spacing.m};
      white-space: break-word;
      word-wrap: break-word;

      &.fi-expander_title--open {
        background-color: ${theme.colors.whiteBase};
      }

      & .fi-expander_title-button {
        ${button({ theme })}
        font-size: ${theme.typography.bodySemiBold};
        color: ${theme.colors.highlightBase};
        display: inline-block;
        position: absolute;
        right: 0;
        top: 0;
        width: 44px;
        height: 44px;
        padding: 12px;
        margin: 13px;

        &:focus {
          outline: 0;
        }

        &:focus-within {
          outline: 0;
          &:after {
            ${absoluteFocus}
          }
        }
        ${noMouseFocus}
        &,

        & * {
          cursor: pointer;
        }
        ${allStates('cursor: pointer;')}
      }

      & .fi-expander_title-icon {
        position: relative;
        height: 20px;
        width: 20px;
      }
      & .fi-expander_title--open .fi-expander_title-icon,
      & .fi-expander_title-icon--open {
        transform: rotate(-180deg);
      }
    `;
  },
);
