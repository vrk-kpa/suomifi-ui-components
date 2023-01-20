import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { default as styled } from 'styled-components';
import { usePopper } from 'react-popper';
import classnames from 'classnames';
import { useEnhancedEffect } from '../../../../utils/common';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../theme';
import { HtmlDiv, HtmlDivWithRef } from '../../../../reset';
import { DatePickerProps } from '../DateInput';
import { InternalDatePickerTextProps } from '../datePickerTexts';
import { baseStyles } from './DatePicker.baseStyles';
import { Button } from '../../../Button/Button';
import { MonthTable } from './MonthTable/MonthTable';
import { DateSelectors } from './DateSelectors/DateSelectors';
import {
  monthIsAfter,
  monthIsBefore,
  moveDays,
  dayIsInMonthRange,
  firstDayOfWeek,
  lastDayOfWeek,
  moveYears,
  moveMonths,
} from '../dateUtils';
import { getLogger } from '../../../../utils/log';

const baseClassName = 'fi-date-picker';

export const datePickerClassNames = {
  baseClassName,
  hidden: `${baseClassName}--hidden`,
  application: `${baseClassName}_application`,
  bottomContainer: `${baseClassName}_bottom-container`,
  bottomButton: `${baseClassName}_bottom-button`,
  popperArrow: `${baseClassName}_popper-arrow`,
};

export interface InternalDatePickerProps
  extends Omit<DatePickerProps, 'datePickerEnabled'> {
  /** Source ref for positioning the popover next to calendar button */
  sourceRef: React.RefObject<any>;
  /** Button ref for closing dialog on button click when dialog is open */
  openButtonRef: React.RefObject<any>;
  /** Boolean to open or close calendar dialog */
  isOpen: boolean;
  /** Date to set focusable and selected */
  initialDate?: Date | null;
  /** Callback fired when closing calender */
  onClose: (focus?: boolean) => void;
  /** Callback fired when date is selected  */
  onChange: (date: Date) => void;
  /** Texts for date picker  */
  texts: InternalDatePickerTextProps;
  /** Styled component className */
  className?: string;
  /** Minimum month user can select from date picker. */
  minMonth: Date;
  /** Maximum month user can select from date picker. */
  maxMonth: Date;
}

export const BaseDatePicker = (props: InternalDatePickerProps) => {
  const {
    sourceRef,
    openButtonRef,
    isOpen,
    onClose,
    onChange,
    className,
    texts,
    initialDate,
    initialMonth,
    minMonth,
    maxMonth,
  } = props;

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [dialogElement, setDialogElement] = useState<HTMLElement | null>(null);
  const [hasPopperEventListeners, setHasPopperEventListeners] =
    useState<boolean>(false);
  const [focusableDate, setFocusableDate] = useState<Date>(new Date());
  const [focusedDate, setFocusedDate] = useState<Date | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [yearSelectWidth, setYearSelectWidth] = useState<number>(0);
  const [monthSelectWidth, setMonthSelectWidth] = useState<number>(0);

  const arrowRef = useRef<HTMLDivElement>(null);
  const yearSelectRef = useRef<HTMLDivElement>(null);
  const monthSelectRef = useRef<HTMLDivElement>(null);
  const confirmButtonRef = useRef<HTMLButtonElement>(null);
  const dayButtonRef = useRef<HTMLButtonElement>(null);

  useEnhancedEffect(() => {
    setMountNode(window.document.body);
    if (monthIsBefore(focusableDate, minMonth)) {
      setFocusableDate(minMonth);
    } else if (monthIsAfter(focusableDate, maxMonth)) {
      setFocusableDate(maxMonth);
    }
  }, []);

  useEffect(() => {
    if (initialMonth) {
      if (dayIsInMonthRange(initialMonth, minMonth, maxMonth)) {
        setFocusableDate(initialMonth);
      } else {
        getLogger().warn(
          `Initial month "${initialMonth}" is not within interval [minMonth, maxMonth]`,
        );
      }
    }
  }, [initialMonth]);

  useEffect(() => {
    if (initialDate) {
      if (dayIsInMonthRange(initialDate, minMonth, maxMonth)) {
        setSelectedDate(initialDate);
        setFocusableDate(initialDate);
      } else {
        getLogger().warn(
          `Initial date "${initialDate}" is not within interval [minMonth, maxMonth]`,
        );
      }
    }
  }, [initialDate]);

  useEffect(() => {
    if (isOpen) {
      setHasPopperEventListeners(true);
      document.addEventListener('click', globalClickHandler, {
        capture: true,
      });
      document.addEventListener('keydown', globalKeyDownHandler, {
        capture: true,
      });
      if (yearSelectRef.current) {
        focusableYearSelect().focus();
        calculateDropdownWidths();
      }
      return () => {
        document.removeEventListener('click', globalClickHandler, {
          capture: true,
        });
        document.removeEventListener('keydown', globalKeyDownHandler, {
          capture: true,
        });
      };
    }
    setHasPopperEventListeners(false);
  }, [isOpen]);

  const focusableYearSelect = (): HTMLSpanElement =>
    yearSelectRef.current?.childNodes[0] as HTMLSpanElement;

  const calculateDropdownWidths = () => {
    setYearSelectWidth(
      yearSelectRef.current?.getBoundingClientRect().width || 0,
    );
    setMonthSelectWidth(
      monthSelectRef.current?.getBoundingClientRect().width || 0,
    );
  };

  const globalClickHandler = (nativeEvent: MouseEvent) => {
    if (
      !dialogElement?.contains(nativeEvent.target as Node) &&
      !openButtonRef.current?.contains(nativeEvent.target as Node)
    ) {
      handleClose();
    }
  };

  const globalKeyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }

    if (event.key === 'Tab') {
      // Trap focus to dialog
      const firstElement = focusableYearSelect();
      const lastElement = confirmButtonRef?.current;
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    }
  };

  const handleButtonKeydown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    let date;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      date = dateInRange(moveDays(focusableDate, 1));
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      date = dateInRange(moveDays(focusableDate, -1));
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      date = dateInRange(moveDays(focusableDate, 7));
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      date = dateInRange(moveDays(focusableDate, -7));
    }

    if (event.key === 'Home') {
      event.preventDefault();
      date = dateInRange(firstDayOfWeek(focusableDate));
    }

    if (event.key === 'End') {
      event.preventDefault();
      date = dateInRange(lastDayOfWeek(focusableDate));
    }

    if (event.key === 'PageUp' && event.shiftKey) {
      event.preventDefault();
      date = dateInRange(moveYears(focusableDate, -1));
    }

    if (event.key === 'PageDown' && event.shiftKey) {
      event.preventDefault();
      date = dateInRange(moveYears(focusableDate, 1));
    }

    if (event.key === 'PageUp' && !event.shiftKey) {
      event.preventDefault();
      date = dateInRange(moveMonths(focusableDate, -1));
    }

    if (event.key === 'PageDown' && !event.shiftKey) {
      event.preventDefault();
      date = dateInRange(moveMonths(focusableDate, 1));
    }

    if (date) {
      setFocusableDate(date);
      setFocusedDate(date);
    }
  };

  const dateInRange = (
    date: Date,
    start: Date = minMonth,
    end: Date = maxMonth,
  ): Date | null => {
    if (dayIsInMonthRange(date, start, end)) {
      return date;
    }
    return null;
  };

  const { styles, attributes } = usePopper(sourceRef.current, dialogElement, {
    strategy: 'fixed',
    modifiers: [
      { name: 'eventListeners', enabled: hasPopperEventListeners },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
      {
        name: 'arrow',
        options: {
          element: arrowRef.current,
        },
      },
    ],
    placement: 'bottom-start',
  });

  const handleConfirm = (): void => {
    handleClose(true);
    onChange(focusableDate);
  };

  const handleClose = (focus: boolean = false): void => {
    setSelectedDate(null);
    onClose(focus);
  };

  const handleDateChange = (date: Date): void => {
    setFocusableDate(date);
  };

  const handleDateSelect = (date: Date): void => {
    setSelectedDate(date);
    setFocusableDate(date);
  };

  if (!mountNode) {
    return null;
  }
  return (
    <>
      {ReactDOM.createPortal(
        <HtmlDivWithRef
          role="dialog"
          className={classnames(className, baseClassName, {
            [datePickerClassNames.hidden]: !isOpen,
          })}
          style={styles.popper}
          forwardedRef={setDialogElement}
        >
          <HtmlDiv
            role="application"
            className={datePickerClassNames.application}
          >
            <HtmlDivWithRef
              className={datePickerClassNames.popperArrow}
              forwardedRef={arrowRef}
              data-popper-arrow
              data-popper-placement={
                attributes.popper?.['data-popper-placement']
              }
            />
            <DateSelectors
              focusableDate={focusableDate}
              yearSelect={yearSelectRef}
              yearSelectWidth={yearSelectWidth}
              monthSelect={monthSelectRef}
              monthSelectWidth={monthSelectWidth}
              onChange={handleDateChange}
              minMonth={minMonth}
              maxMonth={maxMonth}
              texts={texts}
            />
            <MonthTable
              focusableDate={focusableDate}
              focusedDate={focusedDate}
              selectedDate={selectedDate}
              onSelect={handleDateSelect}
              onKeyDown={handleButtonKeydown}
              dayButtonRef={dayButtonRef}
              texts={texts}
            />
            <HtmlDiv className={datePickerClassNames.bottomContainer}>
              <Button
                disabled={selectedDate === null}
                onClick={() => handleConfirm()}
                className={datePickerClassNames.bottomButton}
              >
                {texts.selectButtonText}
              </Button>
              <Button
                variant="secondary"
                onClick={() => handleClose(true)}
                forwardedRef={confirmButtonRef}
                className={datePickerClassNames.bottomButton}
              >
                {texts.closeButtonText}
              </Button>
            </HtmlDiv>
          </HtmlDiv>
        </HtmlDivWithRef>,
        mountNode,
      )}
    </>
  );
};

const StyledDatePicker = styled(
  ({ theme, ...passProps }: InternalDatePickerProps & SuomifiThemeProp) => (
    <BaseDatePicker {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const DatePicker = (props: InternalDatePickerProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => <StyledDatePicker theme={suomifiTheme} {...props} />}
  </SuomifiThemeConsumer>
);

DatePicker.displayName = 'DatePicker';
export { DatePicker };
