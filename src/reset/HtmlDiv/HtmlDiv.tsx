import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';
import { asPropType } from '../../utils/typescript';

export interface HtmlDivProps
  extends Omit<HTMLProps<HTMLDivElement>, 'ref' | 'as'> {
  as?: asPropType;
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

export interface HtmlDivWithRefProps extends HtmlDivProps {
  /** Ref object for the input element */
  forwardedRef?: React.Ref<HTMLDivElement>;
}

const DivWithRef = ({ forwardedRef, ...passProps }: HtmlDivWithRefProps) => (
  <div ref={forwardedRef} {...passProps} />
);

export const HtmlDivWithRef = styled(DivWithRef)`
  ${divResets}
`;
