import React, { useEffect } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { HtmlButton } from '../../../../../reset';
import { InternalDatePickerTextProps } from '../../datePickerTexts';
import { baseStyles } from './MonthTable.baseStyles';
import {
  daysMatch,
  weekRows,
  WeekRowDate,
  cellDateAriaLabel,
} from '../../dateUtils';

const baseClassName = 'fi-month-table';

export const monthClassNames = {
  baseClassName,
  cell: `${baseClassName}_cell`,
  cellDisabled: `${baseClassName}_cell--disabled`,
  cellCurrent: `${baseClassName}_cell--current`,
  date: `${baseClassName}_date-button`,
  dateCurrent: `${baseClassName}_date-button--current`,
  dateSelected: `${baseClassName}_date-button--selected`,
};

export interface MonthTableProps {
  /** Styled component className */
  className?: string;
  /** Callback for date select  */
  onSelect: (date: Date) => void;
  /** Callback for keydown events */
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  /** Button ref for focusing date */
  dayButtonRef: React.RefObject<any>;
  /** Texts for date picker  */
  texts: InternalDatePickerTextProps;
  /** Day that will have focus in calendar */
  focusableDate: Date;
  /** Day that is focused in calendar */
  focusedDate: Date | null;
  /** Day that is set as selected */
  selectedDate: Date | null;
}

export const BaseMonthTable = (props: MonthTableProps) => {
  const {
    className,
    onSelect,
    onKeyDown,
    dayButtonRef,
    focusableDate,
    focusedDate,
    selectedDate,
    texts,
  } = props;

  const isSelectedDate = (date: WeekRowDate): boolean =>
    !!selectedDate && daysMatch(selectedDate, date.date);

  const isFocusedDate = (date: WeekRowDate): boolean =>
    !!focusedDate && daysMatch(focusedDate, date.date);

  const isFocusableDate = (date: WeekRowDate): boolean =>
    daysMatch(focusableDate, date.date);

  useEffect(() => {
    dayButtonRef?.current?.focus();
  }, [focusedDate]);

  return (
    <table className={classnames(className, baseClassName)} role="presentation">
      <thead>
        <tr>
          {texts.weekDayAbbreviations.map((day: string, index: number) => (
            <td
              // eslint-disable-next-line react/no-array-index-key
              key={`${day}${index}`}
              className={monthClassNames.cell}
            >
              {day}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {weekRows(focusableDate).map((weekRow: WeekRowDate[]) => (
          <tr key={weekRow[0].date.toString()}>
            {weekRow.map((date: WeekRowDate) => (
              <td
                key={date.date.toString()}
                className={classnames(monthClassNames.cell, {
                  [monthClassNames.cellDisabled]: date.disabled,
                })}
              >
                {date.disabled ? (
                  <div
                    className={classnames({
                      [monthClassNames.cellCurrent]: date.current,
                    })}
                  >
                    {date.number}
                  </div>
                ) : (
                  <HtmlButton
                    onClick={() => onSelect(date.date)}
                    onKeyDown={onKeyDown}
                    className={classnames(monthClassNames.date, {
                      [monthClassNames.dateSelected]: isSelectedDate(date),
                    })}
                    tabIndex={isFocusableDate(date) ? undefined : -1}
                    forwardedRef={
                      isFocusedDate(date) ? dayButtonRef : undefined
                    }
                    aria-label={`${
                      isSelectedDate(date) ? `${texts.selectedDateLabel} ` : ''
                    }${cellDateAriaLabel(date.date, texts)}`}
                    aria-current={date.current ? 'date' : undefined}
                  >
                    <div
                      className={classnames({
                        [monthClassNames.dateCurrent]: date.current,
                      })}
                    >
                      {date.number}
                    </div>
                  </HtmlButton>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const StyledMonthTable = styled(
  ({ theme, ...passProps }: MonthTableProps & SuomifiThemeProp) => (
    <BaseMonthTable {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const MonthTable = (props: MonthTableProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => <StyledMonthTable theme={suomifiTheme} {...props} />}
  </SuomifiThemeConsumer>
);

MonthTable.displayName = 'MonthTable';
export { MonthTable };
