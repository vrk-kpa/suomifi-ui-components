import { css } from '@emotion/core';
import { suomifiTheme, ITheme } from '../theme';
import { IButtonProps } from './Button';

const wideStyles = css`
  display: block;
  width: 100%;
`;

const disabledStyles = (theme: ITheme) => css`
  background: ${theme.gradients.gray};
  pointer-events: none;
  user-selectable: none;
`;

export const baseStyles = ({
  theme = suomifiTheme,
  wide = false,
}: IButtonProps) => css`
  padding: 10px 20px;
  border-radius: 2px 2px 2px 2px;
  color: ${theme.colors.invertText};
  background: ${theme.gradients.basic};
  font-size: ${theme.typography.buttonFontSize};
  font-weight: ${theme.typography.fontWeightSemibold};
  text-align: center;
  letter-spacing: ${theme.typography.letterspacingBasic};
  text-shadow: ${theme.shadows.invertTextShadow};
  cursor: pointer;

  ${wide && wideStyles}

  &:hover {
    background: ${theme.gradients.light};
  }

  &:focus {
    outline-color: ${theme.colors.focusRing};
    outline-offset: 4px;
    outline-style: auto;
    outline-width: 5px;
  }

  &:active {
    background: ${theme.gradients.dark};
  }

  &[disabled],
  &:disabled {
    ${disabledStyles(theme)}
  }
`;
