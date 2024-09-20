import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { baseChipBaseStyles } from '../BaseChip/BaseChip.baseStyles';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${baseChipBaseStyles(theme)}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
  &.fi-chip--button {
    cursor: pointer;
    &:hover {
      background: ${theme.colors.highlightLight1};
    }

    &:active {
      background: ${theme.colors.highlightDark1};
    }
    &:focus {
      ${theme.focuses.highContrastFocus}
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
      margin-right: ${theme.spacing.xs};
    }

    &.fi-chip--disabled {
      & .fi-chip--icon {
        cursor: not-allowed;
      }
    }
  }
`;
