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
} from './dateUtils';

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
  /** Minimum date user can select from date picker. By default ten years before current date. */
  minDate?: Date;
  /** Maximum date user can select from date picker. By default ten years after current date. */
  maxDate?: Date;
  /** Initial date to focus when date picker is opened. By default the current date. */
  initialDate?: Date;
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
  /** Event handler to execute when clicked */
  onClick?: () => void;
  /** To execute on input value change. If value can't be parsed to date, Invalid Date is returned.
   * Invalid Date is a Date, whose time value is NaN. */
  onChange?: (change: { value: string; date: Date }) => void;
  /** To execute on input text onBlur */
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
    minDate = yearsBack(10),
    maxDate = yearsForward(10),
    initialDate,
    tooltipComponent,
    ...passProps
  } = props;

  const hintTextId = `${id}-hintText`;

  const statusTextId = `${id}-statusText`;

  const inputRef = useRef<HTMLInputElement>();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const [inputValue, setInputValue] = useState<string>('');
  const [inputDate, setInputDate] = useState<Date | null>(null);
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
    setTexts({ ...datePickerDefaultTexts[language], ...datePickerTexts });
  }, [language, datePickerTexts]);

  const onCalendarOpen = (isCalendarOpen: boolean) => {
    setCalendarVisible(isCalendarOpen);

    if (isCalendarOpen && inputRef.current?.value) {
      updateInputValue(inputRef.current?.value);
    }

    if (!isCalendarOpen) {
      buttonRef.current?.focus();
    }
  };

  const conditionalSetInputValue = (newValue: string) => {
    if (!('value' in props)) {
      setInputValue(newValue);
    }
  };

  const updateInputValue = (newValue: string) => {
    const date = dateAdapter.parse(newValue);
    if (Number.isNaN(date.valueOf())) {
      setInputDate(null);
    } else {
      setInputDate(date);
    }
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
                  forwardedRef={buttonRef}
                  className={classnames(dateInputClassNames.pickerButton, {
                    [dateInputClassNames.pickerButtonDisabled]:
                      passProps.disabled,
                  })}
                  onClick={() => onCalendarOpen(!calendarVisible)}
                  disabled={passProps.disabled}
                >
                  <VisuallyHidden>{texts.openButtonLabel}</VisuallyHidden>
                  <Icon
                    className={dateInputClassNames.pickerIcon}
                    aria-hidden={true}
                    icon="calendar"
                  />
                </HtmlButton>
                <DatePicker
                  sourceRef={inputRef}
                  buttonRef={buttonRef}
                  isCalendarOpen={calendarVisible}
                  onClose={() => onCalendarOpen(false)}
                  onChange={(eventValue) => onDatePickerChange(eventValue)}
                  initialDate={inputDate || initialDate}
                  texts={texts}
                  minDate={minDate}
                  maxDate={maxDate}
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
