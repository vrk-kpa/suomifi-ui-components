import React, {
  forwardRef,
  ChangeEvent,
  FocusEvent,
  ReactNode,
  ReactElement,
  useEffect,
  useState,
  useRef,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { IconCalendar } from 'suomifi-icons';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { Debounce } from '../../utils/Debounce/Debounce';
import { getConditionalAriaProp } from '../../../utils/aria';
import { getLogger } from '../../../utils/log';
import { forkRefs } from '../../../utils/common/common';
import { HtmlInputProps, HtmlDiv, HtmlInput, HtmlButton } from '../../../reset';
import { DatePicker } from './DatePicker/DatePicker';
import { Label, LabelMode } from '../Label/Label';
import { StatusText } from '../StatusText/StatusText';
import { HintText } from '../HintText/HintText';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './DateInput.baseStyles';
import {
  datePickerDefaultTexts,
  DatePickerTextProps,
  InternalDatePickerTextProps,
  Language,
  defaultLanguage,
  languages,
} from './datePickerTexts';
import {
  defaultDateAdapter,
  moveYears,
  DateAdapter,
  dayIsInRange,
  firstDayOfMonth,
  lastDayOfMonth,
  cellDateAriaLabel,
} from './dateUtils';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';

const baseClassName = 'fi-date-input';
export const dateInputClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
  hasPicker: `${baseClassName}--has-picker`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  labelIsVisible: `${baseClassName}_label--visible`,
  inputAndPickerWrapper: `${baseClassName}_input-and-picker-wrapper`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputElement: `${baseClassName}_input`,
  pickerElementContainer: `${baseClassName}_picker-element-container`,
  pickerButton: `${baseClassName}_picker-button`,
  pickerButtonDisabled: `${baseClassName}_picker-button--disabled`,
  pickerIcon: `${baseClassName}_picker-icon`,
  styleWrapper: `${baseClassName}_wrapper`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
};

export interface DatePickerProps {
  /** Enables date picker for date input.
   * @default false
   */
  datePickerEnabled?: boolean;
  /**
   * Enables small screen version of calendar
   * @default false
   */
  smallScreen?: boolean;
  /**
   * Custom texts for date picker to use instead of language based texts.
   * <pre>
   * DatePickerTextProps {
   *  openButtonLabel?: string;
   *  selectedDateLabel?: string;
   *  closeButtonText?: string;
   *  selectButtonText?: string;
   *  yearSelectLabel?: string;
   *  monthSelectLabel?: string;,
   *  nextMonthButtonLabel?: string;
   *  prevMonthButtonLabel?: string;
   *  monthNames?: [
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *  ];
   *  weekDays?: [
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *  ];
   *  weekDayAbbreviations?: [
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *    string,
   *  ];
   * }
   * </pre>
   */
  datePickerTexts?: DatePickerTextProps;
  /** Language for date picker default texts. Language support is for Finnish, English, and Swedish.
   * @default 'fi'
   */
  language?: Language;
  /** Minimum date user can select from date picker. By default first day of month ten years before current date. */
  minDate?: Date;
  /** Maximum date user can select from date picker. By default last day of month ten years after current date. */
  maxDate?: Date;
  /** Initial date to focus when date picker is opened. By default the current date. */
  initialDate?: Date;
  /** Callback fired to disable dates inside the [minDate, maxDate] range. */
  shouldDisableDate?: (date: Date) => boolean;
  /**
   * Enables custom formatting and parsing for date picker. By default date format is like '1.1.2022'.
   * If value can't be parsed to date, Invalid Date is returned. Invalid Date is a Date, whose time value is NaN.
   * <pre>
   * DateAdapter {
   *   format: (date: Date) => string;
   *   parse: (value: string) => Date;
   * }
   * </pre>
   */
  dateAdapter?: DateAdapter;
  /** Callback fired on datepicker button blur
   * @param {FocusEvent<HTMLButtonElement>} event FocusEvent
   */
  onDatePickerButtonBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
}
export interface DateInputProps
  extends DatePickerProps,
    MarginProps,
    StatusTextCommonProps,
    Omit<HtmlInputProps, 'type' | 'onChange' | 'onClick' | 'onBlur'> {
  /** DateInput container div class name for custom styling. */
  className?: string;
  /** Disable input usage */
  disabled?: boolean;
  /** Callback fired when input is clicked. */
  onClick?: (event?: React.MouseEvent<HTMLInputElement>) => void;
  /** Callback fired when input value changes. If value can't be parsed to date, Invalid Date is returned.
   * Invalid Date is a Date, whose time value is NaN.´
   * @param {string} change.value Input value
   * @param {Date} change.date Input value parsed to Date */

  onChange?: (change: { value: string; date: Date }) => void;
  /** Callback fired on input text onBlur
   * @param {FocusEvent<HTMLInputElement>} event FocusEvent
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Label for the input */
  labelText: ReactNode;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Hint text for input. Date input should show hint for formatting date, for example 'Use format D.M.YYYY'. */
  hintText?: string;
  /**
   * 'default' | 'error' | 'success'
   * @default default
   */
  status?: InputStatus;
  /** Controlled value */
  value?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Text to mark a field optional. Will be wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /** Debounce time in milliseconds for onChange function. No debounce is applied if no value is given. */
  debounce?: number;
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
}

const BaseDateInput = (props: DateInputProps) => {
  const {
    className,
    labelText,
    labelMode,
    onChange: propOnChange,
    onDatePickerButtonBlur,
    optionalText,
    status,
    statusText,
    hintText,
    visualPlaceholder,
    id,
    fullWidth,
    forwardedRef,
    debounce,
    statusTextAriaLiveMode = 'assertive',
    'aria-describedby': ariaDescribedBy,
    defaultValue,
    value,
    datePickerEnabled = false,
    smallScreen = false,
    datePickerTexts = undefined,
    language = defaultLanguage,
    dateAdapter = defaultDateAdapter(),
    shouldDisableDate,
    minDate = moveYears(firstDayOfMonth(new Date()), -10),
    maxDate = moveYears(lastDayOfMonth(new Date()), 10),
    initialDate,
    tooltipComponent,
    style,
    ...rest
  } = props;
  const [marginProps, passProps] = separateMarginProps(rest);
  const marginStyle = spacingStyles(marginProps);

  const hintTextId = `${id}-hintText`;

  const statusTextId = `${id}-statusText`;

  const inputRef = useRef<HTMLInputElement>();
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [buttonDateLabel, setButtonDateLabel] = useState<string>('');
  const [inputValueAsDate, setInputValueAsDate] = useState<Date | null>(null);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [texts, setTexts] = useState<InternalDatePickerTextProps>(
    datePickerDefaultTexts.fi,
  );

  // Remove the possibility to have undefined forwardedRef as a parameter for forkRefs
  const definedRef = forwardedRef || null;

  useEffect(() => {
    if (defaultValue) {
      setInputValue(String(defaultValue));
    }
  }, []);

  useEffect(() => {
    // Update open button's aria label if input has a valid date
    const useValue = 'value' in props && value ? value : inputValue;
    if (useValue) {
      const date = validateDatePickerValue(useValue);
      if (date) {
        setButtonDateLabel(
          `${texts.openButtonLabel}, ${
            texts.selectedDateLabel
          } ${cellDateAriaLabel(date, texts)}`,
        );
      }
    }
  }, [value, inputValue]);

  useEffect(() => {
    let lang: Language;
    if (languages.includes(language)) {
      lang = language;
    } else {
      lang = defaultLanguage;
      getLogger().warn(`Language "${language}" is not supported`);
    }
    setTexts({ ...datePickerDefaultTexts[lang], ...datePickerTexts });
  }, [language, datePickerTexts]);

  const toggleCalendar = (open: boolean, focus: boolean = false) => {
    setCalendarVisible(open);

    if (open) {
      updateInputValueAsDate(inputRef.current?.value || null);
    }

    if (!open && focus) {
      openButtonRef.current?.focus();
    }
  };

  const conditionalSetInputValue = (newValue: string) => {
    if (!('value' in props)) {
      setInputValue(newValue);
    }
  };

  const validateDatePickerValue = (newValue: string): Date | null => {
    const date = dateAdapter.parse(newValue);
    if (Number.isNaN(date.valueOf())) {
      getLogger().warn(
        `Date input value "${newValue}" could not be parsed to Date`,
      );
      return null;
    }
    if (!dayIsInRange(date, minDate, maxDate)) {
      getLogger().warn(
        `Date input value "${newValue}" is not within interval [minDate, maxDate]`,
      );
      return null;
    }
    return date;
  };

  const updateInputValueAsDate = (newValue: string | null) => {
    if (newValue === null) {
      setInputValueAsDate(newValue);
    } else {
      const date = validateDatePickerValue(newValue);
      setInputValueAsDate(date);
    }
  };

  const onDatePickerChange = (date: Date) => {
    if (passProps.disabled) {
      return;
    }
    const newValue = dateAdapter.format(date);
    conditionalSetInputValue(newValue);
    if (propOnChange) {
      propOnChange({ value: newValue, date });
    }
  };

  return (
    <HtmlDiv
      className={classnames(baseClassName, className, {
        [dateInputClassNames.disabled]: !!passProps.disabled,
        [dateInputClassNames.error]: status === 'error',
        [dateInputClassNames.success]: status === 'success',
        [dateInputClassNames.fullWidth]: fullWidth,
        [dateInputClassNames.hasPicker]: datePickerEnabled,
      })}
      style={{ ...marginStyle, ...style }}
    >
      <HtmlDiv className={dateInputClassNames.styleWrapper}>
        <Label
          htmlFor={id}
          labelMode={labelMode}
          optionalText={optionalText}
          className={classnames({
            [dateInputClassNames.labelIsVisible]: labelMode !== 'hidden',
          })}
          tooltipComponent={tooltipComponent}
        >
          {labelText}
        </Label>
        <HintText id={hintTextId}>{hintText}</HintText>
        <HtmlDiv className={dateInputClassNames.inputAndPickerWrapper}>
          <HtmlDiv className={dateInputClassNames.inputElementContainer}>
            <Debounce waitFor={debounce}>
              {(debouncer: Function) => (
                <HtmlInput
                  autoComplete="off"
                  {...passProps}
                  value={'value' in props ? value : inputValue}
                  id={id}
                  className={dateInputClassNames.inputElement}
                  forwardedRef={forkRefs(inputRef, definedRef)}
                  placeholder={visualPlaceholder}
                  aria-invalid={status === 'error' ? true : undefined}
                  {...getConditionalAriaProp('aria-describedby', [
                    statusText ? statusTextId : undefined,
                    hintText ? hintTextId : undefined,
                    ariaDescribedBy,
                  ])}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    const eventValue = event.currentTarget.value;
                    conditionalSetInputValue(eventValue);
                    if (propOnChange) {
                      debouncer(propOnChange, {
                        value: eventValue,
                        date: dateAdapter.parse(eventValue),
                      });
                    }
                  }}
                />
              )}
            </Debounce>
          </HtmlDiv>
          {datePickerEnabled && (
            <HtmlDiv className={dateInputClassNames.pickerElementContainer}>
              <HtmlButton
                forwardedRef={openButtonRef}
                className={classnames(dateInputClassNames.pickerButton, {
                  [dateInputClassNames.pickerButtonDisabled]:
                    passProps.disabled,
                })}
                onClick={() => toggleCalendar(!calendarVisible)}
                disabled={passProps.disabled}
                onBlur={(event) => {
                  if (!!onDatePickerButtonBlur) {
                    onDatePickerButtonBlur(event);
                  }
                }}
              >
                <VisuallyHidden>
                  {buttonDateLabel || texts.openButtonLabel}
                </VisuallyHidden>
                <IconCalendar
                  className={dateInputClassNames.pickerIcon}
                  aria-hidden={true}
                />
              </HtmlButton>
              <DatePicker
                openButtonRef={openButtonRef}
                isOpen={calendarVisible}
                onClose={(focus) => toggleCalendar(false, focus)}
                onChange={(eventValue) => onDatePickerChange(eventValue)}
                shouldDisableDate={shouldDisableDate}
                initialDate={initialDate}
                inputValue={inputValueAsDate}
                texts={texts}
                minDate={minDate}
                maxDate={maxDate}
                smallScreen={smallScreen}
              />
            </HtmlDiv>
          )}
        </HtmlDiv>
        <StatusText
          id={statusTextId}
          className={classnames({
            [dateInputClassNames.statusTextHasContent]: !!statusText,
          })}
          status={status}
          ariaLiveMode={statusTextAriaLiveMode}
          disabled={passProps.disabled}
        >
          {statusText}
        </StatusText>
      </HtmlDiv>
    </HtmlDiv>
  );
};

const StyledDateInput = styled(
  ({ theme, ...passProps }: DateInputProps & SuomifiThemeProp) => (
    <BaseDateInput {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  (props: DateInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledDateInput
                theme={suomifiTheme}
                id={id}
                forwardedRef={ref}
                {...passProps}
              />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  },
);

DateInput.displayName = 'DateInput';
export { DateInput };
