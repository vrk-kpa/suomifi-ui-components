import { SuomifiTheme } from '../../theme';
import { css } from 'styled-components';

export const ListLinkStyles = (theme: SuomifiTheme) => css`
  &.fi-list-link {
    list-style: none;
    padding: 0;
    & .fi-list-link_icon {
      margin-right: 2px;
      & .fi-icon {
        margin-left: -3px;
        transform: translateY(0.1em);
        & .fi-icon-base-fill {
          fill: ${theme.colors.accentBase};
        }
      }
    }
  }
`;
