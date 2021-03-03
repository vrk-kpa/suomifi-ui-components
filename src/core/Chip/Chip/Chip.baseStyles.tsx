import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { staticChipBaseStyles } from '../StaticChip.baseStyles';

export const baseStyles = withSuomifiTheme(
  (tokensAndTheme: TokensAndTheme) => css`
    ${staticChipBaseStyles(tokensAndTheme)}
    &.fi-chip--button {
      cursor: pointer;
      &:hover {
        background: ${tokensAndTheme.theme.colors.highlightLight1};
      }

      &:active {
        background: ${tokensAndTheme.theme.colors.highlightDark1};
      }
    }
    &.fi-chip--removable {
      & .fi-chip--content {
        max-width: 248px;
        margin-right: ${tokensAndTheme.theme.spacing.xs};
      }
    }
  `,
);
