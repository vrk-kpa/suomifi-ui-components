import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';

export const SkipLinkStyles = (theme: SuomifiTheme) => css`
  ${baseStyles(theme)}
  &.fi-link--skip {
    position: absolute;
    z-index: 10000;
    left: -1000px;
    margin: ${theme.spacing.insetXl};
    padding: ${theme.spacing.insetM};
    background: ${theme.colors.highlightLight3};
    border: 1px solid ${theme.colors.depthLight1};
    color: ${theme.colors.blackBase};
  }

  &.fi-link--skip:focus {
    position: absolute;
    left: auto;
  }
`;
