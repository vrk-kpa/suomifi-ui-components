import React, { forwardRef, useState } from 'react';
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
import {
  IconArrowheadDown,
  IconArrowheadUp,
  IconMenu,
  IconRows,
} from 'suomifi-icons';

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
};

export interface TableColumn {
  key: string;
  labelText: string;
  textAlign?: 'left' | 'center' | 'right';
  sortable?: boolean;
}

// Infer the literal types from columns
export type TableRow<TColumns extends readonly TableColumn[]> = {
  [K in TColumns[number]['key']]:
    | string
    | number
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>;
} & { id: string };

export interface BaseTableProps<TColumns extends readonly TableColumn[]>
  extends MarginProps,
    HtmlTableProps {
  /**
   * HTML id attribute.
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Used as an accessible heading for the table */
  caption: string;
  /** Table columns and their configurations */
  columns: TColumns; // Use the generic type parameter for columns
  /**
   * Rows for the table. Each object must have an `id` property that is unique for the table
   * plus the key-value pairs that match the `key` properties of the columns.
   */
  data: TableRow<TColumns>[]; // Use the inferred type for data
  /** Condenses the padding of table cells */
  condensed?: boolean;
  /** Function which parses a text above the table indicating the amount of its rows */
  rowCounterTextFunction?: (rowCount: number) => string;
  /** Ref object is placed to the main table element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLTableElement>;
}

type CondenseButtonProps =
  | {
      showCondenseButtons?: false;
      expandButtonAriaLabel?: never;
      condenseButtonAriaLabel?: never;
    }
  | {
      /** Shows condense/expand buttons in a toolbar above the table */
      showCondenseButtons?: true;
      /** Aria label for the expand button */
      expandButtonAriaLabel: string;
      /** Aria label for the condense button */
      condenseButtonAriaLabel: string;
    };

export type TableProps<TColumns extends readonly TableColumn[]> =
  BaseTableProps<TColumns> & CondenseButtonProps;

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
    condensed: propCondensed,
    showCondenseButtons,
    condenseButtonAriaLabel,
    expandButtonAriaLabel,
    rowCounterTextFunction,
    className,
    'aria-labelledby': ariaLabelledBy,
    globalMargins,
    ...rest
  } = props;
  const [_marginProps, passProps] = separateMarginProps(rest);

  const alternativeCaptionId = `${id}-caption`;

  const [data, setData] = useState(propData);
  const [condensed, setCondensed] = useState(propCondensed || false);
  const [sortColumn, setSortColumn] = useState('');

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

      return !sortColumn.includes(key) || sortColumn === `${key}-desc`
        ? aValueText.localeCompare(bValueText)
        : bValueText.localeCompare(aValueText);
    });
    setData(sortedData);
    console.log(sortColumn);
    if (!sortColumn.includes(key) || sortColumn === `${key}-desc`) {
      setSortColumn(`${key}-asc`);
    } else {
      setSortColumn(`${key}-desc`);
    }
  };

  return (
    <HtmlDiv className={classnames(baseClassName, className)}>
      {rowCounterTextFunction && (
        <HtmlDiv
          className={tableClassNames.alternativeCaption}
          id={alternativeCaptionId}
        >
          {caption}
        </HtmlDiv>
      )}
      <HtmlDiv className={tableClassNames.toolbar}>
        {showCondenseButtons && !rowCounterTextFunction && (
          <HtmlDiv
            className={tableClassNames.alternativeCaption}
            id={alternativeCaptionId}
          >
            {caption}
          </HtmlDiv>
        )}
        {rowCounterTextFunction && (
          <HtmlDiv className={tableClassNames.rowCountText}>
            {rowCounterTextFunction(data.length)}
          </HtmlDiv>
        )}
        {showCondenseButtons && (
          <HtmlDiv className={tableClassNames.condenseButtons}>
            <Button
              variant="secondary"
              icon={<IconMenu />}
              aria-label={condenseButtonAriaLabel}
              className={classnames(tableClassNames.condenseButton, {
                toggled: condensed,
              })}
              onClick={() => setCondensed(true)}
            />
            <Button
              variant="secondary"
              icon={<IconRows />}
              aria-label={expandButtonAriaLabel}
              className={classnames({
                toggled: !condensed,
              })}
              onClick={() => setCondensed(false)}
            />
          </HtmlDiv>
        )}
      </HtmlDiv>
      <HtmlTable
        className={classnames(tableClassNames.table, {
          [tableClassNames.condensed]: condensed,
        })}
        id={id}
        aria-labelledby={
          ariaLabelledBy ||
          (showCondenseButtons || rowCounterTextFunction
            ? alternativeCaptionId
            : undefined)
        }
        {...passProps}
      >
        {!showCondenseButtons && !rowCounterTextFunction && (
          <HtmlTableCaption className={tableClassNames.caption}>
            {caption}
          </HtmlTableCaption>
        )}
        <HtmlTableHeader className={tableClassNames.thead}>
          <HtmlTableRow>
            {columns.map((col) => (
              <HtmlTableHeaderCell
                scope="col"
                key={col.key}
                className={classnames(tableClassNames.th, {
                  [tableClassNames.tdAlignRight]: col.textAlign === 'right',
                  [tableClassNames.tdAlignCenter]: col.textAlign === 'center',
                  sortable: col.sortable,
                })}
                onClick={col.sortable ? () => sortData(col.key) : undefined}
              >
                {col.labelText}
                {col.sortable && (
                  <HtmlDiv className={tableClassNames.sortIcons}>
                    <IconArrowheadUp
                      className={classnames({
                        highlighted: sortColumn === `${col.key}-desc`,
                      })}
                    />
                    <IconArrowheadDown
                      className={classnames({
                        highlighted: sortColumn === `${col.key}-asc`,
                      })}
                    />
                  </HtmlDiv>
                )}
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
                    // ['highlighted']: sortColumn.includes(col.key),
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
