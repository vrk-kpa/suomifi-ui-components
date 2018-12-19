import React from 'react';
import styled from '@emotion/styled';
import ReactSVG from 'react-svg';
import { ariaLabelOrHidden } from '../utils/aria';

export interface ISvgProps {
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
  testId?: string;
}

const Svg = styled(
  ({ color, labelName, ariaLabel, testId, ...props }: ISvgProps) => {
    return (
      <ReactSVG
        {...props}
        {...ariaLabelOrHidden(ariaLabel)}
        role="img"
        data-testid={testId}
      />
    );
  },
)`
  label: ${({ labelName }) => (!!labelName ? labelName : 'svg')};
  max-width: 100%;
  ${({ color }) => !!color && `fill: ${color};`}
`;

export default Svg;
