import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element } from '../../theme/reset';
import { MarginProps, getCssMargins } from '../../theme/utils/spacing';

export const baseStyles = (theme: SuomifiTheme, margins?: MarginProps) => css`
  ${element(theme)}
  ${getCssMargins(margins)}

  & .fi-checkbox-group_legend {
    margin-bottom: 10px;

    .fi-hint-text {
      margin-bottom: 0;
    }
  }

  & .fi-checkbox-group_label--with-margin {
    margin-bottom: 10px;
  }

  & .fi-checkbox-group_container {
    & > .fi-checkbox {
      margin-bottom: ${theme.spacing.xs};

      &:last-child {
        margin-bottom: 0;
      }
    }

    & .fi-checkbox--large {
      margin-top: ${theme.spacing.xxs};
      margin-bottom: ${theme.spacing.s};
    }
  }
`;
