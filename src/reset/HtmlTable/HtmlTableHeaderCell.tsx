import React, { HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';

export interface HtmlTableHeaderCellProps
  extends Omit<HTMLProps<HTMLTableCellElement>, 'ref' | 'as' | 'children'> {
  forwardedRef?: React.Ref<HTMLTableCellElement>;
  children?: React.ReactNode;
}

const TableHeaderCellResets = css`
  ${resets.normalize.html}
  ${resets.common}
`;

const TableHeaderCell = ({
  forwardedRef,
  ...passProps
}: HtmlTableHeaderCellProps) => <th {...passProps} ref={forwardedRef} />;

export const HtmlTableHeaderCell = styled(TableHeaderCell)`
  ${TableHeaderCellResets}
`;
