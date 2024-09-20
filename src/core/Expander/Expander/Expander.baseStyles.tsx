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
  background-color: ${theme.colors.whiteBase};
  position: relative;
  padding: 0;
  border: 1px solid ${theme.colors.highlightBase};
  border-radius: ${theme.radiuses.basic};
  width: 100%;
  max-width: 100%;

  &.fi-expander {
    display: block;
  }
  &:before {
    background-color: ${theme.colors.highlightLight4};
    opacity: 0;
  }

  &.fi-expander--open {
    border-bottom: none;
  }
`;
