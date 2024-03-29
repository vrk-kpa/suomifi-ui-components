import { SuomifiTheme } from 'core/theme';
import { css } from 'styled-components';
import { font } from '../../theme/reset';

export const LinkListStyles = (theme: SuomifiTheme) => css`
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
