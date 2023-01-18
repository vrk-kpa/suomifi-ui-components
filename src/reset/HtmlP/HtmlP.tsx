import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';
import { asPropType } from '../../utils/typescript';

export interface HtmlPProps
  extends Omit<HTMLProps<HTMLParagraphElement>, 'ref' | 'as'> {
  as?: asPropType;
}

interface InnerRef {
  /** Forwarded ref object for the paragraph element */
  forwardedRef: React.Ref<HTMLParagraphElement>;
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

const Span = ({ forwardedRef, ...passProps }: HtmlPProps & InnerRef) => (
  <p ref={forwardedRef} {...passProps} />
);

export const HtmlP = styled(Span)`
  ${spanResets}
`;
