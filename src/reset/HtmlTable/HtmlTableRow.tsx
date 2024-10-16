import React, { HTMLProps } from 'react';
import { default as styled, css } from 'styled-components';
import { resets } from '../utils';

export interface HtmlTableRowProps
  extends Omit<HTMLProps<HTMLTableRowElement>, 'ref' | 'as' | 'children'> {
  forwardedRef?: React.Ref<HTMLTableRowElement>;
  children?: React.ReactNode;
}

const TableRowResets = css`
  ${resets.normalize.html}
  ${resets.common}
`;

const TableRow = ({ forwardedRef, ...passProps }: HtmlTableRowProps) => (
  <tr {...passProps} ref={forwardedRef} />
);

export const HtmlTableRow = styled(TableRow)`
  ${TableRowResets}
`;
