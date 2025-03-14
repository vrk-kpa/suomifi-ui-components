import { HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';

export interface HtmlMarkProps extends HTMLProps<HTMLElement> {}

const markResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: inline;
  max-width: 100%;
  word-wrap: normal;
  word-break: normal;
  white-space: normal;
`;

export const HtmlMark = styled.mark<HtmlMarkProps>`
  ${markResets}
`;
