import { css } from 'styled-components';
import { readableColor } from 'polished';
import { withSuomifiTheme, SuomifiThemeProp } from '../theme';
import { clearfix } from '../../utils/css/utils';
import { ColorProps } from './Colors';

export const baseStyles = withSuomifiTheme(
  ({ theme, color: colorProp }: SuomifiThemeProp & Partial<ColorProps>) => {
    const color = !!colorProp ? colorProp : theme.colors.blackBase;
    return css`
      ${theme.typography.bodyText}
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      float: left;
      width: 192px;
      height: 180px;
      max-width: 100%;
      padding: ${theme.spacing.s};
      color: ${readableColor(color)};
      background-color: ${color};
      border-bottom: 4px solid ${color};
      cursor: pointer;
      z-index: 2;

      &:hover {
        border-bottom-color: ${readableColor(color)};
      }

      .fi-color__name {
        position: relative;
        width: 100%;
        text-align: right;
        overflow-wrap: break-word;
        z-index: 3;
        pointer-events: none;

        &--hex {
          ${theme.typography.bodyTextSmallScreen}
          opacity: .4;
        }

        &--key {
          ${theme.typography.bodySemiBold}
        }
      }

      &:hover .fi-color__name--key {
        text-decoration: underline;
      }
    `;
  },
);

export const containerStyles = css`
  ${clearfix}
`;
