import {
  addMonths,
  addYears,
  eachDayOfInterval,
  eachWeekOfInterval,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  lastDayOfMonth,
  parse,
  startOfMonth,
  subMonths,
  subYears,
} from 'date-fns';

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

export const yearsBack = (difference: number = 10): Date =>
  subYears(new Date(), difference);

export const yearsForward = (difference: number = 10): Date =>
  addYears(new Date(), difference);

export const monthBack = (date: Date): Date => subMonths(date, 1);

export const monthForward = (date: Date): Date => addMonths(date, 1);

export const daysMatch = (first: Date, second: Date): boolean =>
  isSameDay(first, second);

export interface WeekRowDate {
  date: Date;
  number: number;
  disabled: boolean;
  current: boolean;
}

export const weekRows = (month: Date): WeekRowDate[][] => {
  const weekStartsOn = 1;
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
