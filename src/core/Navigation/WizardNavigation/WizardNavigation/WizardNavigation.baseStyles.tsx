import { font } from '../../../theme/reset';
import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-wizard-navigation {
    padding: ${theme.spacing.s};

    &--small-screen {
      background: ${theme.colors.highlightLight3};
      .fi-wizard-navigation_heading {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        ${font(theme)('heading4')}

        .fi-icon {
          color: ${theme.colors.highlightBase};
          width: 20px;
          height: 20px;
        }
      }
    }

    .fi-wizard-navigation_heading {
      ${font(theme)('heading4')}
    }
    .fi-wizard-navigation_list {
      border-top: 1px solid ${theme.colors.depthBase};
      list-style-type: none;
      margin: 0;
      padding: 0;
      padding-top: ${theme.spacing.s};
      margin-top: ${theme.spacing.s};
    }
  }
`;
