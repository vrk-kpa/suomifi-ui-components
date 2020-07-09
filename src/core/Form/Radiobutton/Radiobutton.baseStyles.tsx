import { css } from 'styled-components';
import {
  withSuomifiTheme,
  TokensAndTheme,
  /* SuomifiThemeProp, */
} from '../../theme';
/* import { disabledCursor } from '../../../components/utils/css'; */
import { element, font } from '../../theme/reset';
import { focus } from '../../theme/utils/focus';

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}


& .fi-radiobutton {
      &_input {
        opacity: 0;

        + label {
          position: relative;
          display: inline-block;
          cursor: pointer;

          &::before {
            content: '';
            position: absolute;
            display: inline-block;
            left: -25px;
            top: -1px;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            border: 1px solid ${theme.colors.depthBase};
            background: transparent;
          }

          &::after {
            content: '';
            position: absolute;
            display: inline-block;
            left: -20px;
            top: 4px;
            border-radius: 50%;
            width: 8px;
            height: 8px;
          }
        }

        &:checked {
          + label:before {
            border: 1px solid ${theme.colors.highlightBase};
          }

          + label:after {
            background: ${theme.colors.highlightBase};
          }
        }

        &:focus {
          + label::before {
            ${focus({ theme, noPseudo: true, variant: 'boxShadow' })}
            border-radius: 50%;
          }
        }
      }
    }
  `,
);
