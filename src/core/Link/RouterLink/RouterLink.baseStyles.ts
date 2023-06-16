import { css } from 'styled-components';
import { SuomifiTheme } from '../../theme';
import { font } from '../../theme/reset';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';

export const RouterLinkStyles = (theme: SuomifiTheme) => css`
  ${baseStyles(theme)}
  ${font(theme)('bodyText')}
`;
