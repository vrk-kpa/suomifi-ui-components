import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { baseChipBaseStyles } from '../BaseChip/BaseChip.baseStyles';

export const baseStyles = css`
  ${baseChipBaseStyles}
  &.fi-chip--button {
    cursor: pointer;
    &:hover {
      background: ${theme.colors.highlightLight1};
    }

    &:active {
      background: ${theme.colors.highlightDark1};
    }
  }

  &.fi-chip--removable {
    & .fi-chip--content {
      max-width: 248px;
      margin-right: ${theme.spacing.xs};
    }
  }
`;
