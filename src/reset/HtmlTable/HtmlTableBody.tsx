import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';

export interface HtmlTableBodyProps
  extends Omit<HTMLProps<HTMLTableSectionElement>, 'ref' | 'as' | 'children'> {
  forwardedRef?: React.Ref<HTMLTableSectionElement>;
  children?: React.ReactNode;
}

const TableBodyResets = css`
  ${resets.normalize.html}
  ${resets.common}
`;

const TableBody = ({ forwardedRef, ...passProps }: HtmlTableBodyProps) => (
  <tbody {...passProps} ref={forwardedRef} />
);

export const HtmlTableBody = styled(TableBody)`
  ${TableBodyResets}
`;
