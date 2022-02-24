import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseChipBaseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('actionElementInnerTextBold')}
  border-radius: 14px;
  padding: ${theme.spacing.insetXxs} ${theme.spacing.insetL};
  color: ${theme.colors.whiteBase};
  background: ${theme.colors.highlightBase};
  max-height: 28px;
  display: inline-block;
  &:focus {
    outline: 0;
    position: relative;

    &::after {
      ${theme.focus.absoluteFocus}
      border-radius: 16px;
    }
  }

  &.fi-chip {
    & .fi-chip--content {
      display: inline-block;
      max-width: 270px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5em;
    }
  }

  &.fi-chip--disabled {
    &.fi-chip {
      cursor: not-allowed;
      background: ${theme.colors.depthBase};
      &:hover,
      &:active {
        background: ${theme.colors.depthBase};
      }
    }
  }
`;
