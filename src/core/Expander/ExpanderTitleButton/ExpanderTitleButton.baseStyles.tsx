import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, button, font } from '../../theme/reset';
import { allStates } from '../../../utils/css';

export const expanderTitleButtonBaseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 60px;
  background-color: ${theme.colors.highlightLight4};
  border-radius: inherit;

  &:hover {
    background: ${theme.gradients.depthSecondaryToDepthSecondaryDark1};
  }

  & .fi-expander_title-button {
    display: block;
  }
  &.fi-expander_title-button--open {
    background-color: ${theme.colors.whiteBase};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  & .fi-expander_title-button_button {
    ${button(theme)}
    ${font(theme)('bodySemiBold')}
    color: ${theme.colors.highlightBase};
    display: inline-block;
    width: 100%;
    max-width: 100%;
    min-height: 60px;
    padding: 17px ${theme.spacing.xxxl} 16px ${theme.spacing.m};

    &:focus {
      outline: 0;
    }

    &:focus-within {
      outline: 3px solid transparent; /* For high contrast mode */
      &:after {
        ${theme.focuses.absoluteFocus}
      }
    }

    ${theme.focuses.noMouseFocus}
    & * {
      cursor: pointer;
    }
    ${allStates('cursor: pointer;')}
  }

  & .fi-expander_title-button-icon {
    position: absolute;
    top: 0;
    right: 0;
    height: 20px;
    width: 20px;
    margin: ${theme.spacing.m};
  }

  & .fi-expander_title-button--open .fi-expander_title-button-icon,
  & .fi-expander_title-button-icon--open {
    transform: rotate(-180deg);
  }
`;
