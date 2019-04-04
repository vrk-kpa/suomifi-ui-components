import { css } from '@emotion/core';
import { suomifiTheme, ThemeProp } from '../theme';
import { ButtonProps } from './Button';
import { element, focus, fontSemibold } from '../theme/reset';

const fullWidthStyles = css`
  display: block;
  width: 100%;
`;

const negativeStyles = (theme: ThemeProp) => css`
  background: none;
  background-color: ${theme.colors.secondaryColor};
  border: 1px solid ${theme.colors.primarycolor};
  text-shadow: none;

  &:hover {
    background: ${theme.gradients.lightNegative};
  }

  &:active {
    background: none;
    background-color: ${theme.colors.invertBgrDark};
  }

  &[disabled],
  &:disabled {
    opacity: 0.5;
    background: none;
  }
`;

const secondaryStyles = (theme: ThemeProp) => css`
  color: ${theme.colors.secondaryColor};
  background: none;
  background-color: ${theme.colors.primarycolor};
  border: 1px solid ${theme.colors.secondaryColor};
  text-shadow: none;

  &:hover {
    background: ${theme.gradients.lightSecondary};
  }

  &:active {
    background: none;
    background-color: ${theme.colors.activeBgr};
  }

  &[disabled],
  &:disabled {
    color: ${theme.colors.disabledColor};
    background: none;
    background-color: ${theme.colors.disabledBgr};
    border-color: ${theme.colors.disabledColor};
  }
`;

const secondaryNoBorderStyles = (theme: ThemeProp) => css`
  ${secondaryStyles(theme)}
  border: none;
`;

const tertiaryStyles = (theme: ThemeProp) => css`
  ${secondaryStyles(theme)}
  background: ${theme.gradients.basicLight};
  border: none;

  &:hover {
    background: ${theme.gradients.basicLighter};
  }

  &:active {
    background: ${theme.gradients.basicDark};
  }
`;

export const baseStyles = ({
  theme = suomifiTheme,
  fullWidth = false,
  variant = 'default',
}: ButtonProps) => css`
  ${element}
  ${fontSemibold}
  ${focus}
  padding: 10px 20px;
  min-height: 40px;
  color: ${theme.colors.invertText};
  background: ${theme.gradients.basic};
  border-radius: 2px;
  text-align: center;
  letter-spacing: ${theme.typography.letterspacingBasic};
  text-shadow: ${theme.shadows.invertTextShadow};
  cursor: pointer;

  &:hover {
    background: ${theme.gradients.light};
  }

  &:active {
    background: ${theme.gradients.dark};
  }

  &[disabled],
  &:disabled {
    background: ${theme.gradients.gray};
    pointer-events: none;
    user-selectable: none;
  }

  ${fullWidth && fullWidthStyles}
  ${variant === 'negative' && negativeStyles(theme)}
  ${variant === 'secondary' && secondaryStyles(theme)}
  ${variant === 'secondary-noborder' && secondaryNoBorderStyles(theme)}
  ${variant === 'tertiary' && tertiaryStyles(theme)}
`;

export const iconBaseStyles = ({ right = false }: { right?: boolean }) => css`
  width: 16px;
  height: 16px;
  margin-${right ? 'left' : 'right'}: 8px;
`;
