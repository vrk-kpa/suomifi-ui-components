import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme, SuomifiThemeProp } from '../theme';
import { ButtonProps } from './Button';
import { element, button } from '../theme/reset';
import { alphaHex } from '../../utils/css';
import { absoluteFocus } from '../theme/utils/focus';

const invertedStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-button--inverted {
    background: none;
    background-color: ${theme.colors.highlightBase};
    border: 1px solid ${theme.colors.whiteBase};
    text-shadow: none;

    &:hover {
      background: ${theme.gradients.whiteBaseNegative};
    }

    &:active {
      background: none;
      background-color: ${theme.colors.highlightBase};
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

const secondary = ({ theme }: SuomifiThemeProp) => css`
  color: ${theme.colors.highlightBase};
  background: none;
  background-color: ${theme.colors.whiteBase};
  border: 1px solid ${theme.colors.highlightBase};
  text-shadow: none;

  &:hover {
    background: ${theme.gradients.whiteBaseToDepthLight2};
  }

  &:active {
    background: none;
    background-color: ${theme.colors.depthLight2};
  }

  &.fi-button--disabled,
  &[disabled],
  &:disabled {
    color: ${theme.colors.depthBase};
    text-shadow: none;
    background: none;
    background-color: ${theme.colors.highlightLight4};
    border-color: ${theme.colors.depthBase};
  }
`;

const secondaryStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-button--secondary {
    ${secondary({ theme })}
  }
`;

const secondaryNoBorderStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-button--secondary-noborder {
    ${secondary({ theme })}
    border: none;
  }
`;

const tertiaryStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-button--tertiary {
    ${secondary({ theme })}
    background: ${theme.gradients.highlightLight3ToHighlightLight2};
    border: none;

    &:hover {
      background: ${theme.colors.highlightLight3};
    }

    &:active {
      background: ${theme.gradients.depthLight3ToDepthLight2};
    }
  }
`;

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & Partial<ButtonProps>) => css`
  ${button({ theme })}
  padding: ${theme.spacing.insetL} ${theme.spacing.insetXxl};
  min-height: 40px;
  color: ${theme.colors.whiteBase};
  background: ${theme.gradients.highlightBaseToHighlightDark1};
  border-radius: ${theme.radius.basic};
  text-align: center;
  text-shadow: ${theme.shadows.invertTextShadow};
  cursor: pointer;

  &:focus {
    outline: none;
    position: relative;

    &::after {
      ${absoluteFocus}
    }
  }

  &:hover {
    background: ${theme.gradients.highlightLight1ToHighlightBase};
  }

  &:active {
    background: ${theme.colors.highlightDark1};
  }

  &.fi-button--disabled,
  &[disabled],
  &:disabled {
    text-shadow: 0 1px 1px ${alphaHex(0.5)(theme.colors.blackBase)};
    background: ${theme.gradients.depthLight1ToDepthBase};
    user-select: none;
  }

  &.fi-button--disabled::after {
    border: none;
    box-shadow: none;
  }

  &.fi-button--fullwidth {
    display: block;
    width: 100%;
  }

  ${invertedStyles({ theme })}
  ${secondaryStyles({ theme })}
  ${secondaryNoBorderStyles({ theme })}
  ${tertiaryStyles({ theme })}

  & > .fi-button_icon {
    width: 16px;
    height: 16px;
    margin-right: ${theme.spacing.insetM};
    vertical-align: middle;
    transform: translateY(-0.1em);
    &.fi-button_icon--right {
      margin-right: 0;
      margin-left: ${theme.spacing.insetM};
    }
  }
  &.fi-button--disabled > .fi-button_icon {
    cursor: not-allowed;
  }
`,
);

export const unStyled = withSuomifiTheme(
  ({ theme }: SuomifiThemeProp) => css`
  ${element({ theme })}
  border-radius: ${theme.radius.basic};
  cursor: pointer;
`,
);
