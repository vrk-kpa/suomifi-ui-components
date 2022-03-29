import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}
  padding: 20px;
  &.fi-loadingSpinner {
    display: block;
    text-align: center;

    & svg {
      animation: rotation 1.5s infinite linear;
      display: inline-block;
      width: 40px;
      height: 40px;
    }
    & .fi-loadingSpinner-label {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      margin-top: 6px;
    }
    &.fi-loadingSpinner-labelAlign-right {
      display: flex;
      align-items: center;

      & .fi-loadingSpinner-label {
        margin-left: 10px;
        margin-top: 0;
        line-height: 1.3em;
      }
    }
  }
  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
  @media (prefers-reduced-motion) {
    &.fi-loadingSpinner svg {
      animation: rotation 10s infinite linear;
    }
  }
`;
