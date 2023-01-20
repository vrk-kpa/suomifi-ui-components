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
  /** Year select element reference for focusing select and calculating dropdown width */
  yearSelect: React.RefObject<HTMLDivElement>;
  /** Month select element reference for calculating dropdown width */
  monthSelect: React.RefObject<HTMLDivElement>;
  /** Date that is focused in calendar */

  focusableDate: Date;
  minMonth: Date;
  maxMonth: Date;
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
    minMonth,
    maxMonth,
  } = props;

  const handleYearSelect = (value: string): void => {
    let date = new Date(focusableDate);
    date.setFullYear(Number(value));
    if (monthIsAfter(date, maxMonth)) {
      date = maxMonth;
    } else if (monthIsBefore(date, minMonth)) {
      date = minMonth;
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
        dropdownPopoverProps={{ portal: false, children: [] }}
        forwardedRef={yearSelect}
        labelText={texts.yearSelectLabel}
        labelMode="hidden"
        value={String(focusableDate.getFullYear())}
        onChange={handleYearSelect}
        className={selectorsClassNames.yearSelect}
      >
        {yearOptions(minMonth, maxMonth).map((year: number) => (
          <DropdownItem value={String(year)} key={year}>
            {year}
          </DropdownItem>
        ))}
      </Dropdown>
      <Dropdown
        dropdownPopoverProps={{ portal: false, children: [] }}
        forwardedRef={monthSelect}
        labelText={texts.monthSelectLabel}
        labelMode="hidden"
        value={String(focusableDate.getMonth())}
        onChange={handleMonthSelect}
        className={selectorsClassNames.monthSelect}
      >
        {monthOptions(focusableDate, minMonth, maxMonth, texts).map(
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
        disabled={monthIsSame(focusableDate, minMonth)}
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
        disabled={monthIsSame(focusableDate, maxMonth)}
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
