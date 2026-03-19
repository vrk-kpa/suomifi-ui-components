import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}
  width: 100%;

  &.fi-reorderable-list {
    & .fi-reorderable-list_edit-button {
      margin-bottom: ${theme.spacing.s};
    }

    & .fi-reorderable-list_instruction {
      margin-bottom: ${theme.spacing.m};
    }

    & .fi-reorderable-list_list {
      & > ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }
  }
`;
