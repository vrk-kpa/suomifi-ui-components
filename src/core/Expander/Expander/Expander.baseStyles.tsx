import { css } from 'styled-components';
import { suomifiTheme } from '../../theme';
import { element, font } from '../../theme/reset';

export const baseStyles = css`
  ${element(suomifiTheme)}
  ${font(suomifiTheme)('bodyText')}
  background-color: ${suomifiTheme.colors.whiteBase};
  position: relative;
  padding: 0;
  border-radius: ${suomifiTheme.radius.basic};
  box-shadow: ${suomifiTheme.shadows.panelShadow};
  display: block;
  width: 100%;
  max-width: 100%;

  &:before {
    background-color: ${suomifiTheme.colors.highlightLight4};
    opacity: 0;
  }
`;
