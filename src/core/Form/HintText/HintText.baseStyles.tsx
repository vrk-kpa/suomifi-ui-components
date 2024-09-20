import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { MarginProps, buildSpacingCSS } from '../../theme/utils/spacing';

export const baseStyles = (
  theme: SuomifiTheme,
  globalMargins?: MarginProps,
  propMargins?: MarginProps,
) => css`
  color: ${theme.colors.blackBase};
  ${font(theme)('bodyTextSmall')};
  ${buildSpacingCSS(globalMargins)}
  ${buildSpacingCSS(propMargins, true)}

  &.fi-hint-text {
    display: block;
  }
`;
