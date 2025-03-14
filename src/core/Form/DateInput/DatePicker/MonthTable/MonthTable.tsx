import React, { useEffect } from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { InternalDatePickerTextProps } from '../../datePickerTexts';
import { weekRows, WeekRowDate } from '../../dateUtils';
import { MonthDay } from '../MonthDay/MonthDay';
import { baseStyles } from './MonthTable.baseStyles';

const baseClassName = 'fi-month-table';

export const monthTableClassNames = {
  baseClassName,
  cell: `${baseClassName}_thead-cell`,
};

export interface MonthTableProps {
  /** Styled component className */
  className?: string;
  /** Callback for date select  */
  onSelect: (date: Date) => void;
  /** Callback for keydown events */
  onKeyDown: (event: React.KeyboardEvent<HTMLButtonElement>) => void;
  /** Disable date inside date range */
  shouldDisableDate?: (date: Date) => boolean;
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
  /** Minimum date user can select from date picker. */
  minDate: Date;
  /** Maximum date user can select from date picker. */
  maxDate: Date;
}

export const BaseMonthTable = (props: MonthTableProps) => {
  const {
    className,
    onSelect,
    onKeyDown,
    shouldDisableDate,
    dayButtonRef,
    focusableDate,
    focusedDate,
    selectedDate,
    minDate,
    maxDate,
    texts,
  } = props;

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
              className={monthTableClassNames.cell}
            >
              {day}
            </td>
          ))}
        </tr>
      </thead>
      <tbody>
        {weekRows(focusableDate, minDate, maxDate).map(
          (weekRow: WeekRowDate[]) => (
            <tr key={weekRow[0].date.toString()}>
              {weekRow.map((date: WeekRowDate) => (
                <MonthDay
                  key={date.date.toString()}
                  date={date}
                  focusableDate={focusableDate}
                  focusedDate={focusedDate}
                  selectedDate={selectedDate}
                  dayButtonRef={dayButtonRef}
                  onSelect={onSelect}
                  onKeyDown={onKeyDown}
                  shouldDisableDate={shouldDisableDate}
                  texts={texts}
                />
              ))}
            </tr>
          ),
        )}
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
