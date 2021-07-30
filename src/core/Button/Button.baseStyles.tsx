import { css } from 'styled-components';
import { suomifiTheme } from '../theme';
import { button } from '../theme/reset';
import { alphaHex } from '../../utils/css';

const invertedStyles = css`
  &.fi-button--inverted {
    background: none;
    background-color: ${suomifiTheme.colors.highlightBase};
    border: 1px solid ${suomifiTheme.colors.whiteBase};
    text-shadow: none;

    &:hover {
      background: ${suomifiTheme.gradients.whiteBaseNegative};
    }

    &:active {
      background: none;
      background-color: ${suomifiTheme.colors.highlightBase};
    }

    &.fi-button--disabled,
    &[disabled],
    &:disabled {
      opacity: 0.41;
      background: none;
      background-color: none;
    }
  }
`;

const secondary = css`
  color: ${suomifiTheme.colors.highlightBase};
  background: none;
  background-color: ${suomifiTheme.colors.whiteBase};
  border: 1px solid ${suomifiTheme.colors.highlightBase};
  text-shadow: none;

  &:hover {
    background: ${suomifiTheme.gradients.whiteBaseToDepthLight2};
  }

  &:active {
    background: none;
    background-color: ${suomifiTheme.colors.depthLight2};
  }

  &.fi-button--disabled,
  &[disabled],
  &:disabled {
    color: ${suomifiTheme.colors.depthBase};
    text-shadow: none;
    background: none;
    background-color: ${suomifiTheme.colors.highlightLight4};
    border-color: ${suomifiTheme.colors.depthBase};
  }
`;

const secondaryStyles = css`
  &.fi-button--secondary {
    ${secondary}
  }
`;

const secondaryNoBorderStyles = css`
  &.fi-button--secondary-noborder {
    ${secondary}
    border: none;
    background-color: transparent;
  }
`;

const linkStyles = css`
  &.fi-button--link {
    color: ${suomifiTheme.colors.highlightBase};
    ${secondary}
    background: ${suomifiTheme.gradients.depthSecondaryToDepthSecondaryDark1};
    border: none;

    &:hover {
      background: ${suomifiTheme.gradients.highlightLight4ToDepthSecondary};
    }

    &:active {
      background: ${suomifiTheme.gradients.depthLight3ToDepthLight2};
    }

    &.fi-button--disabled,
    &[disabled],
    &:disabled {
      color: ${suomifiTheme.colors.depthBase};
      background: none;
      background-color: ${suomifiTheme.colors.depthLight3};
    }
  }
`;

export const baseStyles = css`
  ${button(suomifiTheme)}
  padding: ${suomifiTheme.spacing.insetL} ${suomifiTheme.spacing.insetXxl};
  min-height: 40px;
  color: ${suomifiTheme.colors.whiteBase};
  background: ${suomifiTheme.gradients.highlightBaseToHighlightDark1};
  border-radius: ${suomifiTheme.radius.basic};
  text-align: center;
  text-shadow: ${suomifiTheme.shadows.invertTextShadow};
  cursor: pointer;

  &:focus {
    outline: none;
    position: relative;

    &::after {
      ${suomifiTheme.focus.absoluteFocus}
    }
  }

  &:hover {
    background: ${suomifiTheme.gradients.highlightLight1ToHighlightBase};
  }

  &:active {
    background: ${suomifiTheme.colors.highlightDark1};
  }

  &.fi-button--disabled,
  &[disabled],
  &:disabled {
    text-shadow: 0 1px 1px ${alphaHex(0.5)(suomifiTheme.colors.blackBase)};
    background: ${suomifiTheme.gradients.depthLight1ToDepthBase};
    user-select: none;
    cursor: not-allowed;
  }

  &.fi-button--disabled::after {
    border: none;
    box-shadow: none;
  }

  &.fi-button--fullwidth {
    display: block;
    width: 100%;
  }

  ${invertedStyles}
  ${secondaryStyles}
  ${secondaryNoBorderStyles}
  ${linkStyles}

  & > .fi-button_icon {
    width: 16px;
    height: 16px;
    margin-right: ${suomifiTheme.spacing.insetM};
    vertical-align: middle;
    transform: translateY(-0.1em);
    &.fi-button_icon--right {
      margin-right: 0;
      margin-left: ${suomifiTheme.spacing.insetM};
    }
  }
  &.fi-button--disabled > .fi-button_icon {
    cursor: not-allowed;
  }
`;
