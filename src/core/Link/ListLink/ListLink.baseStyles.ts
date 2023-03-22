import { SuomifiTheme } from '../../theme';
import { css } from 'styled-components';

export const ListLinkStyles = (theme: SuomifiTheme) => css`
  &.fi-list-link {
    list-style: none;
    & .fi-link {
      font-size: 16px;
    }
    & .fi-list-link_icon {
      margin-right: 2px;
      & .fi-icon {
        vertical-align: middle;
        margin-left: -3px;
        transform: translateY(-0.1em);
        & .fi-icon-base-fill {
          fill: ${theme.colors.accentBase};
        }
      }
    }
  }
`;
