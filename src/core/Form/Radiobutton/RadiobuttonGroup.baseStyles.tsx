import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}

    &.fi-radiobuttongroup {
      & .fi-radiobuttongroup_label {
        display: block;
        ${theme.typography.bodySemiBoldSmall};
      }

      & .fi-radiobuttongroup_hintText {
        color: ${theme.colors.depthDark1};
        ${theme.typography.bodyTextSmall};
      }
    }

    & .fi-radiobutton_container {
      margin-top: ${theme.spacing.xs};
    }

    & .fi-radiobutton_container.fi-radiobutton--large {
      margin-top: ${theme.spacing.s};
    }
  `,
);
