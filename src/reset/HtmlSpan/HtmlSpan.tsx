import React, { HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';
import { asPropType } from '../../utils/typescript';

export interface HtmlSpanProps
  extends Omit<HTMLProps<HTMLSpanElement>, 'ref' | 'as'> {
  asProp?: asPropType;
}
interface HtmlSpanWithRefProps extends HtmlSpanProps {
  /** Ref object for the span element */
  forwardedRef?: React.Ref<HTMLSpanElement>;
}

const spanResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: inline;
  max-width: 100%;
  word-wrap: normal;
  word-break: normal;
  white-space: normal;
`;

const Span = ({
  forwardedRef,
  asProp: Component = 'span',
  ...passProps
}: HtmlSpanWithRefProps) => <Component ref={forwardedRef} {...passProps} />;
export const HtmlSpan = styled(Span)`
  ${spanResets}
`;
