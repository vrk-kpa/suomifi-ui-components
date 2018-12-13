import { css } from '@emotion/core';
import { suomifiTheme } from '../theme';
import { IButtonProps } from './Button';

const disabledStyles = css`
  pointer-events: none;
  user-selectable: none;
`;

export const baseStyles = ({ theme = suomifiTheme }: IButtonProps) => css`
  padding: 10px 20px;
  border-radius: 2px 2px 2px 2px;
  color: ${theme.colors.invertText};
  background: ${theme.gradients.basic};
  font-weight: ${theme.typography.fontWeightSemibold};
  letter-spacing: ${theme.typography.letterspacingBasic};
  text-shadow: ${theme.shadows.invertTextShadow};

  &[disabled],
  &:disabled {
    ${disabledStyles}
  }
`;

// &:active {
//   background-color: ${themeColors.secondaryBackground};
// }
// &:focus {
//   border-color: ${themeColors.secondaryBackground};
// }
// &:hover {
//   background-color: ${themeColors.secondaryBackground};
// }
// &:hover,
// &:active {
//   border-color: ${themeColors.secondaryBackground};
// }
