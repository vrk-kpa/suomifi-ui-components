import React, { useState, useEffect } from 'react';
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

const baseClassName = 'fi-date-picker';

export const datePickerClassNames = {
  baseClassName,
  hidden: `${baseClassName}--hidden`,
  bottomContainer: `${baseClassName}_bottom-container`,
  bottomButton: `${baseClassName}_bottom-button`,
};

export interface InternalDatePickerProps
  extends Omit<DatePickerProps, 'datePickerEnabled'> {
  /** Source ref for positioning the popover next to calendar button */
  sourceRef: React.RefObject<any>;
  /** Button ref for closing dialog on button click when dialog is open */
  buttonRef: React.RefObject<any>;
  /** Boolean to open or close calendar dialog */
  isCalendarOpen: boolean;
  /** Callback for changing calendar visibility */
  onClose: () => void;
  /** Callback for date select  */
  onChange: (date: Date) => void;
  /** Texts for date picker  */
  texts: InternalDatePickerTextProps;
  /** Styled component className */
  className?: string;
  minDate: Date;
  maxDate: Date;
}

export const BaseDatePicker = (props: InternalDatePickerProps) => {
  const {
    sourceRef,
    buttonRef,
    isCalendarOpen,
    onClose,
    onChange,
    className,
    texts,
    initialDate,
    minDate,
    maxDate,
  } = props;

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [dialogElement, setDialogElement] = useState<HTMLElement | null>(null);
  const [hasPopperEventListeners, setHasPopperEventListeners] =
    useState<boolean>(false);
  const [focusedDate, setFocusedDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEnhancedEffect(() => {
    setMountNode(window.document.body);
  }, []);

  useEffect(() => {
    if (initialDate) {
      // TODO: Check that min <= initialDate => max
      // TODO: Focus to initial date element
      setFocusedDate(initialDate);
    }
  }, [initialDate]);

  useEffect(() => {
    if (isCalendarOpen) {
      setHasPopperEventListeners(true);
      const globalClickHandler = (nativeEvent: MouseEvent) => {
        const element = nativeEvent.target as Element;
        if (
          !dialogElement?.contains(nativeEvent.target as Node) &&
          !buttonRef?.current?.contains(nativeEvent.target as Node) &&
          /* Dropdown list is rendered outside of dialog
          to a <reach-portal> that is not accessible with ref */
          !element.classList.contains(selectorsClassNames.dropdownItem) &&
          !element.classList.contains(selectorsClassNames.dropdown)
        ) {
          onClose();
        }
      };
      document.addEventListener('click', globalClickHandler, {
        capture: true,
      });
      return () => {
        document.removeEventListener('click', globalClickHandler, {
          capture: true,
        });
      };
    }
    setHasPopperEventListeners(false);
  }, [isCalendarOpen]);

  const { styles } = usePopper(sourceRef.current, dialogElement, {
    strategy: 'fixed',
    modifiers: [
      { name: 'eventListeners', enabled: hasPopperEventListeners },
      {
        name: 'offset',
        options: {
          offset: [0, 10],
        },
      },
    ],
    placement: 'bottom-start',
  });

  const handleConfirm = (): void => {
    onClose();
    onChange(focusedDate);
  };

  const handleDateFocus = (date: Date): void => {
    setFocusedDate(date);
  };

  const handleDateSelect = (date: Date): void => {
    setSelectedDate(date);
    setFocusedDate(date);
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
            [datePickerClassNames.hidden]: !isCalendarOpen,
          })}
          style={styles.popper}
          forwardedRef={setDialogElement}
        >
          <DateSelectors
            focusedDate={focusedDate}
            texts={texts}
            onChange={handleDateFocus}
            minDate={minDate}
            maxDate={maxDate}
          />
          <MonthTable
            texts={texts}
            focusedDate={focusedDate}
            selectedDate={selectedDate}
            onSelect={handleDateSelect}
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
              onClick={onClose}
              className={datePickerClassNames.bottomButton}
            >
              {texts.closeButtonText}
            </Button>
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
