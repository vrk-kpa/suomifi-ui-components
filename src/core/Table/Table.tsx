import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
  GlobalMargins,
} from '../theme/utils/spacing';
import { baseStyles } from './Table.baseStyles';
import { filterDuplicateKeys } from '../../utils/common/common';
import { AutoId } from '../utils/AutoId/AutoId';
import {
  HtmlDiv,
  HtmlTable,
  HtmlTableBody,
  HtmlTableCaption,
  HtmlTableCell,
  HtmlTableHeader,
  HtmlTableHeaderCell,
  HtmlTableProps,
  HtmlTableRow,
} from '../../reset';
import { Button } from '../Button/Button';

const baseClassName = 'fi-table';

const tableClassNames = {
  thead: `${baseClassName}_thead`,
  tbody: `${baseClassName}_tbody`,
  th: `${baseClassName}_th`,
  tr: `${baseClassName}_tr`,
  td: `${baseClassName}_td`,
  tdAlignRight: `${baseClassName}_td--align-right`,
  tdAlignCenter: `${baseClassName}_td--align-center`,
  caption: `${baseClassName}_caption`,
  toolbar: `${baseClassName}_toolbar`,
  condenseButtons: `${baseClassName}_condense-buttons`,
  condensed: `${baseClassName}--condensed`,
};

export interface TableColumn {
  key: string;
  labelText: string;
  textAlign?: 'left' | 'center' | 'right';
}

// Infer the literal types from columns
export type TableRow<TColumns extends readonly TableColumn[]> = {
  [K in TColumns[number]['key']]:
    | string
    | number
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
} & { id: string };

export interface TableProps<TColumns extends readonly TableColumn[]>
  extends MarginProps,
    HtmlTableProps {
  /**
   * HTML id attribute.
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Used as an accessible heading for the table */
  caption?: string;
  /** Table columns and their configurations */
  columns: TColumns; // Use the generic type parameter for columns
  /**
   * Rows for the table. Each object must have an `id` property that is unique for the table
   * plus the key-value pairs that match the `key` properties of the columns.
   */
  data: TableRow<TColumns>[]; // Use the inferred type for data
  /** Condenses the padding of table cells */
  condensed?: boolean;
  /** Ref object is placed to the main table element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLTableElement>;
}

type InternalTableProps<TColumns extends readonly TableColumn[]> =
  TableProps<TColumns> & GlobalMarginProps;

const BaseTable = <TColumns extends readonly TableColumn[]>(
  props: InternalTableProps<TColumns>,
) => {
  const {
    columns,
    data,
    caption,
    condensed,
    className,
    globalMargins,
    ...rest
  } = props;
  const [_marginProps, passProps] = separateMarginProps(rest);

  return (
    <>
      <HtmlDiv className={tableClassNames.toolbar}>
        <HtmlDiv className={tableClassNames.condenseButtons}>
          <Button variant="secondary">Condense</Button>
        </HtmlDiv>
      </HtmlDiv>
      <HtmlTable
        className={classnames(baseClassName, className, {
          [tableClassNames.condensed]: condensed,
        })}
        {...passProps}
      >
        <HtmlTableCaption className={tableClassNames.caption}>
          {caption}
        </HtmlTableCaption>
        <HtmlTableHeader className={tableClassNames.thead}>
          <HtmlTableRow>
            {columns.map((col) => (
              <HtmlTableHeaderCell
                key={col.key}
                className={classnames(tableClassNames.th, {
                  [tableClassNames.tdAlignRight]: col.textAlign === 'right',
                  [tableClassNames.tdAlignCenter]: col.textAlign === 'center',
                })}
              >
                {col.labelText}
              </HtmlTableHeaderCell>
            ))}
          </HtmlTableRow>
        </HtmlTableHeader>
        <HtmlTableBody className={tableClassNames.tbody}>
          {data.map((row) => (
            <HtmlTableRow key={row.id} className={tableClassNames.tr}>
              {columns.map((col) => (
                <HtmlTableCell
                  key={`${row.id}-${row[col.key as keyof TableRow<TColumns>]}`}
                  className={classnames(tableClassNames.td, {
                    [tableClassNames.tdAlignRight]: col.textAlign === 'right',
                    [tableClassNames.tdAlignCenter]: col.textAlign === 'center',
                  })}
                >
                  {row[col.key as keyof TableRow<TColumns>]}
                </HtmlTableCell>
              ))}
            </HtmlTableRow>
          ))}
        </HtmlTableBody>
      </HtmlTable>
    </>
  );
};

const StyledTable = styled(
  <TColumns extends readonly TableColumn[]>({
    theme,
    ...passProps
  }: TableProps<TColumns> &
    SuomifiThemeProp & { globalMargins: GlobalMargins }) => (
    <BaseTable {...passProps} />
  ),
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.table,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const Table = forwardRef<HTMLTableElement, TableProps<readonly TableColumn[]>>(
  (
    props: TableProps<readonly TableColumn[]>,
    ref: React.Ref<HTMLTableElement>,
  ) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledTable
                    theme={suomifiTheme}
                    id={id}
                    forwardedRef={ref}
                    globalMargins={margins}
                    {...passProps}
                  />
                )}
              </AutoId>
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

Table.displayName = 'Table';
export { Table };
