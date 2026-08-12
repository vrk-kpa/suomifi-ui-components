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
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.spacing.insetXxs} ${theme.spacing.insetL};
    position: relative;

    & .fi-chip--icon {
      flex-shrink: 0;
      margin-left: ${theme.spacing.xs};
      height: 12px;
      width: 12px;
    }

    & .fi-chip--content {
      flex-grow: 1;
      margin-right: ${theme.spacing.xs};
    }

    &.fi-chip--disabled {
      & .fi-chip--icon {
        cursor: not-allowed;
      }
    }
  }
`;
