import React, { HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';
import { asPropType } from '../../utils/typescript';

export type hLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export interface HtmlHProps
  extends Omit<HTMLProps<HTMLHeadingElement>, 'ref' | 'as'> {
  as?: asPropType;
}

export interface HtmlHWithRefProps extends HtmlHProps {
  /** Ref object for the heading element */
  forwardedRef?: React.RefObject<HTMLHeadingElement>;
}

const hResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: block;
  max-width: 100%;
  word-wrap: normal;
  word-break: normal;
  white-space: normal;
`;

const StyledHtmlH = styled.h1<HtmlHWithRefProps>`
  ${hResets}
`;

export const HtmlH = ({
  forwardedRef,
  children,
  ...passProps
}: HtmlHWithRefProps) => (
  <StyledHtmlH ref={forwardedRef} {...passProps}>
    {children}
  </StyledHtmlH>
);
