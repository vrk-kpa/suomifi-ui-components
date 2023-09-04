import React, {
  ReactNode,
  ReactElement,
  forwardRef,
  KeyboardEvent,
  useRef,
  useState,
  ChangeEvent,
} from 'react';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { AutoId } from '../../utils/AutoId/AutoId';
import { HtmlDiv, HtmlInput, HtmlSpan } from '../../../reset';
import styled from 'styled-components';
import { HTMLAttributesIncludingDataAttributes } from '../../../utils/common/common';
import { Label, LabelMode } from '../Label/Label';
import { baseStyles } from './TimeInput.baseStyles';
import { StatusTextCommonProps, InputStatus } from '../types';
import classnames from 'classnames';
import { HintText } from '../HintText/HintText';
import { StatusText } from '../StatusText/StatusText';
import { getConditionalAriaProp } from '../../../utils/aria';

export interface TimeInputProps
  extends StatusTextCommonProps,
    Omit<
      HTMLAttributesIncludingDataAttributes<HTMLDivElement>,
      'className' | 'onChange'
    > {
  /** Props passed to the outermost div element of the component */
  wrapperProps?: Omit<
    HTMLAttributesIncludingDataAttributes<HTMLDivElement>,
    'className'
  >;
  /** CSS class for custom styles */
  className?: string;
  /** Disables the input */
  disabled?: boolean;
  /** Callback fired on input click */
  onClick?: () => void;
  /** Callback fired on input change */
  onChange?: (value: string) => void;
  /** Callback fired on minutes input blur */
  onBlur?: () => void;
  /** Label for the input */
  labelText: ReactNode;
  /** Hides or shows the label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /**
   * Text attached to the hours input to provide additional context for assistive technology.
   * Value should be a localised version of 'hours'
   */
  ariaLabelHours: string;
  /**
   * Text attached to the minutes input to provide additional context for assistive technology.
   * Value should be a localised version of 'minutes'
   */
  ariaLabelMinutes: string;
  /** Hint text to be shown below the component */
  hintText?: string;
  /**
   * `'default'` | `'error'`
   *
   * Status of the component. Error state creates a red border around the Checkbox.
   * Always use a descriptive `statusText` with an error status.
   * @default default
   */
  status?: InputStatus;
  /** HTML name attribute for the input */
  name?: string;
  /** Controlled value */
  value?: string;
  /** Default value for non controlled input */
  defaultValue?: string;
  /** Text to mark the field optional. Will be wrapped in parentheses and shown after `labelText` */
  optionalText?: string;
  /** Ref is placed to the outermost div element of the component. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLDivElement>;
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
}

const baseClassName = 'fi-time-input';
const timeInputClassNames = {
  baseClassName,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  labelIsVisible: `${baseClassName}_label--visible`,
  inputContainer: `${baseClassName}_input-container`,
  hoursInputElementContainer: `${baseClassName}_hours-input-element-container`,
  minutesInputElementContainer: `${baseClassName}_minutes-input-element-container`,
  styleWrapper: `${baseClassName}_wrapper`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
  hoursInput: `${baseClassName}_hours-input`,
  minutesInput: `${baseClassName}_minutes-input`,
  hiddenInput: `${baseClassName}_hidden-input`,
  dotSeparator: `${baseClassName}_dot-separator`,
};

/**
 * Pad a one-char string with a leading zero
 */
const zeroPad = (value: string) => {
  if (value.length === 1) {
    return `0${value}`;
  }
  return value;
};

const incrementNumber = (
  min: number,
  max: number,
  current: number,
  modifier: number,
) => Math.max(Math.min(current + modifier, max), min);

const getHourAndMinuteValues = (value?: string): string[] | null => {
  const valueString = `${value}`;
  if (value && valueString.length > 0) {
    if (valueString.match(/^\d{2}.\d{2}$/)) {
      return valueString.split('.');
    }
  }
  return null;
};

const isShortNumericString = (inputValue: string): boolean =>
  inputValue.match(/^(\d{1,2})?$/) !== null;

const BaseTimeInput = (props: TimeInputProps) => {
  const {
    wrapperProps,
    className,
    labelText,
    labelMode,
    ariaLabelHours,
    ariaLabelMinutes,
    value,
    defaultValue,
    onChange: propOnChange,
    onClick: propOnClick,
    onBlur: propOnBlur,
    optionalText,
    status,
    statusText,
    hintText,
    id,
    disabled = false,
    forwardedRef,
    statusTextAriaLiveMode = 'assertive',
    'aria-describedby': ariaDescribedBy,
    tooltipComponent,
    ...passProps
  } = props;

  const hoursInputRef = useRef<HTMLInputElement>(null);
  const minutesInputRef = useRef<HTMLInputElement>(null);
  const hiddenInputRef = useRef<HTMLInputElement>(null);

  const hoursAndMinutes: string[] | null = getHourAndMinuteValues(
    defaultValue || value,
  );
  const [hours, setHours] = useState<string>(
    hoursAndMinutes ? hoursAndMinutes[0] : '',
  );
  const [minutes, setMinutes] = useState<string>(
    hoursAndMinutes ? hoursAndMinutes[1] : '',
  );
  const [timeString, setTimeString] = useState<string>(
    hoursAndMinutes ? hoursAndMinutes.join(':') : '',
  );

  const handleHoursInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowRight' && !event.shiftKey) {
      event.preventDefault();
      minutesInputRef.current?.focus();
    }

    console.log(hours);

    if (
      (event.key === 'ArrowUp' || event.key === 'ArrowDown') &&
      (isShortNumericString(hours) || hours === '')
    ) {
      event.preventDefault();
      const modifier = event.key === 'ArrowUp' ? 1 : -1;
      const hoursAsInt = parseInt(hours, 10) || 0;
      const newHours = String(incrementNumber(0, 23, hoursAsInt, modifier));
      updateTime(newHours, minutes);
    }
  };

  const handleMinutesInputKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === 'ArrowLeft' && !event.shiftKey) {
      event.preventDefault();
      hoursInputRef.current?.focus();
    }

    if (
      (event.key === 'ArrowUp' || event.key === 'ArrowDown') &&
      (isShortNumericString(minutes) || minutes === '')
    ) {
      event.preventDefault();
      const modifier = event.key === 'ArrowUp' ? 1 : -1;
      const minutesAsInt = parseInt(minutes, 10) || 0;
      const newMinutes = zeroPad(
        `${incrementNumber(0, 59, minutesAsInt, modifier)}`,
      );
      updateTime(hours, newMinutes);
    }

    if (event.key === 'Tab' && !event.shiftKey && !!propOnBlur) {
      propOnBlur();
    }
  };

  const updateTime = (newHours: string, newMinutes: string) => {
    setHours(newHours);
    setMinutes(newMinutes);
    const newTimeValue =
      newHours.length === 0 && newMinutes.length === 0
        ? ''
        : `${newHours}:${newMinutes}`;
    setTimeString(newTimeValue);
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    )?.set;
    if (nativeInputValueSetter) {
      nativeInputValueSetter.call(hiddenInputRef.current, newTimeValue);
      const event = new Event('input', { bubbles: true });
      hiddenInputRef.current?.dispatchEvent(event);
    }
  };

  const onHoursChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const hoursValue = event.target.value.slice(-2);
    updateTime(hoursValue, minutes);
  };

  const onMinutesChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const minutesValue = event.target.value.slice(-2);
    updateTime(hours, minutesValue);
  };

  const onHoursBlur: React.FocusEventHandler = () => {
    if (hours === '') return;
    if (hours.length > 1 && hours.startsWith('0')) {
      updateTime(hours[1], minutes);
    } else {
      updateTime(hours, minutes);
    }
  };

  const onMinutesBlur: React.FocusEventHandler = () => {
    if (minutes === '') return;
    updateTime(hours, zeroPad(minutes));
  };

  const labelId = `${id}-mainLabel`;
  const hintTextId = `${id}-hintText`;
  const statusTextId = `${id}-statusText`;

  return (
    <HtmlDiv
      {...wrapperProps}
      className={classnames(baseClassName, className, {
        [timeInputClassNames.disabled]: disabled,
        [timeInputClassNames.error]: status === 'error',
        [timeInputClassNames.success]: status === 'success',
      })}
    >
      <HtmlSpan className={timeInputClassNames.styleWrapper}>
        <Label
          id={labelId}
          labelMode={labelMode}
          optionalText={optionalText}
          className={classnames({
            [timeInputClassNames.labelIsVisible]: labelMode !== 'hidden',
          })}
          tooltipComponent={tooltipComponent}
          onClick={() => hoursInputRef.current?.focus()}
        >
          {labelText}
        </Label>

        <HintText id={hintTextId}>{hintText}</HintText>
        <HtmlDiv
          className={timeInputClassNames.inputContainer}
          onClick={propOnClick}
        >
          <HtmlDiv className={timeInputClassNames.hoursInputElementContainer}>
            <HtmlInput
              aria-hidden
              readOnly
              tabIndex={-1}
              className={timeInputClassNames.hiddenInput}
              id={id}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                if (!!propOnChange) {
                  propOnChange(event.target.value);
                }
              }}
              forwardedRef={hiddenInputRef}
              value={timeString}
              {...passProps}
            />
            <HtmlInput
              value={hours}
              inputMode="numeric"
              placeholder="--"
              className={timeInputClassNames.hoursInput}
              maxLength={2}
              disabled={disabled}
              forwardedRef={hoursInputRef}
              {...{ 'aria-invalid': status === 'error' }}
              aria-label={`${labelText} - ${ariaLabelHours}`}
              {...getConditionalAriaProp('aria-describedby', [
                statusText ? statusTextId : undefined,
                hintText ? hintTextId : undefined,
                ariaDescribedBy,
              ])}
              onKeyDown={handleHoursInputKeyDown}
              onChange={onHoursChange}
              onBlur={onHoursBlur}
            />
          </HtmlDiv>
          <HtmlDiv className={timeInputClassNames.dotSeparator}>.</HtmlDiv>
          <HtmlDiv className={timeInputClassNames.minutesInputElementContainer}>
            <HtmlInput
              value={minutes}
              inputMode="numeric"
              placeholder="--"
              className={timeInputClassNames.minutesInput}
              maxLength={2}
              disabled={disabled}
              forwardedRef={minutesInputRef}
              {...{ 'aria-invalid': status === 'error' }}
              aria-label={`${labelText} - ${ariaLabelMinutes}`}
              {...getConditionalAriaProp('aria-describedby', [
                statusText ? statusTextId : undefined,
                hintText ? hintTextId : undefined,
                ariaDescribedBy,
              ])}
              onKeyDown={handleMinutesInputKeyDown}
              onChange={onMinutesChange}
              onBlur={onMinutesBlur}
            />
          </HtmlDiv>
        </HtmlDiv>
        <StatusText
          id={statusTextId}
          className={classnames({
            [timeInputClassNames.statusTextHasContent]: !!statusText,
          })}
          status={status}
          ariaLiveMode={statusTextAriaLiveMode}
          disabled={disabled}
        >
          {statusText}
        </StatusText>
      </HtmlSpan>
    </HtmlDiv>
  );
};

const StyledTimeInput = styled(
  ({ theme, ...passProps }: TimeInputProps & SuomifiThemeProp) => (
    <BaseTimeInput {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const TimeInput = forwardRef<HTMLDivElement, TimeInputProps>(
  (props: TimeInputProps, ref: React.Ref<HTMLDivElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledTimeInput
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

TimeInput.displayName = 'TimeInput';
export { TimeInput };
