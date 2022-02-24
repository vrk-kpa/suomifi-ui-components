import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { cssValueToString } from '../../../utils/css';

export const baseStyles = (theme: SuomifiTheme) => css`
  font-size: ${cssValueToString(
    theme.values.typography.bodyTextSmall.fontSize,
  )};
  display: inline-block;
  &.fi-breadcrumb-link {
    & .fi-breadcrumb-link_link {
      ${font(theme)('bodyTextSmall')}
      &--current {
        color: ${theme.colors.depthDark1};
      }
    }

    & .fi-breadcrumb-link_icon {
      transform: translateY(0.2em);
      margin: 0 ${theme.spacing.insetXs};
      & .fi-icon-base-fill {
        fill: ${theme.colors.depthDark1};
      }
    }
  }
`;
