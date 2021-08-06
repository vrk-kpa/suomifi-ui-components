import { css } from 'styled-components';
import { readableColor } from 'polished';
import { SuomifiTheme } from '../../core/theme';
import { ColorProps } from './Colors';

export const baseStyles = ({
  color: colorProp,
  theme,
}: Partial<ColorProps> & { theme: SuomifiTheme }) => {
  const color = !!colorProp ? colorProp : theme.colors.blackBase;
  return css`
    ${theme.typography.bodyText}
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
      left: ${theme.spacing.insetM};
      bottom: ${theme.spacing.insetM};
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
        ${theme.typography.bodyTextSmall}
        opacity: .4;
      }

      &--key {
        ${theme.typography.bodySemiBold}
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
