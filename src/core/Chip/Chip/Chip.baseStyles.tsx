import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { baseChipBaseStyles } from '../BaseChip/BaseChip.baseStyles';

export const baseStyles = css`
  ${baseChipBaseStyles}
  &.fi-chip--button {
    cursor: pointer;
    &:hover {
      background: ${suomifiTheme.colors.highlightLight1};
    }

    &:active {
      background: ${suomifiTheme.colors.highlightDark1};
    }
  }

  &.fi-chip--removable {
    padding-top: ${suomifiTheme.spacing.insetXxs};
    padding-right: 22px;
    padding-bottom: ${suomifiTheme.spacing.insetXxs};
    padding-left: ${suomifiTheme.spacing.insetL};
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
      margin-right: ${suomifiTheme.spacing.xs};
    }

    &.fi-chip--disabled {
      & .fi-chip--icon {
        cursor: not-allowed;
      }
    }
  }
`;
