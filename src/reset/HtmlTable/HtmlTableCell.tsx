import React, { HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';
import {
  getColumnWidthStyles,
  ColumnWidthProps,
} from '../../core/Table/Table.baseStyles';

export interface HtmlTableCellProps
  extends Omit<HTMLProps<HTMLTableCellElement>, 'ref' | 'as' | 'children'>,
    ColumnWidthProps {
  forwardedRef?: React.Ref<HTMLTableCellElement>;
  children?: React.ReactNode;
}

const TableCellResets = css`
  ${resets.normalize.html}
  ${resets.common}
`;

const TableCell = ({
  forwardedRef,
  width,
  minWidth,
  maxWidth,
  ...passProps
}: HtmlTableCellProps) => <td {...passProps} ref={forwardedRef} />;

export const HtmlTableCell = styled(TableCell)`
  ${TableCellResets}
  ${({ width, minWidth, maxWidth }) => css`
    ${getColumnWidthStyles({
      width,
      minWidth,
      maxWidth,
    })}
  `}
`;
