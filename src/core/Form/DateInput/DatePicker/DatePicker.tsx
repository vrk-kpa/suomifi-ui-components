import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { default as styled } from 'styled-components';
import { usePopper } from 'react-popper';
import classnames from 'classnames';
import { useEnhancedEffect } from '../../../../utils/common';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../theme';
import { HtmlDiv, HtmlDivWithRef } from '../../../../reset';
import { DatePickerProps, datePickerAlignment } from '../DateInput';
import { InternalDatePickerTextProps } from '../datePickerTexts';
import { baseStyles } from './DatePicker.baseStyles';
import { Button } from '../../../Button/Button';
import { MonthTable } from './MonthTable/MonthTable';
import { DateSelectors } from './DateSelectors/DateSelectors';
import {
  dayIsAfter,
  dayIsBefore,
  moveDays,
  dayIsInRange,
  firstDayOfWeek,
  lastDayOfWeek,
  moveYears,
  moveMonths,
} from '../dateUtils';
import { getLogger } from '../../../../utils/log';
import { HTMLAttributesIncludingDataAttributes } from 'utils/common/common';

const baseClassName = 'fi-date-picker';

export const datePickerClassNames = {
  baseClassName,
  hidden: `${baseClassName}--hidden`,
  smallScreen: `${baseClassName}--small-screen`,
  smallScreenHidden: `${baseClassName}--small-screen-hidden`,
  smallScreenContainer: `${baseClassName}_small-screen-container`,
  smallScreenScroll: `${baseClassName}_small-screen-container--scroll`,
  slideIndicator: `${baseClassName}_slide-indicator`,
  slideIndicatorWrapper: `${baseClassName}_slide-indicator-wrapper`,
  application: `${baseClassName}_application`,
  bottomContainer: `${baseClassName}_bottom-container`,
  popperArrow: `${baseClassName}_popper-arrow`,
};

export interface InternalDatePickerProps
  extends Omit<DatePickerProps, 'datePickerEnabled'> {
  /** Button ref for positioning dialog and closing dialog on button click */
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
  /** Value from date input field parsed to date. */
  inputValue: Date | null;
  /** Minimum date user can select from date picker. */
  minDate: Date;
  /** Maximum date user can select from date picker. */
  maxDate: Date;
  /** Custom props given to the datepicker component */
  userProps?: Omit<
    HTMLAttributesIncludingDataAttributes<HTMLDivElement>,
    'onChange' | 'style' | 'aria-hidden' | 'ref'
  >;
  position: datePickerAlignment;
}

export const BaseDatePicker = (props: InternalDatePickerProps) => {
  const {
    openButtonRef,
    isOpen,
    onClose,
    onChange,
    shouldDisableDate,
    className,
    texts,
    initialDate,
    inputValue,
    minDate,
    maxDate,
    smallScreen,
    userProps = {},
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
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [dragOffsetY, setDragOffsetY] = useState<number>(0);
  const [dragging, setDragging] = useState<boolean>(false);
  const [smallScreenScroll, setSmallScreenScroll] = useState<boolean>(false);

  const sliderWrapperRef = useRef<HTMLDivElement>(null);
  const smallScreenAppRef = useRef<HTMLDivElement>(null);
  const yearSelectRef = useRef<HTMLButtonElement>(null);
  const monthSelectRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dayButtonRef = useRef<HTMLButtonElement>(null);

  useEnhancedEffect(() => {
    setMountNode(window.document.body);
    if (dayIsBefore(focusableDate, minDate)) {
      setFocusableDate(minDate);
    } else if (dayIsAfter(focusableDate, maxDate)) {
      setFocusableDate(maxDate);
    }
  }, []);

  useEffect(() => {
    if (initialDate) {
      if (dayIsInRange(initialDate, minDate, maxDate)) {
        setFocusableDate(initialDate);
      } else {
        getLogger().warn(
          `Initial date "${initialDate}" is not within interval [minDate, maxDate]`,
        );
      }
    }
  }, [initialDate]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', globalClickHandler, {
        capture: true,
      });
      document.addEventListener('keydown', globalKeyDownHandler, {
        capture: true,
      });
      focusDate();
      calculateDropdownWidths();
      return () => {
        document.removeEventListener('click', globalClickHandler, {
          capture: true,
        });
        document.removeEventListener('keydown', globalKeyDownHandler, {
          capture: true,
        });
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!smallScreen && isOpen) {
      setHasPopperEventListeners(true);
      return () => {
        setHasPopperEventListeners(false);
      };
    }
    if (smallScreen && isOpen && smallScreenAppRef.current) {
      smallScreenAppRef.current.style.top = '';
      conditionalSmallScreenScroll();
      window.addEventListener('resize', conditionalSmallScreenScroll);
      return () =>
        window.removeEventListener('resize', conditionalSmallScreenScroll);
    }
  }, [smallScreen, isOpen]);

  const conditionalSmallScreenScroll = (): void => {
    if (smallScreenAppRef.current) {
      const { clientHeight, scrollHeight } = smallScreenAppRef.current;
      if (scrollHeight > clientHeight) {
        setSmallScreenScroll(true);
      } else {
        setSmallScreenScroll(false);
      }
    }
  };

  const focusDate = () => {
    if (inputValue && dayIsInRange(inputValue, minDate, maxDate)) {
      // InputValue is updated for performance reasons only when dialog is opened
      setSelectedDate(inputValue);
      setFocusableDate(inputValue);
      setFocusedDate(inputValue);
    } else {
      if (inputValue && !dayIsInRange(inputValue, minDate, maxDate)) {
        getLogger().warn(
          `Input value "${inputValue}" is not within interval [minDate, maxDate]`,
        );
      }
      setFocusedDate(focusableDate);
    }
  };

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
      !smallScreenAppRef?.current?.contains(nativeEvent.target as Node) &&
      !dialogElement?.contains(nativeEvent.target as Node) &&
      !openButtonRef.current?.contains(nativeEvent.target as Node)
    ) {
      handleClose();
    }
  };

  const globalKeyDownHandler = (event: KeyboardEvent) => {
    if (
      event.key === 'Escape' &&
      !(yearSelectRef.current?.getAttribute('aria-expanded') === 'true') &&
      !(monthSelectRef.current?.getAttribute('aria-expanded') === 'true')
    ) {
      handleClose(true);
    }

    if (event.key === 'Tab') {
      // Trap focus to dialog
      const firstElement = yearSelectRef.current;
      const lastElement = closeButtonRef?.current;
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
    start: Date = minDate,
    end: Date = maxDate,
  ): Date | null => {
    if (dayIsInRange(date, start, end)) {
      return date;
    }
    return null;
  };

  const datePickerOffset =
    props.position === 'right' ? 322 : props.position === 'center' ? 160 : 0;

  const { styles, attributes } = usePopper(
    openButtonRef.current,
    dialogElement,
    {
      strategy: 'fixed',
      modifiers: [
        {
          name: 'eventListeners',
          enabled: hasPopperEventListeners && !smallScreen,
        },
        {
          name: 'offset',
          options: {
            offset: [datePickerOffset, 10],
          },
        },
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top-end'],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 5,
          },
        },
      ],
      placement: 'bottom-end',
    },
  );

  const isSelectOpen = (
    event: React.TouchEvent<HTMLDivElement> | TouchEvent,
  ): boolean =>
    (yearSelectRef.current?.contains(event.target as Node) &&
      yearSelectRef.current.getAttribute('data-state') === 'expanded') ||
    (monthSelectRef.current?.contains(event.target as Node) &&
      monthSelectRef.current.getAttribute('data-state') === 'expanded') ||
    false;

  const handleClose = (focus: boolean = false): void => {
    setSelectedDate(null);
    setFocusedDate(null);
    onClose(focus);
  };

  const handleDateChange = (date: Date): void => {
    setFocusableDate(date);
  };

  const handleDateSelect = (date: Date): void => {
    handleClose(true);
    onChange(date);
    setFocusableDate(date);
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (sliderWrapperRef.current?.contains(event.target as Node)) {
      setDragging(true);
      setTouchStartY(event.clientY);
      setDragOffsetY(smallScreenAppRef.current?.offsetTop || 0);
      sliderWrapperRef.current.style.cursor = 'grabbing';
    }
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    if (smallScreenAppRef.current) {
      const diff = event.clientY - (touchStartY || 0);
      if (diff > 0) {
        smallScreenAppRef.current.style.top = `${dragOffsetY + diff}px`;
      }
    }
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const diff = event.clientY - (touchStartY || 0);
    if (diff > 100) {
      handleClose(true);
    } else if (smallScreenAppRef.current) {
      smallScreenAppRef.current.style.top = '';
    }
    if (sliderWrapperRef.current) {
      sliderWrapperRef.current.style.cursor = 'grab';
    }
    setDragging(false);
    setTouchStartY(null);
    setDragOffsetY(0);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    if (isSelectOpen(event)) {
      setTouchStartX(null);
      setTouchStartY(null);
    } else {
      setTouchStartX(event.changedTouches[0].clientX);
      setTouchStartY(event.changedTouches[0].clientY);
    }
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null || touchStartY === null) {
      return;
    }

    const distanceX = event.changedTouches[0].clientX - touchStartX;
    const distanceY = event.changedTouches[0].clientY - touchStartY;
    const minDistance = 50;
    const horizontal =
      Math.abs(distanceX) > minDistance && distanceY < minDistance;

    let date;
    if (horizontal && distanceX > 0) {
      // Swipe left
      date = dateInRange(moveMonths(focusableDate, -1));
    } else if (horizontal) {
      // Swipe right
      date = dateInRange(moveMonths(focusableDate, 1));
    }
    if (date) {
      setFocusableDate(date);
      setFocusedDate(date);
    }
  };

  const application = (
    <HtmlDiv role="application" className={datePickerClassNames.application}>
      <DateSelectors
        focusableDate={focusableDate}
        yearSelect={yearSelectRef}
        yearSelectWidth={yearSelectWidth}
        monthSelect={monthSelectRef}
        monthSelectWidth={monthSelectWidth}
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
        texts={texts}
      />
      <MonthTable
        focusableDate={focusableDate}
        focusedDate={focusedDate}
        selectedDate={selectedDate}
        onSelect={handleDateSelect}
        onKeyDown={handleButtonKeydown}
        shouldDisableDate={shouldDisableDate}
        dayButtonRef={dayButtonRef}
        minDate={minDate}
        maxDate={maxDate}
        texts={texts}
      />
      <HtmlDiv className={datePickerClassNames.bottomContainer}>
        <Button
          variant="secondaryNoBorder"
          onClick={() => handleClose(true)}
          forwardedRef={closeButtonRef}
        >
          {texts.closeButtonText}
        </Button>
      </HtmlDiv>
    </HtmlDiv>
  );

  const { className: customClassName, ...passProps } = userProps;

  const dialogClasses = [
    className,
    baseClassName,
    customClassName,
    {
      [datePickerClassNames.hidden]: !isOpen,
    },
  ];

  const defaultDialog = (
    <HtmlDivWithRef
      role="dialog"
      aria-hidden={!isOpen}
      className={classnames(...dialogClasses)}
      style={styles.popper}
      forwardedRef={setDialogElement}
      {...passProps}
    >
      {application}
      <div
        className={datePickerClassNames.popperArrow}
        style={styles.arrow}
        data-popper-arrow
        data-popper-placement={attributes.popper?.['data-popper-placement']}
      />
    </HtmlDivWithRef>
  );

  const smallScreenDialog = (
    <HtmlDiv
      aria-hidden={!isOpen}
      className={classnames(
        ...dialogClasses,
        datePickerClassNames.smallScreen,
        { [datePickerClassNames.smallScreenHidden]: !isOpen },
      )}
    >
      <HtmlDivWithRef
        role="dialog"
        forwardedRef={smallScreenAppRef}
        className={classnames(datePickerClassNames.smallScreenContainer, {
          [datePickerClassNames.smallScreenScroll]: smallScreenScroll,
        })}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        {...passProps}
      >
        <HtmlDivWithRef
          className={datePickerClassNames.slideIndicatorWrapper}
          forwardedRef={sliderWrapperRef}
        >
          <div className={datePickerClassNames.slideIndicator} />
        </HtmlDivWithRef>
        {application}
      </HtmlDivWithRef>
    </HtmlDiv>
  );

  if (!mountNode) {
    return null;
  }
  return (
    <>
      {ReactDOM.createPortal(
        smallScreen ? smallScreenDialog : defaultDialog,
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
