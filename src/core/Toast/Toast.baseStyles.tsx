import { css } from 'styled-components';
import { SuomifiThemeProp } from '../theme';
import { element, font } from '../theme/reset';
import { ToastProps } from './Toast';

export const baseStyles = ({ theme }: ToastProps & SuomifiThemeProp) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  &.fi-toast {
    background: red;
  }
`;
