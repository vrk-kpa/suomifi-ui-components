import { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';
import { Omit, asPropType } from '../../utils/typescript';

export type hLevels = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

export interface HtmlHProps
  extends Omit<HTMLProps<HTMLHeadingElement>, 'ref' | 'as'> {
  as?: asPropType;
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

export const HtmlH = styled.h1<HtmlHProps>`
  ${hResets}
`;
