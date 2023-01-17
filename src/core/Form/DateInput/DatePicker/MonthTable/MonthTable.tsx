import React from 'react';
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
  /** Texts for date picker  */
  texts: InternalDatePickerTextProps;
  /** Day that is focused in calendar */
  focusedDate: Date;
  /** Day that is set as selected */
  selectedDate: Date | null;
}

export const BaseMonthTable = (props: MonthTableProps) => {
  const { className, onSelect, focusedDate, selectedDate, texts } = props;

  const isSelectedDate = (date: WeekRowDate): boolean =>
    !!selectedDate && daysMatch(selectedDate, date.date);

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
        {weekRows(focusedDate).map((weekRow: WeekRowDate[]) => (
          <tr key={weekRow[0].date.toString()}>
            {weekRow.map((date: WeekRowDate) => (
              <td
                key={date.date.toString()}
                className={classnames(monthClassNames.cell, {
                  [monthClassNames.cellDisabled]: date.disabled,
                })}
              >
                {date.disabled ? (
                  <span
                    className={classnames({
                      [monthClassNames.cellCurrent]: date.current,
                    })}
                  >
                    {date.number}
                  </span>
                ) : (
                  <HtmlButton
                    onClick={() => onSelect(date.date)}
                    className={classnames(monthClassNames.date, {
                      [monthClassNames.dateSelected]: isSelectedDate(date),
                    })}
                    aria-label={`${
                      isSelectedDate(date) ? `${texts.selectedDateLabel} ` : ''
                    }${cellDateAriaLabel(date.date, texts)}`}
                    aria-current={date.current ? 'date' : undefined}
                  >
                    <span
                      className={classnames({
                        [monthClassNames.dateCurrent]: date.current,
                      })}
                    >
                      {date.number}
                    </span>
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
