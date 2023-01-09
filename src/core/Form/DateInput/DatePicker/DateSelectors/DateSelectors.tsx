import React from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { HtmlDiv } from '../../../../../reset';
import { Dropdown, DropdownItem } from '../../../../Dropdown';
import { InternalDatePickerTextProps } from '../../datePickerTexts';
import { baseStyles } from './DateSelectors.baseStyles';
import { Button } from '../../../../Button/Button';
import { yearOptions, monthBack, monthForward } from '../../dateUtils';

const baseClassName = 'fi-date-selectors';

export const selectorsClassNames = {
  baseClassName,
  container: `${baseClassName}_container`,
  yearSelect: `${baseClassName}_year-select`,
  monthSelect: `${baseClassName}_month-select`,
  monthButton: `${baseClassName}_month-button`,
  dropdown: `${baseClassName}_dropdown`,
  dropdownItem: `${baseClassName}_dropdown-item`,
};

interface DateSelectorsProps {
  texts: InternalDatePickerTextProps;
  /** Styled component className */
  className?: string;
  /** Callback for date select  */
  onChange: (date: Date) => void;
  /** Date that is focused in calendar */
  focusedDate: Date;
  minDate: Date;
  maxDate: Date;
}

export const BaseDateSelectors = (props: DateSelectorsProps) => {
  const { className, onChange, texts, focusedDate, minDate, maxDate } = props;

  const handleYearSelect = (value: string): void => {
    const date = new Date(focusedDate);
    date.setFullYear(Number(value));
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
        labelText={texts.yearSelectLabel}
        labelMode="hidden"
        value={String(focusedDate.getFullYear())}
        onChange={handleYearSelect}
        className={classnames(
          selectorsClassNames.yearSelect,
          selectorsClassNames.dropdown,
        )}
      >
        {yearOptions(minDate, maxDate).map((year: number) => (
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
        {texts.monthNames.map((monthName: string, index: number) => (
          <DropdownItem
            className={selectorsClassNames.dropdownItem}
            value={String(index)}
            key={monthName}
          >
            {monthName}
          </DropdownItem>
        ))}
      </Dropdown>
      <Button
        onClick={() => handlePrevMonthButton()}
        icon="chevronLeft"
        variant="secondaryNoBorder"
        aria-label={getPrevMonthButtonLabel()}
        className={selectorsClassNames.monthButton}
      />
      <Button
        onClick={() => handleNextMonthButton()}
        icon="chevronRight"
        variant="secondaryNoBorder"
        aria-label={getNextMonthButtonLabel()}
        className={selectorsClassNames.monthButton}
      />
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
