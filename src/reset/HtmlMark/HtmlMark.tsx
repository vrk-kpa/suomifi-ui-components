import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';

export interface HtmlMarkProps extends HTMLProps<HTMLElement> {}

const spanResets = css`
  ${resets.normalize.html}
  ${resets.common}
  display: inline;
  max-width: 100%;
  word-wrap: normal;
  word-break: normal;
  white-space: normal;
`;

const Mark = (props: HtmlMarkProps) => <mark {...props} />;

export const HtmlMark = styled(Mark)`
  ${spanResets}
`;
