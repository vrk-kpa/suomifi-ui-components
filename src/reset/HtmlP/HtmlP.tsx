import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';
import { Omit } from '../../utils/typescript';

export interface HtmlPProps
  extends Omit<HTMLProps<HTMLParagraphElement>, 'ref' | 'as'> {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

const spanResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: block;
  max-width: 100%;
  word-wrap: normal;
  word-break: normal;
  white-space: normal;
`;

const Span = (props: HtmlPProps) => <p {...props} />;

export const HtmlP = styled(Span)`
  ${spanResets}
`;
