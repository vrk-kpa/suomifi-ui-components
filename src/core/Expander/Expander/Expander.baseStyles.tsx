import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = (theme: SuomifiTheme) => css`
  ${element(theme)}
  ${font(theme)('bodyText')}
  background-color: ${theme.colors.whiteBase};
  position: relative;
  padding: 0;
  border-radius: ${theme.radiuses.basic};
  box-shadow: ${theme.shadows.panelShadow};
  width: 100%;
  max-width: 100%;

  &.fi-expander {
    display: block;
  }
  &:before {
    background-color: ${theme.colors.highlightLight4};
    opacity: 0;
  }
`;
