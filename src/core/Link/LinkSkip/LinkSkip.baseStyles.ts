import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';

export const linkSkipStyles = css`
  ${baseStyles}
  &.fi-link--skip {
    position: absolute;
    z-index: 10000;
    left: -1000px;
    margin: ${theme.spacing.insetXl};
    padding: ${theme.spacing.insetM};
    background: ${theme.colors.highlightLight3};
    border: 1px solid ${theme.colors.depthLight1};
    color: ${theme.colors.blackBase};
    text-decoration: none;
  }

  &.fi-link--skip:focus {
    position: absolute;
    left: auto;
  }
`;
