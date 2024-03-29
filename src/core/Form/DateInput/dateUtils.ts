import {
  addDays,
  addMonths,
  addYears,
  eachDayOfInterval,
  eachMonthOfInterval,
  eachWeekOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  isSameMonth,
  isToday,
  isWithinInterval,
  parse,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { InternalDatePickerTextProps } from './datePickerTexts';

const weekStartsOn = 1;
export interface DateAdapter {
  format: (date: Date) => string;
  parse: (value: string) => Date;
}

export const defaultDateAdapter = (
  formatString: string = 'd.M.y',
): DateAdapter => ({
  format: (date: Date): string => format(date, formatString),
  parse: (value: string): Date => parse(value, formatString, new Date()),
});

export const yearOptions = (minDate: Date, maxDate: Date): number[] => {
  const min = minDate.getFullYear();
  const max = maxDate.getFullYear();
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
};

export interface MonthOption {
  name: string;
  value: number;
}

export const monthOptions = (
  selectedDate: Date,
  minDate: Date,
  maxDate: Date,
  texts: InternalDatePickerTextProps,
): any[] => {
  const year = selectedDate.getFullYear();
  const months = eachMonthOfInterval({
    start: new Date(year, 0, 1),
    end: new Date(year, 11, 31),
  });
  return months.reduce((array: MonthOption[], month, index) => {
    if (startOfMonth(minDate) > month || endOfMonth(maxDate) < month) {
      // Month is disabled
    } else {
      array.push({
        name: texts.monthNames[index],
        value: index,
      });
    }
    return array;
  }, []);
};

export const moveDays = (date: Date, days: number) => addDays(date, days);

export const moveMonths = (date: Date, months: number) =>
  addMonths(date, months);

export const moveYears = (date: Date, years: number) => addYears(date, years);

export const firstDayOfMonth = (date: Date) => startOfMonth(date);

export const lastDayOfMonth = (date: Date) => endOfMonth(date);

export const firstDayOfWeek = (date: Date) =>
  startOfWeek(date, { weekStartsOn });

export const lastDayOfWeek = (date: Date) => endOfWeek(date, { weekStartsOn });

export const daysMatch = (first: Date, second: Date): boolean =>
  isSameDay(first, second);

export const dayIsInRange = (date: Date, start: Date, end: Date): boolean =>
  isWithinInterval(date, { start, end });

export const dayIsInMonthRange = (
  date: Date,
  start: Date,
  end: Date,
): boolean =>
  isWithinInterval(date, { start: startOfMonth(start), end: endOfMonth(end) });

export const dayIsBefore = (date: Date, dateToCompare: Date): boolean =>
  isBefore(date, dateToCompare);

export const dayIsAfter = (date: Date, dateToCompare: Date): boolean =>
  isAfter(date, dateToCompare);

export const monthIsSame = (date: Date, dateToCompare: Date): boolean =>
  isSameMonth(date, dateToCompare);

export const monthIsAfter = (date: Date, dateToCompare: Date): boolean =>
  isAfter(date, endOfMonth(dateToCompare));

export const monthIsBefore = (date: Date, dateToCompare: Date): boolean =>
  isBefore(date, startOfMonth(dateToCompare));

export interface WeekRowDate {
  date: Date;
  number: number;
  disabled: boolean;
  current: boolean;
}

export const weekRows = (
  month: Date,
  minDate: Date,
  maxDate: Date,
): WeekRowDate[][] => {
  const start = startOfMonth(month);
  const end = endOfMonth(month);
  const firstDaysOfWeek = eachWeekOfInterval(
    {
      start,
      end,
    },
    { weekStartsOn },
  );
  const rows = firstDaysOfWeek.map((firstDay: Date) => {
    const lastDay = endOfWeek(firstDay, { weekStartsOn });
    const daysOfWeek = eachDayOfInterval({ start: firstDay, end: lastDay });
    return daysOfWeek.map((date: Date) => ({
      date,
      number: date.getDate(),
      current: isToday(date),
      disabled:
        !isSameMonth(date, month) || !dayIsInRange(date, minDate, maxDate),
    }));
  });
  return rows;
};

export const cellDateAriaLabel = (
  date: Date,
  texts: InternalDatePickerTextProps,
) => {
  const month = texts.monthNames[date.getMonth()];
  const dayIndex = getDay(date);
  const index = dayIndex === 0 ? 6 : dayIndex - 1;
  const weekDay = texts.weekDays[index];
  return `${date.getDate()} ${weekDay} ${month} ${date.getFullYear()}`;
};
