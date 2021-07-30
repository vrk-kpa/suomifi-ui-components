import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';

export const baseStyles = css`
  &.fi-modal_content {
    flex: 1 1 auto;
    max-height: 100%;
    padding: 24px ${suomifiTheme.spacing.xl} 50px ${suomifiTheme.spacing.xl};
    overflow-y: auto;
    scroll-padding-bottom: 75px;
    scroll-padding-top: 75px;

    &--no-scroll {
      overflow: hidden;
      padding: 34px ${suomifiTheme.spacing.xl} 10px ${suomifiTheme.spacing.xl};
    }

    &--small-screen {
      padding-top: ${suomifiTheme.spacing.m};
      padding-left: ${suomifiTheme.spacing.m};
      padding-bottom: 50px;
      padding-right: ${suomifiTheme.spacing.m};
    }
  }
`;
