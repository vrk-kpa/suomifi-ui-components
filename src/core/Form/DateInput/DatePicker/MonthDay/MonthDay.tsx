import React from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { VisuallyHidden } from '../../../../VisuallyHidden/VisuallyHidden';
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

  const isDisabledDate = (): boolean =>
    shouldDisableDate ? shouldDisableDate(date.date) : false;

  const cellDateElements = (
    <>
      <span aria-hidden>{date.number}</span>
      <VisuallyHidden>{cellDateAriaLabel(date.date, texts)}</VisuallyHidden>
    </>
  );

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
          onClick={() => (isDisabledDate() ? undefined : onSelect(date.date))}
          onKeyDown={onKeyDown}
          tabIndex={isFocusableDate() ? undefined : -1}
          forwardedRef={isFocusedDate() ? dayButtonRef : undefined}
          aria-current={date.current ? 'date' : undefined}
          aria-disabled={isDisabledDate()}
          className={classnames(monthDayClassNames.button, {
            [monthDayClassNames.buttonSelected]: isSelectedDate(),
            [monthDayClassNames.buttonDisabled]: isDisabledDate(),
          })}
        >
          {date.current ? (
            <HtmlDiv
              className={classnames({
                [monthDayClassNames.buttonCurrent]: date.current,
              })}
            >
              {cellDateElements}
            </HtmlDiv>
          ) : (
            cellDateElements
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
