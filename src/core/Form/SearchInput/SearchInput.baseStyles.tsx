import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { math } from 'polished';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    & .fi-search-input {
      &_input-container {
        position: relative;
      }
      &_input {
        padding-right: ${math(
          `${theme.spacing.insetXl} * 2 + ${theme.spacing.insetM}`,
        )};
      }
      &_icon {
        position: absolute;
        top: 50%;
        right: ${theme.spacing.insetXl};
        margin-top: -0.5em;
      }
    }
  `,
);
