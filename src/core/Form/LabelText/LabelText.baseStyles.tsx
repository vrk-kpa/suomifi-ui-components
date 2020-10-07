import { css } from 'styled-components';
import { LabelTextProps } from './LabelText';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { font } from '../../theme/reset';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & LabelTextProps) => css`
    &.fi-label-text {
      margin-bottom: ${theme.spacing.xs};
      ${font({ theme })('actionElementInnerTextBold')};
      color: ${theme.colors.blackBase};
    }
  `,
);
