import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { element, button, font } from '../../theme/reset';
import { allStates } from '../../../utils/css';
import { absoluteFocus, noMouseFocus } from '../../theme/utils';

import { ExpanderTitleButtonProps } from './ExpanderTitleButton';

export const expanderTitleButtonBaseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & Partial<ExpanderTitleButtonProps>) => {
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

      &.fi-expander_title-button--open {
        background-color: ${theme.colors.whiteBase};
      }

      & .fi-expander_title-button_button {
        ${button({ theme })}
        ${font({ theme })('bodyText')}
        font-size: ${theme.typography.bodySemiBold};
        color: ${theme.colors.highlightBase};
        display: inline-block;
        width: 100%;
        min-height: 60px;
        padding: 17px ${theme.spacing.xxxl} 16px ${theme.spacing.m};

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

      & .fi-expander_title-button-icon {
        position: absolute;
        top: 0;
        right: 0;
      }

      & .fi-expander_title-button-icon {
        margin: ${theme.spacing.m};
        height: 20px;
        width: 20px;
      }

      & .fi-expander_title-button--open .fi-expander_title-button-icon,
      & .fi-expander_title-button-icon--open {
        transform: rotate(-180deg);
      }
    `;
  },
);
