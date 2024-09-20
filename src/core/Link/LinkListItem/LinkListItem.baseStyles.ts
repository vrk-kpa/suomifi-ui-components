import { SuomifiTheme } from '../../theme';
import { css } from 'styled-components';
import { font } from '../../theme/reset';

export const LinkListItemStyles = (theme: SuomifiTheme) => css`
  ${font(theme)('bodyText')}
  &.fi-link-list-item {
    list-style: none;
    padding: 0;
    & .fi-link-list-item_icon {
      margin-right: 2px;
      & .fi-icon {
        margin-left: -3px;
        font-size: 16px;
        transform: translateY(0.1em);
        & .fi-icon-base-fill {
          fill: ${theme.colors.accentBase};
        }
      }
    }
    & .fi-link {
      margin: 0;
    }
  }
`;
