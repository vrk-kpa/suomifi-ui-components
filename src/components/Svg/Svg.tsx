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
  testId?: string;
}

export const Svg = styled(
  ({ color, labelName, ariaLabel, testId, ...props }: SvgProps) => {
    const fill = !!color ? color : '';
    return (
      <ReactSVG
        {...props}
        {...ariaLabelOrHidden(ariaLabel)}
        svgStyle={{ fill, maxWidth: '100%', maxHeight: '100%' }}
        role="img"
        data-testid={testId}
      />
    );
  },
)`
  label: ${({ labelName }) => (!!labelName ? labelName : 'svg')};
  max-width: 100%;
`;
