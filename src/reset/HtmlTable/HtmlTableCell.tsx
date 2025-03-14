import React, { HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';

export interface HtmlTableCellProps
  extends Omit<HTMLProps<HTMLTableCellElement>, 'ref' | 'as' | 'children'> {
  forwardedRef?: React.Ref<HTMLTableCellElement>;
  children?: React.ReactNode;
}

const TableCellResets = css`
  ${resets.normalize.html}
  ${resets.common}
`;

const TableCell = ({ forwardedRef, ...passProps }: HtmlTableCellProps) => (
  <td {...passProps} ref={forwardedRef} />
);

export const HtmlTableCell = styled(TableCell)`
  ${TableCellResets}
`;
