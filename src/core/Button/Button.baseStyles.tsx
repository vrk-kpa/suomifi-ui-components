import { css } from '@emotion/core';
import { suomifiTheme, ThemeProp } from '../theme';
import { ButtonProps } from './Button';
import { element, focus, fonts } from '../theme/reset';

const fullWidthStyles = css`
  display: block;
  width: 100%;
`;

const negativeStyles = (theme: ThemeProp) => css`
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

  &[disabled],
  &:disabled {
    opacity: 0.5;
    background: none;
  }
`;

const secondaryStyles = (theme: ThemeProp) => css`
  color: ${theme.colors.highlightBase};
  background: none;
  background-color: ${theme.colors.whiteBase};
  border: 1px solid ${theme.colors.highlightBase};
  text-shadow: none;

  &:hover {
    background: ${theme.gradients.highlightLight45};
  }

  &:active {
    background: none;
    background-color: ${theme.colors.highlightLight53};
  }

  &[disabled],
  &:disabled {
    color: ${theme.colors.depthBase};
    text-shadow: none;
    background: none;
    background-color: ${theme.colors.highlightLight53};
    border-color: ${theme.colors.depthBase};
  }
`;

const secondaryNoBorderStyles = (theme: ThemeProp) => css`
  ${secondaryStyles(theme)}
  border: none;
`;

const tertiaryStyles = (theme: ThemeProp) => css`
  ${secondaryStyles(theme)}
  background: ${theme.colors.highlightLight50};
  border: none;

  &:hover {
    background: ${theme.colors.highlightLight53};
  }

  &:active {
    background: ${theme.colors.highlightLight53};
  }
`;

export const baseStyles = ({
  theme = suomifiTheme,
  fullWidth = false,
  variant = 'default',
}: ButtonProps) => css`
  ${element}
  ${fonts.inputSemibold}
  ${focus}
  padding: 10px 20px;
  min-height: 40px;
  color: ${theme.colors.whiteBase};
  background: ${theme.gradients.highlightBase};
  border-radius: ${theme.radius.basic};
  text-align: center;
  text-shadow: ${theme.shadows.invertTextShadow};
  cursor: pointer;

  &:hover {
    background: ${theme.gradients.highlightLight4};
  }

  &:active {
    background: ${theme.gradients.highlightDark9};
  }

  &[disabled],
  &:disabled {
    text-shadow: 0 1px 1px ${theme.colors.blackBase};
    background: ${theme.gradients.depthBase};
    pointer-events: none;
    user-select: none;
  }

  ${fullWidth && fullWidthStyles}
  ${variant === 'negative' && negativeStyles(theme)}
  ${variant === 'secondary' && secondaryStyles(theme)}
  ${variant === 'secondary-noborder' && secondaryNoBorderStyles(theme)}
  ${variant === 'tertiary' && tertiaryStyles(theme)}

  & > .fi-button-icon {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    &.fi-button-icon--right {
      margin-right: 0;
      margin-left: 8px;
    }
  }
`;

export const unStyled = ({ theme = suomifiTheme }) => css`
  ${element}
  ${focus}
  border-radius: ${theme.radius.basic};
  cursor: pointer;
`;
