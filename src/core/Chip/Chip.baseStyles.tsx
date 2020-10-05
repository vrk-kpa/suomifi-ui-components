import { css } from 'styled-components';
import { withSuomifiTheme, TokensAndTheme, SuomifiThemeProp } from '../theme';
import { element, font, focus } from '../theme/reset';
import { disabledCursor } from '../../components/utils/css';

const removableStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-chip--removable {
    & .fi-chip--content {
      max-width: 248px;
      margin-right: ${theme.spacing.xs};
    }
  }
`;

const disabledStyles = ({ theme }: SuomifiThemeProp) => css`
  &.fi-chip--disabled {
    &.fi-chip {
      ${disabledCursor}
      background: ${theme.colors.depthBase};
      &:hover,
      &:active {
        background: ${theme.colors.depthBase};
      }
    }
    & .fi-chip--icon {
      ${disabledCursor}
    }
  }
`;

export const baseStyles = withSuomifiTheme(
  ({ theme }: TokensAndTheme) => css`
    ${element({ theme })}
    ${font({ theme })('actionElementInnerTextBold')}
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
      max-height: 28px;
      display: inline-block;
    
      &.fi-chip--button{
        cursor: pointer;
        &:hover {
        background: ${theme.colors.highlightLight1};
        }

      &:active {
        background: ${theme.colors.highlightDark1};
        }
      }

    & .fi-chip--icon{
      height: 12px;
      width: 12px;
      transform: translateY(-0.35em);
    }

    & .fi-chip--content{
      display: inline-block;
      max-width: 270px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      line-height: 1.5em;
      vertical-align: center;
    }

    }
    ${removableStyles({ theme })};
    ${disabledStyles({ theme })};
  `,
);
