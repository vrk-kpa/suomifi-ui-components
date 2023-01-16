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
  monthBack,
  monthForward,
  monthOptions,
  monthIsAfter,
  monthIsBefore,
  MonthOption,
} from '../../dateUtils';

const baseClassName = 'fi-date-selectors';

export const selectorsClassNames = {
  baseClassName,
  container: `${baseClassName}_container`,
  yearSelect: `${baseClassName}_year-select`,
  monthSelect: `${baseClassName}_month-select`,
  monthButton: `${baseClassName}_month-button`,
  monthButtonIcon: `${baseClassName}_month-button_icon`,
  dropdown: `${baseClassName}_dropdown`,
  dropdownItem: `${baseClassName}_dropdown-item`,
};

interface DateSelectorsProps {
  texts: InternalDatePickerTextProps;
  /** Styled component className */
  className?: string;
  /** Callback for date select  */
  onChange: (date: Date) => void;
  /** Year select element reference for focusing select */
  yearSelect: React.RefObject<HTMLDivElement>;
  /** Date that is focused in calendar */
  focusedDate: Date;
  minMonth: Date;
  maxMonth: Date;
}

export const BaseDateSelectors = (props: DateSelectorsProps) => {
  const {
    className,
    onChange,
    yearSelect,
    texts,
    focusedDate,
    minMonth,
    maxMonth,
  } = props;

  const handleYearSelect = (value: string): void => {
    let date = new Date(focusedDate);
    date.setFullYear(Number(value));
    if (monthIsAfter(date, maxMonth)) {
      date = maxMonth;
    } else if (monthIsBefore(date, minMonth)) {
      date = minMonth;
    }
    onChange(date);
  };

  const handleMonthSelect = (value: string): void => {
    const date = new Date(focusedDate);
    date.setMonth(Number(value));
    onChange(date);
  };

  const handlePrevMonthButton = (): void => {
    const date = monthBack(focusedDate);
    onChange(date);
  };

  const handleNextMonthButton = (): void => {
    const date = monthForward(focusedDate);
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
      monthBack(focusedDate).getMonth(),
    )}`;

  const getNextMonthButtonLabel = () =>
    `${texts.nextMonthButtonLabel} ${getMonthNameByIndex(
      monthForward(focusedDate).getMonth(),
    )}`;

  return (
    <HtmlDiv className={classnames(className, selectorsClassNames.container)}>
      <Dropdown
        forwardedRef={yearSelect}
        labelText={texts.yearSelectLabel}
        labelMode="hidden"
        value={String(focusedDate.getFullYear())}
        onChange={handleYearSelect}
        className={classnames(
          selectorsClassNames.yearSelect,
          selectorsClassNames.dropdown,
        )}
      >
        {yearOptions(minMonth, maxMonth).map((year: number) => (
          <DropdownItem
            className={selectorsClassNames.dropdownItem}
            value={String(year)}
            key={year}
          >
            {year}
          </DropdownItem>
        ))}
      </Dropdown>
      <Dropdown
        labelText={texts.monthSelectLabel}
        labelMode="hidden"
        value={String(focusedDate.getMonth())}
        onChange={handleMonthSelect}
        className={classnames(
          selectorsClassNames.monthSelect,
          selectorsClassNames.dropdown,
        )}
      >
        {monthOptions(focusedDate, minMonth, maxMonth, texts).map(
          (month: MonthOption) => (
            <DropdownItem
              className={selectorsClassNames.dropdownItem}
              value={String(month.value)}
              key={month.name}
            >
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
  ({ theme, ...passProps }: DateSelectorsProps & SuomifiThemeProp) => (
    <BaseDateSelectors {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const DateSelectors = (props: DateSelectorsProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledDateSelectors theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

DateSelectors.displayName = 'DateSelectors';
export { DateSelectors };
