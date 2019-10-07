import { css } from 'styled-components';
import { withSuomifiTheme, SuomifiThemeProp } from '../../theme';
import { math } from 'polished';

export const baseStyles = withSuomifiTheme(
  ({ theme }: SuomifiThemeProp) => css`
    & .fi-search-input {
      &_input-container {
        position: relative;
      }
      &_input {
        padding-right: ${math(`${theme.spacing.m} * 2 + ${theme.spacing.s}`)};
      }
      &_icon {
        position: absolute;
        top: 50%;
        right: ${theme.spacing.m};
        margin-top: -0.5em;
      }
    }
  `,
);
