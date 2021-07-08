import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';

export const linkExternalStyles = css`
  ${baseStyles}
  & .fi-link_icon {
    padding-left: ${theme.spacing.insetXs};
    font-size: 16px;
    box-sizing: content-box;
  }
`;
