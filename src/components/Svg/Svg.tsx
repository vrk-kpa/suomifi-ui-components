import React from 'react';
import styled from '@emotion/styled';
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
  labelName?: string;
  /** Custom classname to extend or customize */
  className?: string;
  /** Custom classname to SVG-element extend or customize */
  svgClassName?: string;
  /** Show mouse cursor as hand-pointer */
  pointer?: boolean;
  testId?: string;
}

export const Svg = styled(
  ({ color, labelName, ariaLabel, testId, pointer, ...props }: SvgProps) => {
    const fill = !!color ? color : '';
    const pointerStyle = !!pointer ? { cursor: 'pointer' } : {};
    return (
      <ReactSVG
        {...props}
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
  label: ${({ labelName }) => (!!labelName ? labelName : 'svg')};
  max-width: 100%;
  ${({ pointer }) => !!pointer && ' * { cursor: pointer; }'}
`;
