import React from 'react';
import { styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { HtmlButton, HtmlDiv } from '../../../../../reset';
import { InternalDatePickerTextProps } from '../../datePickerTexts';
import { baseStyles } from './MonthDay.baseStyles';
import { daysMatch, WeekRowDate, cellDateAriaLabel } from '../../dateUtils';

const baseClassName = 'fi-month-day';

export const monthDayClassNames = {
  baseClassName,
  cellDisabled: `${baseClassName}--disabled`,
  cellCurrent: `${baseClassName}_current`,
  button: `${baseClassName}_button`,
  buttonDisabled: `${baseClassName}_button--disabled`,
  buttonSelected: `${baseClassName}_button--selected`,
  buttonCurrent: `${baseClassName}_button_current`,
};

export interface MonthDayProps {
  date: WeekRowDate;
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
}

export const BaseMonthDay = (props: MonthDayProps) => {
  const {
    date,
    className,
    onSelect,
    onKeyDown,
    shouldDisableDate,
    dayButtonRef,
    focusableDate,
    focusedDate,
    selectedDate,
    texts,
  } = props;

  const isSelectedDate = (): boolean =>
    !!selectedDate && daysMatch(selectedDate, date.date);

  const isFocusedDate = (): boolean =>
    !!focusedDate && daysMatch(focusedDate, date.date);

  const isFocusableDate = (): boolean => daysMatch(focusableDate, date.date);

  const isDisabledByFn = (): boolean =>
    shouldDisableDate ? shouldDisableDate(date.date) : false;

  return (
    <td
      key={date.date.toString()}
      className={classnames(className, baseClassName, {
        [monthDayClassNames.cellDisabled]: date.disabled,
      })}
    >
      {date.disabled ? (
        date.current ? (
          <HtmlDiv className={monthDayClassNames.cellCurrent}>
            {date.number}
          </HtmlDiv>
        ) : (
          date.number
        )
      ) : (
        <HtmlButton
          onClick={() => (isDisabledByFn() ? undefined : onSelect(date.date))}
          onKeyDown={onKeyDown}
          tabIndex={isFocusableDate() ? undefined : -1}
          forwardedRef={isFocusedDate() ? dayButtonRef : undefined}
          aria-current={date.current ? 'date' : undefined}
          aria-label={
            isSelectedDate()
              ? `${cellDateAriaLabel(date.date, texts)} ${
                  texts.selectedDateLabel
                }`
              : `${cellDateAriaLabel(date.date, texts)}`
          }
          {...(isDisabledByFn() ? { 'aria-disabled': true } : {})}
          className={classnames(monthDayClassNames.button, {
            [monthDayClassNames.buttonSelected]: isSelectedDate(),
            [monthDayClassNames.buttonDisabled]: isDisabledByFn(),
          })}
        >
          {date.current ? (
            <HtmlDiv
              className={classnames({
                [monthDayClassNames.buttonCurrent]: date.current,
              })}
            >
              <span aria-hidden>{date.number}</span>
            </HtmlDiv>
          ) : (
            <span aria-hidden>{date.number}</span>
          )}
        </HtmlButton>
      )}
    </td>
  );
};

const StyledMonthDay = styled(
  ({ theme, ...passProps }: MonthDayProps & SuomifiThemeProp) => (
    <BaseMonthDay {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const MonthDay = (props: MonthDayProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => <StyledMonthDay theme={suomifiTheme} {...props} />}
  </SuomifiThemeConsumer>
);

MonthDay.displayName = 'MonthDay';
export { MonthDay };
