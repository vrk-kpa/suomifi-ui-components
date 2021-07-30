import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';

export const SkipLinkStyles = css`
  ${baseStyles}
  &.fi-link--skip {
    position: absolute;
    z-index: 10000;
    left: -1000px;
    margin: ${suomifiTheme.spacing.insetXl};
    padding: ${suomifiTheme.spacing.insetM};
    background: ${suomifiTheme.colors.highlightLight3};
    border: 1px solid ${suomifiTheme.colors.depthLight1};
    color: ${suomifiTheme.colors.blackBase};
    text-decoration: none;
  }

  &.fi-link--skip:focus {
    position: absolute;
    left: auto;
  }
`;
