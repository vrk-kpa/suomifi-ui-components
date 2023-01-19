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
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { Debounce } from '../../utils/Debounce/Debounce';
import { getConditionalAriaProp } from '../../../utils/aria';
import {
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
  HtmlSpan,
  HtmlInput,
  HtmlButton,
} from '../../../reset';
import { DatePicker } from './DatePicker/DatePicker';
import { Label, LabelMode } from '../Label/Label';
import { StatusText } from '../StatusText/StatusText';
import { HintText } from '../HintText/HintText';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { Icon } from '../../Icon/Icon';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './DateInput.baseStyles';
import {
  datePickerDefaultTexts,
  DatePickerTextProps,
  InternalDatePickerTextProps,
} from './datePickerTexts';
import {
  defaultDateAdapter,
  yearsForward,
  yearsBack,
  DateAdapter,
  dayIsInMonthRange,
  cellDateAriaLabel,
} from './dateUtils';
import { getLogger } from '../../../utils/log';

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
  /** Language for date picker default texts. Language supports Finnish, English, and Swedish.
   * @default 'fi'
   */
  language?: 'fi' | 'en' | 'sv';
  /** Minimum month user can select from date picker. By default ten years before current date. */
  minMonth?: Date;
  /** Maximum month user can select from date picker. By default ten years after current date. */
  maxMonth?: Date;
  /** Initial date to focus when date picker is opened. By default the current month. */
  initialMonth?: Date;
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
}
export interface DateInputProps
  extends StatusTextCommonProps,
    Omit<HtmlInputProps, 'type' | 'onChange'> {
  /** TextInput container div class name for custom styling. */
  className?: string;
  /** TextInput wrapping div element props */
  wrapperProps?: Omit<HtmlDivProps, 'className'>;
  /** Disable input usage */
  disabled?: boolean;
  /** Callback fired when input is clicked. */
  onClick?: () => void;
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

const BaseDateInput = (props: DateInputProps & DatePickerProps) => {
  const {
    className,
    labelText,
    labelMode,
    onChange: propOnChange,
    wrapperProps,
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
    datePickerTexts = undefined,
    language = 'fi',
    dateAdapter = defaultDateAdapter(),
    minMonth = yearsBack(10),
    maxMonth = yearsForward(10),
    initialMonth,
    tooltipComponent,
    ...passProps
  } = props;

  const hintTextId = `${id}-hintText`;

  const statusTextId = `${id}-statusText`;

  const inputRef = useRef<HTMLInputElement>();
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [buttonDateLabel, setButtonDateLabel] = useState<string>('');
  const [datePickerDate, setDatePickerDate] = useState<Date | null>(null);
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false);
  const [texts, setTexts] = useState<InternalDatePickerTextProps>(
    datePickerDefaultTexts.fi,
  );

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
          `${texts.selectedDateLabel} ${cellDateAriaLabel(date, texts)}`,
        );
      }
    }
  }, [value, inputValue]);

  useEffect(() => {
    setTexts({ ...datePickerDefaultTexts[language], ...datePickerTexts });
  }, [language, datePickerTexts]);

  const toggleCalendar = (open: boolean, focus: boolean = false) => {
    setCalendarVisible(open);

    if (open && inputRef.current?.value) {
      updateDatePickerDate(inputRef.current?.value);
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
    if (!dayIsInMonthRange(date, minMonth, maxMonth)) {
      getLogger().warn(
        `Date input value "${newValue}" is not within interval [minMonth, maxMonth]`,
      );
      return null;
    }
    return date;
  };

  const updateDatePickerDate = (newValue: string) => {
    const date = validateDatePickerValue(newValue);
    setDatePickerDate(date);
  };

  const onDatePickerChange = (date: Date) => {
    const newValue = dateAdapter.format(date);
    conditionalSetInputValue(newValue);
    if (propOnChange) {
      propOnChange({ value: newValue, date });
    }
  };

  return (
    <HtmlDiv
      {...wrapperProps}
      className={classnames(baseClassName, className, {
        [dateInputClassNames.disabled]: !!passProps.disabled,
        [dateInputClassNames.error]: status === 'error',
        [dateInputClassNames.success]: status === 'success',
        [dateInputClassNames.fullWidth]: fullWidth,
        [dateInputClassNames.hasPicker]: datePickerEnabled,
      })}
    >
      <HtmlSpan className={dateInputClassNames.styleWrapper}>
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
                  forwardedRef={inputRef}
                  placeholder={visualPlaceholder}
                  {...{ 'aria-invalid': status === 'error' }}
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
          <HtmlDiv className={dateInputClassNames.pickerElementContainer}>
            {datePickerEnabled && (
              <>
                <HtmlButton
                  forwardedRef={openButtonRef}
                  className={classnames(dateInputClassNames.pickerButton, {
                    [dateInputClassNames.pickerButtonDisabled]:
                      passProps.disabled,
                  })}
                  onClick={() => toggleCalendar(!calendarVisible)}
                  disabled={passProps.disabled}
                >
                  <VisuallyHidden>
                    {texts.openButtonLabel}
                    {buttonDateLabel}
                  </VisuallyHidden>
                  <Icon
                    className={dateInputClassNames.pickerIcon}
                    aria-hidden={true}
                    icon="calendar"
                  />
                </HtmlButton>
                <DatePicker
                  sourceRef={inputRef}
                  openButtonRef={openButtonRef}
                  isOpen={calendarVisible}
                  onClose={(focus) => toggleCalendar(false, focus)}
                  onChange={(eventValue) => onDatePickerChange(eventValue)}
                  initialMonth={datePickerDate || initialMonth}
                  texts={texts}
                  minMonth={minMonth}
                  maxMonth={maxMonth}
                />
              </>
            )}
          </HtmlDiv>
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
      </HtmlSpan>
    </HtmlDiv>
  );
};

const StyledDateInput = styled(
  ({
    theme,
    ...passProps
  }: DateInputProps & DatePickerProps & SuomifiThemeProp) => (
    <BaseDateInput {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting date.
 * Can be used as an input field or with an additional DatePicker.
 *
 * Props other than specified explicitly are passed on to underlying input element.
 * @component
 */
const DateInput = forwardRef<
  HTMLInputElement,
  DateInputProps & DatePickerProps
>(
  (
    props: DateInputProps & DatePickerProps,
    ref: React.Ref<HTMLInputElement>,
  ) => {
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
