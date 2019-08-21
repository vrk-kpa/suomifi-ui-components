import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';
import { Omit } from '../../utils/typescript';

export interface HtmlDivProps
  extends Omit<HTMLProps<HTMLDivElement>, 'ref' | 'as'> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

const divResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: block;
  max-width: 100%;
  word-wrap: normal;
  word-break: normal;
  white-space: normal;
`;

const Div = (props: HtmlDivProps) => <div {...props} />;

export const HtmlDiv = styled(Div)`
  ${divResets}
`;
