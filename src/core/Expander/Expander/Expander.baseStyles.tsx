import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme } from '../../theme';
import { element, font } from '../../theme/reset';

import { ExpanderProps } from './Expander';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme & Partial<ExpanderProps>) => {
    return css`
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
  },
);
