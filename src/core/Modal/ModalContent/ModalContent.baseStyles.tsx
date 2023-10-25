import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  &.fi-modal_content {
    flex: 1 1 auto;
    max-height: 100%;
    padding: 24px ${theme.spacing.xl} 50px ${theme.spacing.xl};
    overflow-y: auto;
    scroll-padding-bottom: 75px;
    scroll-padding-top: 75px;

    &--no-scroll {
      overflow: hidden;
      padding: 34px ${theme.spacing.xl} 10px ${theme.spacing.xl};
    }

    &--small-screen {
      padding-top: ${theme.spacing.m};
      padding-left: ${theme.spacing.s};
      padding-bottom: 50px;
      padding-right: ${theme.spacing.s};
    }
  }
`;
