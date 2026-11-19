import React, { HTMLProps } from 'react';
import { styled, css } from 'styled-components';
import { resets } from '../utils';
import {
  getColumnWidthStyles,
  ColumnWidthProps,
} from '../../core/Table/Table.baseStyles';

export interface HtmlTableHeaderCellProps
  extends Omit<HTMLProps<HTMLTableCellElement>, 'ref' | 'as' | 'children'>,
    ColumnWidthProps {
  forwardedRef?: React.Ref<HTMLTableCellElement>;
  children?: React.ReactNode;
}

const TableHeaderCellResets = css`
  ${resets.normalize.html}
  ${resets.common}
`;

const TableHeaderCell = ({
  forwardedRef,
  width,
  minWidth,
  maxWidth,
  ...passProps
}: HtmlTableHeaderCellProps) => <th {...passProps} ref={forwardedRef} />;

export const HtmlTableHeaderCell = styled(TableHeaderCell)`
  ${TableHeaderCellResets}
  ${({ width, minWidth, maxWidth }) => css`
    ${getColumnWidthStyles({
      width,
      minWidth,
      maxWidth,
    })}
  `}
`;

HtmlTableHeaderCell.displayName = 'HtmlTableHeaderCell';
