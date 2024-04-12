import { SuomifiTheme } from 'core/theme';
import { css } from 'styled-components';
import { font } from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const LinkListStyles = (
  theme: SuomifiTheme,
  margins?: MarginProps,
) => css`
  ${buildSpacingCSS(margins)}
  &.fi-link-list {
    padding: 0;
    margin: 5px 0 0 0;
  }
  &.fi-link-list--small {
    & .fi-link-list-item_icon .fi-icon {
      transform: translateY(0.15em);
    }
    & .fi-link {
      ${font(theme)('bodyTextSmall')}
    }
  }
`;
