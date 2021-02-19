import { css } from 'styled-components';
import { defaultThemeTokens as theme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = css`
  ${element({ theme })}
  ${font({ theme })('bodyText')}
    background-color: ${theme.colors.whiteBase};
  position: relative;
  padding: 0;
  border-radius: ${theme.radius.basic};
  box-shadow: ${theme.shadows.panelShadow};
  display: block;
  width: 100%;
  max-width: 100%;

  &:before {
    background-color: ${theme.colors.highlightLight4};
    opacity: 0;
  }
`;
