import React from 'react';
import { default as styled } from 'styled-components';
import ReactSVG from 'react-svg';
import { ariaLabelOrHidden } from '../utils/aria';

export interface SvgProps {
  /** Image file */
  src: string;
  /** Fill-color */
  color?: string;
  /** Aria-label for SVG, undefined hides SVG from screen reader
   * @default undefined
   */
  ariaLabel?: string;
  /** Custom classname to extend or customize */
  className?: string;
  /** Custom classname to SVG-element extend or customize */
  svgClassName?: string;
  /** Show mouse cursor as hand-pointer */
  mousePointer?: boolean;
  testId?: string;
  /** Allow passing custom attributes */
  [key: string]: any;
}

export const Svg = styled(
  ({ color, ariaLabel, testId, mousePointer, ...passProps }: SvgProps) => {
    const fill = !!color ? color : '';
    const pointerStyle = !!mousePointer ? { cursor: 'pointer' } : {};
    return (
      <ReactSVG
        {...passProps}
        {...ariaLabelOrHidden(ariaLabel)}
        svgStyle={{
          fill,
          maxWidth: '100%',
          maxHeight: '100%',
          ...pointerStyle,
        }}
        role="img"
        data-testid={testId}
      />
    );
  },
)`
  max-width: 100%;
  ${({ mousePointer }) => !!mousePointer && ' * { cursor: pointer; }'}
`;
