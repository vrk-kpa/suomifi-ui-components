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
    padding-top: ${theme.spacing.insetXxs};
    padding-right: 22px;
    padding-bottom: ${theme.spacing.insetXxs};
    padding-left: ${theme.spacing.insetL};
    position: relative;

    & .fi-chip--icon {
      position: absolute;
      top: 8px;
      right: 10px;
      height: 12px;
      width: 12px;
    }

    & .fi-chip--content {
      max-width: 248px;
      margin-right: ${theme.spacing.xs};
    }
  }

  &.fi-chip--disabled {
    & .fi-chip--icon {
      cursor: not-allowed;
    }
  }
`;
