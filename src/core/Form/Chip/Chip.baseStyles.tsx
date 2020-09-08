import { css } from 'styled-components';
import {
  withSuomifiTheme,
  TokensAndTheme,
  SuomifiThemeProp,
} from '../../theme';
import { element, font, focus } from '../../theme/reset';

const removableStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-chip--removable {
    & .fi-chip--content {
      max-width: 248px;
      margin-right: ${theme.spacing.insetS};
    }
  }
`;

const disabledStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-chip--disabled {
    background: ${theme.colors.depthLight1};
    &:hover,
    &:active {
      background: ${theme.colors.depthLight1};
    }
  }
`;

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('bodyText')}
    ${focus({ theme })}

    &:focus{
      &:after {
      border-radius: 16px;
      }
    }

    &.fi-chip {
      border-radius: 14px;
      padding: ${theme.spacing.insetXxs} ${theme.spacing.insetL};
      color: ${theme.colors.whiteBase};
      background: ${theme.colors.highlightBase};
      cursor: pointer;
      font: ${theme.typography.actionElementInnerText};
      max-height: 28px;
      margin: 0 10px 15px 0; /* Vain demoa varten toistaiseksi */

       &:hover {
        background: ${theme.colors.highlightLight1};
      }

      &:active {
        background: ${theme.colors.highlightDark1};
      }

    & .fi-chip--icon{
      display: inline-block;
      height: 12px;
      transform: translateY(-0.35em);
    }

    & .fi-chip--content{
      display: inline-block;
      max-width: 270px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    }
    ${removableStyles({ theme })};
    ${disabledStyles({ theme })};
  `,
);
