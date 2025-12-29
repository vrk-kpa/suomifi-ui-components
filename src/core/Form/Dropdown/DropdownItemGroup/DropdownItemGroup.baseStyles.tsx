import { css } from 'styled-components';
import { SuomifiTheme } from '../../../theme';

export const baseStyles = (theme: SuomifiTheme) => css`
  &.fi-dropdown_item-group {
    .fi-dropdown_item-group_label {
      ${theme.typography.bodySemiBoldSmall}
      padding: ${theme.spacing.insetM};
      color: ${theme.colors.blackBase};
      cursor: default;
      user-select: none;
      background-color: ${theme.colors.whiteBase};
    }

    .fi-dropdown_item {
      padding-left: ${theme.spacing.xl};
    }
  }
`;
