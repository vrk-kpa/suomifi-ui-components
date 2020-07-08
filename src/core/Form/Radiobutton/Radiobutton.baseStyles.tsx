import { css } from 'styled-components';
import {
  withSuomifiTheme,
  TokensAndTheme,
  /* SuomifiThemeProp, */
} from '../../theme';
/* import { disabledCursor } from '../../../components/utils/css'; */
import { element, font } from '../../theme/reset';
/* import { focus } from '../../theme/utils/focus'; */

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}
  `,
);
