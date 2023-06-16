import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, button, font } from '../../theme/reset';
import { allStates } from '../../../utils/css';

export const expanderTitleBaseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodySemiBold')}
  position: relative;
  width: 100%;
  max-width: 100%;
  min-height: 60px;
  background-color: ${theme.colors.highlightLight4};
  border-radius: inherit;
  white-space: break-word;
  word-wrap: break-word;

  &.fi-expander_title {
    display: flex;
    justify-content: space-between;
  }
  &.fi-expander_title--open {
    background-color: ${theme.colors.whiteBase};
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  & .fi-expander_title-content {
    display: inline-block;
    padding: 17px ${theme.spacing.m} 16px ${theme.spacing.m};
  }

  & .fi-expander_title-button {
    ${button(theme)}
    ${font(theme)('bodySemiBold')}
    color: ${theme.colors.highlightBase};
    display: flex;
    justify-content: center;
    position: relative;
    align-items: flex-start;
    flex: 0 0 60px;
    padding-top: ${theme.spacing.m};

    &:focus {
      outline: 0;
    }

    &:focus-within {
      ${theme.focuses.highContrastFocus}
      &:after {
        ${theme.focuses.absoluteFocus}
      }
    }

    &:hover {
      background: ${theme.gradients.depthSecondaryToDepthSecondaryDark1};
    }

    ${theme.focuses.noMouseFocus}
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
