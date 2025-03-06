import React, { forwardRef, useEffect, useState } from 'react';
import { styled } from 'styled-components';
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
  HtmlButton,
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
import {
  IconSort,
  IconSortDown,
  IconSortDownAlph,
  IconSortUp,
  IconSortUpAlph,
} from 'suomifi-icons';
import { getConditionalAriaProp } from '../../utils/aria';
import { Checkbox } from '../Form/Checkbox/Checkbox';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { RadioButton } from '../Form/RadioButton/RadioButton';
import { Block } from '../Block/Block';

const baseClassName = 'fi-table';

const tableClassNames = {
  table: `${baseClassName}_table`,
  thead: `${baseClassName}_thead`,
  tbody: `${baseClassName}_tbody`,
  th: `${baseClassName}_th`,
  tr: `${baseClassName}_tr`,
  td: `${baseClassName}_td`,
  tdAlignRight: `${baseClassName}_td--align-right`,
  tdAlignCenter: `${baseClassName}_td--align-center`,
  caption: `${baseClassName}_caption`,
  alternativeCaption: `${baseClassName}_caption--alternative`,
  toolbar: `${baseClassName}_toolbar`,
  condenseButtons: `${baseClassName}_condense-buttons`,
  condenseButton: `${baseClassName}_condense-button`,
  condensed: `${baseClassName}--condensed`,
  rowCountText: `${baseClassName}_row-count-text`,
  sortIcons: `${baseClassName}_sort-icons`,
  sortButton: `${baseClassName}_sort-button`,
  skeleton: `${baseClassName}_skeleton`,
  skeletonRow: `${baseClassName}_skeleton-row`,
  skeletonCell: `${baseClassName}_skeleton-cell`,
  skeletonContent: `${baseClassName}_skeleton-content`,
  selectionCellSkeleton: `${baseClassName}_selection-cell-skeleton`,
};

export interface TableColumn {
  key: string;
  labelText: string;
  textAlign?: 'left' | 'center' | 'right';
  sortable?: boolean;
  sortIcon?: 'alphabetical' | 'generic';
  className?: string;
}

// Infer the literal types from columns
export type TableRow<TColumns extends readonly TableColumn[]> = {
  [K in TColumns[number]['key']]:
    | string
    | number
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
} & { id: string; rowSelectionCheckboxLabel?: string };

export interface BaseTableProps<TColumns extends readonly TableColumn[]>
  extends MarginProps,
    HtmlTableProps {
  /**
   * HTML id attribute.
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Table columns and their configurations */
  columns: TColumns; // Use the generic type parameter for columns
  /**
   * Rows for the table. Each object must have an `id` property that is unique for the table
   * plus the key-value pairs that match the `key` properties of the columns.
   */
  data: TableRow<TColumns>[]; // Use the inferred type for data
  /** Condenses the padding of table cells */
  condensed?: boolean;
  /** Enables selection of rows via checkboxes
   * @default false
   */
  enableRowSelection?: boolean;
  /** Enables selection of a single row via a radiobutton */
  enableSingleRowSelection?: boolean;
  /** Callback fired when selected rows change */
  onSelectedRowsChange?: (selectedRowIds: string[]) => void;
  /** Controlled array */
  controlledSelectedRowIds?: string[];
  /** Function to give text to an aria-live region upon table sort */
  tableSortedAriaLiveText?: (
    columnLabel: string,
    direction: 'asc' | 'desc',
  ) => string;
  tableSortedCallback?: (
    columnLabel: string,
    direction: 'asc' | 'desc',
  ) => void;
  loading?: boolean;
  /** Ref object is placed to the main table element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLTableElement>;
}

type TableHeadingProps =
  | { caption: string; 'aria-labelledby'?: never }
  | {
      /** An accessible heading for the table. Required if no `aria-labelledby` is present */
      caption?: never;
      /** Required if no `caption` is present */
      'aria-labelledby': string;
    };

export type TableProps<TColumns extends readonly TableColumn[]> =
  BaseTableProps<TColumns> & TableHeadingProps;

type InternalTableProps<TColumns extends readonly TableColumn[]> =
  TableProps<TColumns> & GlobalMarginProps;

const BaseTable = <TColumns extends readonly TableColumn[]>(
  props: InternalTableProps<TColumns>,
) => {
  const {
    id,
    columns,
    data: propData,
    caption,
    condensed,
    enableRowSelection,
    enableSingleRowSelection,
    onSelectedRowsChange,
    tableSortedAriaLiveText,
    tableSortedCallback,
    loading,
    controlledSelectedRowIds,
    className,
    'aria-labelledby': ariaLabelledBy,
    globalMargins,
    ...rest
  } = props;
  const [_marginProps, passProps] = separateMarginProps(rest);

  const [data, setData] = useState(propData);
  const [sortColumn, setSortColumn] = useState('');
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>(
    controlledSelectedRowIds || [],
  );

  useEffect(() => {
    if (controlledSelectedRowIds !== undefined) {
      setSelectedRowIds(controlledSelectedRowIds);
    }
  }, [controlledSelectedRowIds]);

  useEffect(() => {
    setData(propData);
  }, [propData]);

  const sortData = (key: string) => {
    const sortedData = [...data].sort((a, b) => {
      const aValue = a[key as keyof TableRow<TColumns>];
      const bValue = b[key as keyof TableRow<TColumns>];

      const getTextContent = (element: React.ReactNode): string => {
        if (typeof element === 'string' || typeof element === 'number') {
          return element.toString();
        }
        if (React.isValidElement(element)) {
          const { children } = element.props;
          if (Array.isArray(children)) {
            return children.map(getTextContent).join('');
          }
          return getTextContent(children);
        }
        return '';
      };

      const aValueText = getTextContent(aValue);
      const bValueText = getTextContent(bValue);

      const isNumeric =
        !Number.isNaN(Number(aValueText)) && !Number.isNaN(Number(bValueText));

      if (isNumeric) {
        return !sortColumn.includes(key) || sortColumn === `${key}-desc`
          ? Number(aValueText) - Number(bValueText)
          : Number(bValueText) - Number(aValueText);
      }

      return !sortColumn.includes(key) || sortColumn === `${key}-desc`
        ? aValueText.localeCompare(bValueText)
        : bValueText.localeCompare(aValueText);
    });
    if (!!tableSortedCallback) {
      tableSortedCallback(
        key,
        !sortColumn.includes(key) || sortColumn === `${key}-desc`
          ? 'asc'
          : 'desc',
      );
    } else {
      setData(sortedData);
    }
    if (!sortColumn.includes(key) || sortColumn === `${key}-desc`) {
      setSortColumn(`${key}-asc`);
    } else {
      setSortColumn(`${key}-desc`);
    }
  };

  const handleRowSelection = (rowId: string, operation: 'add' | 'remove') => {
    let newSelectedRowIds = [];
    if (enableSingleRowSelection) {
      newSelectedRowIds = [rowId];
    } else {
      newSelectedRowIds =
        operation === 'add'
          ? [...selectedRowIds, rowId]
          : selectedRowIds.filter((rid) => rid !== rowId);
    }
    if (controlledSelectedRowIds === undefined) {
      setSelectedRowIds(newSelectedRowIds);
    }
    if (onSelectedRowsChange) {
      onSelectedRowsChange(newSelectedRowIds);
    }
  };

  const getSortColumnLabel = () =>
    columns.find((col) => sortColumn.includes(col.key))?.labelText || '';

  const getSortDirection = () => (sortColumn.endsWith('-asc') ? 'asc' : 'desc');

  return (
    <HtmlDiv className={classnames(baseClassName, className)}>
      <VisuallyHidden aria-live="polite">
        {sortColumn !== '' &&
          tableSortedAriaLiveText &&
          tableSortedAriaLiveText(getSortColumnLabel(), getSortDirection())}
      </VisuallyHidden>
      <HtmlTable
        className={classnames(tableClassNames.table, {
          [tableClassNames.condensed]: condensed,
        })}
        id={id}
        {...getConditionalAriaProp('aria-labelledby', [ariaLabelledBy])}
        aria-busy={loading}
        {...passProps}
      >
        {caption && (
          <HtmlTableCaption className={tableClassNames.caption}>
            {caption}
          </HtmlTableCaption>
        )}
        <HtmlTableHeader className={tableClassNames.thead}>
          <HtmlTableRow>
            {(enableRowSelection || enableSingleRowSelection) && (
              <HtmlTableCell className={classnames(tableClassNames.th)} />
            )}
            {columns.map((col) => (
              <HtmlTableHeaderCell
                scope="col"
                key={col.key}
                className={classnames(tableClassNames.th, col.className, {
                  [tableClassNames.tdAlignRight]: col.textAlign === 'right',
                  [tableClassNames.tdAlignCenter]: col.textAlign === 'center',
                })}
                aria-sort={
                  sortColumn === `${col.key}-asc`
                    ? 'ascending'
                    : sortColumn === `${col.key}-desc`
                    ? 'descending'
                    : undefined
                }
              >
                {col.sortable ? (
                  <HtmlButton
                    onClick={() => sortData(col.key)}
                    className={tableClassNames.sortButton}
                  >
                    {col.labelText}
                    {!sortColumn.includes(col.key) && <IconSort />}
                    {sortColumn === `${col.key}-asc` &&
                      col.sortIcon !== 'generic' && <IconSortDownAlph />}
                    {sortColumn === `${col.key}-desc` &&
                      col.sortIcon !== 'generic' && <IconSortUpAlph />}
                    {sortColumn === `${col.key}-asc` &&
                      col.sortIcon === 'generic' && <IconSortDown />}
                    {sortColumn === `${col.key}-desc` &&
                      col.sortIcon === 'generic' && <IconSortUp />}
                  </HtmlButton>
                ) : (
                  col.labelText
                )}
              </HtmlTableHeaderCell>
            ))}
          </HtmlTableRow>
        </HtmlTableHeader>
        <HtmlTableBody className={tableClassNames.tbody}>
          {loading
            ? [0, 1, 2, 3, 4].map((val) => (
                <HtmlTableRow
                  key={`loading-row-${val}}`}
                  className={tableClassNames.skeletonRow}
                  aria-hidden="true"
                >
                  {(enableRowSelection || enableSingleRowSelection) && (
                    <HtmlTableCell
                      className={classnames(
                        tableClassNames.skeletonCell,
                        tableClassNames.selectionCellSkeleton,
                      )}
                    >
                      <Block
                        className={classnames(
                          tableClassNames.skeleton,
                          tableClassNames.skeletonContent,
                        )}
                      />
                    </HtmlTableCell>
                  )}
                  {columns.map((col) => (
                    <HtmlTableCell
                      key={`loading-cell-${col.key}`}
                      className={tableClassNames.skeletonCell}
                    >
                      <Block
                        className={classnames(
                          tableClassNames.skeleton,
                          tableClassNames.skeletonContent,
                        )}
                      />
                    </HtmlTableCell>
                  ))}
                </HtmlTableRow>
              ))
            : data.map((row) => (
                <HtmlTableRow
                  key={row.id}
                  className={classnames(tableClassNames.tr, {
                    highlighted: selectedRowIds.includes(row.id),
                  })}
                >
                  {enableRowSelection && (
                    <HtmlTableCell className={classnames(tableClassNames.td)}>
                      <Checkbox
                        checked={selectedRowIds.includes(row.id)}
                        onClick={(checkedVal) =>
                          handleRowSelection(
                            row.id,
                            checkedVal.checkboxState ? 'add' : 'remove',
                          )
                        }
                      >
                        <VisuallyHidden>
                          {row.rowSelectionCheckboxLabel}
                        </VisuallyHidden>
                      </Checkbox>
                    </HtmlTableCell>
                  )}
                  {enableSingleRowSelection && (
                    <HtmlTableCell className={classnames(tableClassNames.td)}>
                      <RadioButton
                        value={`radiobutton-${row.id}`}
                        checked={selectedRowIds.includes(row.id)}
                        onChange={(newValue) =>
                          handleRowSelection(
                            row.id,
                            newValue ? 'add' : 'remove',
                          )
                        }
                      >
                        <VisuallyHidden>
                          {row.rowSelectionCheckboxLabel}
                        </VisuallyHidden>
                      </RadioButton>
                    </HtmlTableCell>
                  )}
                  {columns.map((col) => (
                    <HtmlTableCell
                      key={`${row.id}-${col.key}`}
                      className={classnames(tableClassNames.td, col.className, {
                        [tableClassNames.tdAlignRight]:
                          col.textAlign === 'right',
                        [tableClassNames.tdAlignCenter]:
                          col.textAlign === 'center',
                      })}
                    >
                      {row[col.key as keyof TableRow<TColumns>]}
                    </HtmlTableCell>
                  ))}
                </HtmlTableRow>
              ))}
        </HtmlTableBody>
      </HtmlTable>
    </HtmlDiv>
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
