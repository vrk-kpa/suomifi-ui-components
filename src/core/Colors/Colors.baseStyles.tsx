import { css } from 'styled-components';
import { readableColor } from 'polished';
import { suomifiTheme } from '../theme';
import { ColorProps } from './Colors';

export const baseStyles = ({ color: colorProp }: Partial<ColorProps>) => {
  const color = !!colorProp ? colorProp : suomifiTheme.colors.blackBase;
  return css`
    ${suomifiTheme.typography.bodyText}
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    float: left;
    width: 208px;
    height: 196px;
    max-width: 100%;
    color: ${readableColor(color)};
    border-bottom: 4px solid ${color};
    cursor: pointer;
    z-index: 2;
    position: relative;
    margin: 0;

    &:hover {
      border-bottom-color: ${readableColor(color)};
    }

    figcaption {
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      position: absolute;
      left: ${suomifiTheme.spacing.insetM};
      bottom: ${suomifiTheme.spacing.insetM};
    }

    svg {
      width: 100%;
      height: 100%;

      rect {
        width: 100%;
        height: 100%;
      }
    }

    .fi-color_name {
      position: relative;
      width: 100%;
      text-align: right;
      overflow-wrap: break-word;
      z-index: 3;
      pointer-events: none;

      &--hex {
        ${suomifiTheme.typography.bodyTextSmall}
        opacity: .4;
      }

      &--key {
        ${suomifiTheme.typography.bodySemiBold}
      }
    }

    &:hover .fi-color_name--key {
      text-decoration: underline;
    }
  `;
};

export const containerStyles = css`
  &:after {
    display: block;
    content: '';
    clear: both;
  }
`;
