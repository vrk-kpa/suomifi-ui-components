import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { alphaHex } from '../../../utils/css';
import { element, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-modal_base {
    ${element(theme)}
    ${font(theme)('actionElementInnerTextBold')}

    & .fi-modal_overlay {
      background-color: ${alphaHex(0.5)(theme.colors.blackBase)};
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  & .fi-modal {
    border-radius: ${theme.radiuses.modal};
    background-color: ${theme.colors.whiteBase};
    border-top: ${theme.spacing.insetXs} solid ${theme.colors.highlightBase};
    overflow: hidden;
    max-height: calc(100% - 50px);
    min-height: 230px;
    width: 800px;
    max-width: 100%;
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    &:focus {
      outline: none;
    }

    &:focus-visible {
      ${theme.focuses.boxShadowFocus}
    }

    &--no-scroll {
      width: 540px;
      min-height: 190px;
    }

    &--small-screen {
      border-radius: 0;
      width: 100%;
      height: 100%;
      max-height: 100%;
    }
  }
`;
