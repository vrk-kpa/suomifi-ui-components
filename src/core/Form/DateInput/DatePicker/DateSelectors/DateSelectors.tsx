import React from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { HtmlDiv } from '../../../../../reset';
import { Dropdown, DropdownItem } from '../../../../Dropdown';
import { InternalDatePickerTextProps } from '../../datePickerTexts';
import { baseStyles } from './DateSelectors.baseStyles';
import { Button } from '../../../../Button/Button';
import { Icon } from '../../../../Icon/Icon';
import {
  yearOptions,
  monthOptions,
  monthIsAfter,
  monthIsBefore,
  MonthOption,
  monthIsSame,
  moveMonths,
} from '../../dateUtils';

const baseClassName = 'fi-date-selectors';

export const selectorsClassNames = {
  baseClassName,
  container: `${baseClassName}_container`,
  yearSelect: `${baseClassName}_year-select`,
  monthSelect: `${baseClassName}_month-select`,
  monthButton: `${baseClassName}_month-button`,
  monthButtonIcon: `${baseClassName}_month-button_icon`,
};

interface DateSelectorsProps {
  texts: InternalDatePickerTextProps;
  /** Styled component className */
  className?: string;
  /** Callback for date select  */
  onChange: (date: Date) => void;
  /** Year select element reference for focus trap and calculating dropdown width */
  yearSelect: React.RefObject<HTMLDivElement>;
  /** Month select element reference for calculating dropdown width */
  monthSelect: React.RefObject<HTMLDivElement>;
  /** Date that is focused in calendar */
  focusableDate: Date;
  /** Minimum date user can select from date picker. */
  minDate: Date;
  /** Maximum date user can select from date picker. */
  maxDate: Date;
}

interface DropdownWidthProps {
  /** Width of year select element */
  yearSelectWidth: number;
  /** Width of month select element */
  monthSelectWidth: number;
}

export const BaseDateSelectors = (props: DateSelectorsProps) => {
  const {
    className,
    onChange,
    yearSelect,
    monthSelect,
    texts,
    focusableDate,
    minDate,
    maxDate,
  } = props;

  const handleYearSelect = (value: string): void => {
    let date = new Date(focusableDate);
    date.setFullYear(Number(value));
    if (monthIsAfter(date, maxDate)) {
      date = maxDate;
    } else if (monthIsBefore(date, minDate)) {
      date = minDate;
    }
    onChange(date);
  };

  const handleMonthSelect = (value: string): void => {
    const date = new Date(focusableDate);
    date.setMonth(Number(value));
    onChange(date);
  };

  const handlePrevMonthButton = (): void => {
    const date = moveMonths(focusableDate, -1);
    onChange(date);
  };

  const handleNextMonthButton = (): void => {
    const date = moveMonths(focusableDate, 1);
    onChange(date);
  };

  const getMonthNameByIndex = (index: number): string | null => {
    if (index >= 0 && index <= 11) {
      return texts.monthNames[index];
    }
    return null;
  };

  const getPrevMonthButtonLabel = () =>
    `${texts.prevMonthButtonLabel} ${getMonthNameByIndex(
      moveMonths(focusableDate, -1).getMonth(),
    )}`;

  const getNextMonthButtonLabel = () =>
    `${texts.nextMonthButtonLabel} ${getMonthNameByIndex(
      moveMonths(focusableDate, 1).getMonth(),
    )}`;

  return (
    <HtmlDiv className={classnames(className, selectorsClassNames.container)}>
      <Dropdown
        forwardedRef={yearSelect}
        labelText={texts.yearSelectLabel}
        labelMode="hidden"
        value={String(focusableDate.getFullYear())}
        onChange={handleYearSelect}
        className={selectorsClassNames.yearSelect}
        portal={false}
      >
        {yearOptions(minDate, maxDate).map((year: number) => (
          <DropdownItem value={String(year)} key={year}>
            {year}
          </DropdownItem>
        ))}
      </Dropdown>
      <Dropdown
        forwardedRef={monthSelect}
        labelText={texts.monthSelectLabel}
        labelMode="hidden"
        value={String(focusableDate.getMonth())}
        onChange={handleMonthSelect}
        className={selectorsClassNames.monthSelect}
        portal={false}
      >
        {monthOptions(focusableDate, minDate, maxDate, texts).map(
          (month: MonthOption) => (
            <DropdownItem value={String(month.value)} key={month.name}>
              {month.name}
            </DropdownItem>
          ),
        )}
      </Dropdown>
      <Button
        onClick={() => handlePrevMonthButton()}
        variant="secondaryNoBorder"
        aria-label={getPrevMonthButtonLabel()}
        className={selectorsClassNames.monthButton}
        disabled={monthIsSame(focusableDate, minDate)}
      >
        <Icon
          icon="chevronLeft"
          className={selectorsClassNames.monthButtonIcon}
        />
      </Button>
      <Button
        onClick={() => handleNextMonthButton()}
        variant="secondaryNoBorder"
        aria-label={getNextMonthButtonLabel()}
        className={selectorsClassNames.monthButton}
        disabled={monthIsSame(focusableDate, maxDate)}
      >
        <Icon
          icon="chevronRight"
          className={selectorsClassNames.monthButtonIcon}
        />
      </Button>
    </HtmlDiv>
  );
};

const StyledDateSelectors = styled(
  ({
    theme,
    ...passProps
  }: DateSelectorsProps & SuomifiThemeProp & DropdownWidthProps) => (
    <BaseDateSelectors {...passProps} />
  ),
)`
  ${({ theme, yearSelectWidth, monthSelectWidth }) =>
    baseStyles(theme, yearSelectWidth, monthSelectWidth)}
`;

const DateSelectors = (props: DateSelectorsProps & DropdownWidthProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledDateSelectors theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

DateSelectors.displayName = 'DateSelectors';
export { DateSelectors };
