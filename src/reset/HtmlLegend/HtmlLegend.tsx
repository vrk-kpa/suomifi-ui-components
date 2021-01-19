import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';
import { Omit, asPropType } from '../../utils/typescript';

export interface HtmlLegendProps
  extends Omit<HTMLProps<HTMLLegendElement>, 'ref' | 'as'> {
  as?: asPropType;
  for?: string;
}

const legendResets = css`
  ${resets.normalize.html}
  ${resets.common}
  max-width: 100%;
`;

const Legend = (props: HtmlLegendProps) => <legend {...props} />;

export const HtmlLegend = styled(Legend)`
  ${legendResets}
`;
