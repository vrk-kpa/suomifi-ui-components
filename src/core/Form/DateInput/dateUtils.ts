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
  lastDayOfMonth,
  parse,
  startOfMonth,
  startOfWeek,
  subMonths,
  subYears,
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

export const yearOptions = (minMonth: Date, maxMonth: Date): number[] => {
  const min = minMonth.getFullYear();
  const max = maxMonth.getFullYear();
  return Array.from({ length: max - min + 1 }, (_, i) => min + i);
};

export interface MonthOption {
  name: string;
  value: number;
}

export const monthOptions = (
  selectedDate: Date,
  minMonth: Date,
  maxMonth: Date,
  texts: InternalDatePickerTextProps,
): any[] => {
  const year = selectedDate.getFullYear();
  const months = eachMonthOfInterval({
    start: new Date(year, 0, 1),
    end: new Date(year, 11, 31),
  });
  return months.reduce((array: MonthOption[], month, index) => {
    if (startOfMonth(minMonth) > month || endOfMonth(maxMonth) < month) {
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

export const firstDayOfWeek = (date: Date) =>
  startOfWeek(date, { weekStartsOn });

export const lastDayOfWeek = (date: Date) => endOfWeek(date, { weekStartsOn });

export const yearsBack = (difference: number = 10): Date =>
  subYears(new Date(), difference);

export const yearsForward = (difference: number = 10): Date =>
  addYears(new Date(), difference);

export const monthBack = (date: Date): Date => subMonths(date, 1);

export const monthForward = (date: Date): Date => addMonths(date, 1);

export const daysMatch = (first: Date, second: Date): boolean =>
  isSameDay(first, second);

export const dayIsInMonthRange = (
  date: Date,
  start: Date,
  end: Date,
): boolean =>
  isWithinInterval(date, { start: startOfMonth(start), end: endOfMonth(end) });

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

export const weekRows = (month: Date): WeekRowDate[][] => {
  const start = startOfMonth(month);
  const end = lastDayOfMonth(month);
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
      disabled: !isSameMonth(date, month),
    }));
  });
  return rows;
};

export const cellDateAriaLabel = (
  date: Date,
  texts: InternalDatePickerTextProps,
) => {
  const month = texts.monthNames[date.getMonth()];
  const weekDay = texts.weekDays[getDay(date)];
  return `${date.getDate()} ${weekDay} ${month} ${date.getFullYear()}`;
};
