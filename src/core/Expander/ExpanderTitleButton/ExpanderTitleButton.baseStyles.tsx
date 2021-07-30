import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element, button, font } from '../../theme/reset';
import { allStates } from '../../../utils/css';

export const expanderTitleButtonBaseStyles = css`
  ${element(suomifiTheme)}
  position: relative;
  display: block;
  width: 100%;
  max-width: 100%;
  min-height: 60px;
  background-color: ${suomifiTheme.colors.highlightLight4};
  border-radius: inherit;

  &.fi-expander_title-button--open {
    background-color: ${suomifiTheme.colors.whiteBase};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  & .fi-expander_title-button_button {
    ${button(suomifiTheme)}
    ${font(suomifiTheme)('bodySemiBold')}
    color: ${suomifiTheme.colors.highlightBase};
    display: inline-block;
    width: 100%;
    max-width: 100%;
    min-height: 60px;
    padding: 17px ${suomifiTheme.spacing.xxxl} 16px ${suomifiTheme.spacing.m};

    &:focus {
      outline: 0;
    }

    &:focus-within {
      outline: 0;
      &:after {
        ${suomifiTheme.focus.absoluteFocus}
      }
    }
    ${suomifiTheme.focus.noMouseFocus}
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
    margin: ${suomifiTheme.spacing.m};
  }

  & .fi-expander_title-button--open .fi-expander_title-button-icon,
  & .fi-expander_title-button-icon--open {
    transform: rotate(-180deg);
  }
`;
