import { css } from 'styled-components';
import { SuomifiTheme } from '../theme';
import { font, element } from '../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyTextSmall')}
  line-height: 1;
  &.fi-loadingSpinner {
    display: block;
    text-align: center;
    & .fi-loadingSpinner_icon {
      display: inline-block;
      width: 40px;
      height: 40px;
    }
    & .fi-loadingSpinner_text {
      font-size: 18px;
      font-weight: 600;
      text-align: center;
      margin-top: 6px;
    }
    &.fi-loadingSpinner-textAlign--right {
      display: flex;
      align-items: center;

      & .fi-loadingSpinner_text {
        margin-left: 10px;
        margin-top: 0;
        line-height: 1.5em;
      }
    }
    &.fi-loadingSpinner--small {
      .fi-loadingSpinner_icon {
        width: 24px;
        height: 24px;
      }
      & .fi-loadingSpinner_text {
        font-size: 16px;
        font-weight: normal;
        margin-top: 0;
      }
    }
    &.fi-loadingSpinner--loading {
      & .fi-loadingSpinner_icon {
        animation: rotation 1.5s infinite linear;
      }
    }
    &.fi-loadingSpinner--success {
      .fi-icon-base-fill {
        fill: ${theme.colors.successBase};
      }
    }
    &.fi-loadingSpinner--failed {
      .fi-icon-base-fill {
        fill: ${theme.colors.alertBase};
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
    &.fi-loadingSpinner.fi-loadingSpinner--loading {
      .fi-loadingSpinner_icon {
        animation: rotation 10s infinite linear;
      }
    }
  }
`;
