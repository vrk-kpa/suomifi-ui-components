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
import {
  DateSelectors,
  selectorsClassNames,
} from './DateSelectors/DateSelectors';
import {
  monthIsAfter,
  monthIsBefore,
  moveDays,
  dayIsInMonthRange,
  firstDayOfWeek,
  lastDayOfWeek,
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
  /** Callback fired when closing calender */
  onClose: (focus?: boolean) => void;
  /** Callback fired when date is selected  */
  onChange: (date: Date) => void;
  /** Texts for date picker  */
  texts: InternalDatePickerTextProps;
  /** Styled component className */
  className?: string;
  minMonth: Date;
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

  const arrowRef = useRef<HTMLDivElement>(null);
  const yearSelectRef = useRef<HTMLDivElement>(null);
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
    if (isOpen) {
      setHasPopperEventListeners(true);
      document.addEventListener('click', globalClickHandler, {
        capture: true,
      });
      document.addEventListener('keydown', globalKeydownHandler, {
        capture: true,
      });
      if (yearSelectRef.current) {
        const focusableYearSelect = yearSelectRef.current
          .childNodes[0] as HTMLSpanElement;
        focusableYearSelect?.focus();
      }
      return () => {
        document.removeEventListener('click', globalClickHandler, {
          capture: true,
        });
        document.removeEventListener('keydown', globalKeydownHandler, {
          capture: true,
        });
      };
    }
    setHasPopperEventListeners(false);
  }, [isOpen]);

  const globalClickHandler = (nativeEvent: MouseEvent) => {
    const element = nativeEvent.target as Element;

    if (
      !dialogElement?.contains(nativeEvent.target as Node) &&
      !openButtonRef?.current?.contains(nativeEvent.target as Node) &&
      /* Dropdown list is rendered outside of dialog
      to a <reach-portal> that is not accessible with ref */
      !element.classList.contains(selectorsClassNames.dropdownItem) &&
      !element.classList.contains(selectorsClassNames.dropdown)
    ) {
      // For debugging random click to <body>? in dialog
      console.log('element: ', element);
      onClose();
    }
  };

  const globalKeydownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }

    if (event.key === 'Tab') {
      // Trap focus to dialog
      const firstElement = yearSelectRef?.current
        ?.childNodes[0] as HTMLSpanElement;
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

    if (date) {
      setFocusableDate(date);
      setFocusedDate(date);
    }
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
    onClose(true);
    onChange(focusableDate);
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
              texts={texts}
              onChange={handleDateChange}
              minMonth={minMonth}
              maxMonth={maxMonth}
            />
            <MonthTable
              texts={texts}
              focusableDate={focusableDate}
              focusedDate={focusedDate}
              selectedDate={selectedDate}
              onSelect={handleDateSelect}
              onKeyDown={handleButtonKeydown}
              dayButtonRef={dayButtonRef}
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
                onClick={() => onClose(true)}
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
