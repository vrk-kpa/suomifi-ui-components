import React, {
  forwardRef,
  ChangeEvent,
  ReactNode,
  ReactElement,
  useRef,
  useState,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { Debounce } from '../../utils/Debounce/Debounce';
import { getConditionalAriaProp } from '../../../utils/aria';
import {
  HTMLAttributesIncludingDataAttributes,
  forkRefs,
} from '../../../utils/common/common';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
} from '../../theme/utils/spacing';
import { HtmlInputProps, HtmlDiv, HtmlSpan, HtmlInput } from '../../../reset';
import { Label, LabelMode } from '../Label/Label';
import { StatusText } from '../StatusText/StatusText';
import { HintText } from '../HintText/HintText';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './TimeInput.baseStyles';

const baseClassName = 'fi-time-input';
export const timeInputClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  labelIsVisible: `${baseClassName}_label--visible`,
  icon: `${baseClassName}_with-icon`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputElement: `${baseClassName}_input`,
  styleWrapper: `${baseClassName}_wrapper`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
};

export interface TimeInputProps
  extends StatusTextCommonProps,
    MarginProps,
    Omit<HtmlInputProps, 'type' | 'onChange' | 'onBlur' | 'defaultValue'> {
  /** CSS class for custom styles */
  className?: string;
  /** Props passed to the outermost div element of the component */
  wrapperProps?: Omit<
    HTMLAttributesIncludingDataAttributes<HTMLDivElement>,
    'className'
  >;
  /** Disables the input */
  disabled?: boolean;
  /** Callback fired on input click */
  onClick?: () => void;
  /** Callback fired on input change */
  onChange?: (value: string) => void;
  /** Callback fired on input blur.
   * Notice that this function returns the string value of the input,
   * not the blur FocusEvent like in other input components in this library!
   */
  onBlur?: (inputValue: string) => void;
  /** Label for the input */
  labelText: ReactNode;
  /** Hides or shows the label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Placeholder text for the input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Hint text to be shown below the component */
  hintText?: string;
  /**
   * `'default'` | `'error'`
   *
   * Status of the component. Error status creates a red border around the input.
   * Always use a descriptive `statusText` with an error status.
   * @default default
   */
  status?: InputStatus;
  /**
   * Type of the input
   * @default text
   */
  /** HTML name attribute for the input */
  name?: string;
  /** Initial value for the input */
  defaultValue?: string;
  /** Controlled value */
  value?: string;
  /** Sets component's width to 100% of its parent */
  fullWidth?: boolean;
  /** Text to mark the field optional. Will be wrapped in parentheses and shown after `labelText` */
  optionalText?: string;
  /** Debounce time in milliseconds for onChange function. No debounce is applied if no value is given. */
  debounce?: number;
  /** Suomi.fi icon to be shown inside the input field */
  icon?: ReactElement;
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
}

const BaseTimeInput = (props: TimeInputProps) => {
  const {
    className,
    labelText,
    labelMode,
    onChange: propOnChange,
    onBlur: propOnBlur,
    wrapperProps,
    optionalText,
    status,
    statusText,
    hintText,
    visualPlaceholder,
    id,
    fullWidth,
    icon,
    value: controlledValue,
    defaultValue,
    forwardedRef,
    debounce,
    statusTextAriaLiveMode = 'assertive',
    'aria-describedby': ariaDescribedBy,
    tooltipComponent,
    ...rest
  } = props;
  const [marginProps, passProps] = separateMarginProps(rest);
  const marginStyle = spacingStyles(marginProps);

  const [inputValue, setInputValue] = useState(defaultValue || '');

  const inputRef = useRef<HTMLInputElement>(null);
  const definedRef = forwardedRef || null;

  // String is of type XX:YY or XX.YY where XX is 0-24 and YY is 0-59
  const isValidTimeString = (timeStr: string) => {
    if (timeStr.match(/^\d{1,2}.\d{2}$/) || timeStr.match(/^\d{1,2}:\d{2}$/)) {
      const parts = timeStr.split(timeStr.includes('.') ? '.' : ':');
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1], 10);
      if (hours >= 0 && hours < 25 && minutes >= 0 && minutes < 60) {
        return true;
      }
    }

    return false;
  };

  const handleOnBlur = () => {
    let adjustedInputValue = '';
    const inputValInt = parseInt(inputValue, 10);

    // Handle automatic filling of 1 or 2 characters: 14 --> 14.00.
    // Also remove leading zero from hours
    if (
      (inputValue.match(/^\d{1}$/) || inputValue.match(/^\d{2}$/)) &&
      inputValInt >= 0 &&
      inputValInt < 25
    ) {
      adjustedInputValue = `${inputValInt}.00`;
      setInputValue(adjustedInputValue);
    }

    // Handle automatic filling of 4 characters: 1400 --> 14.00
    // Also remove leading zero from hours
    else if (
      inputValue.match(/^\d{4}$/) &&
      isValidTimeString(
        `${inputValue[0]}${inputValue[1]}.${inputValue[2]}${inputValue[3]}`,
      )
    ) {
      const hoursInt = parseInt(`${inputValue[0]}${inputValue[1]}`, 10);
      adjustedInputValue = `${hoursInt}.${inputValue[2]}${inputValue[3]}`;
      setInputValue(adjustedInputValue);
    }

    // Remove leading zero from an otherwise valid time
    else if (isValidTimeString(inputValue) && inputValue[0] === '0') {
      adjustedInputValue = `${inputValue[1]}.${inputValue[3]}${inputValue[4]}`;
      setInputValue(adjustedInputValue);
    }

    // Change : to . in an otherwise valid time
    else if (isValidTimeString(inputValue)) {
      adjustedInputValue = inputValue.replace(':', '.');
      setInputValue(adjustedInputValue);
    }

    if (!!propOnBlur) {
      propOnBlur(adjustedInputValue || inputValue);
    }
  };

  const hintTextId = `${id}-hintText`;
  const statusTextId = `${id}-statusText`;
  return (
    <HtmlDiv
      {...wrapperProps}
      className={classnames(baseClassName, className, {
        [timeInputClassNames.disabled]: !!passProps.disabled,
        [timeInputClassNames.icon]: !!icon,
        [timeInputClassNames.error]: status === 'error',
        [timeInputClassNames.success]: status === 'success',
        [timeInputClassNames.fullWidth]: fullWidth,
      })}
      style={{ ...marginStyle, ...wrapperProps?.style }}
    >
      <HtmlSpan className={timeInputClassNames.styleWrapper}>
        <Label
          htmlFor={id}
          labelMode={labelMode}
          optionalText={optionalText}
          className={classnames({
            [timeInputClassNames.labelIsVisible]: labelMode !== 'hidden',
          })}
          tooltipComponent={tooltipComponent}
        >
          {labelText}
        </Label>
        <HintText id={hintTextId}>{hintText}</HintText>
        <HtmlDiv className={timeInputClassNames.inputElementContainer}>
          <Debounce waitFor={debounce}>
            {(debouncer: Function) => (
              <HtmlInput
                {...passProps}
                id={id}
                className={timeInputClassNames.inputElement}
                forwardedRef={forkRefs(inputRef, definedRef)}
                placeholder="-- . --"
                maxLength={5}
                {...{ 'aria-invalid': status === 'error' }}
                {...getConditionalAriaProp('aria-describedby', [
                  statusText ? statusTextId : undefined,
                  hintText ? hintTextId : undefined,
                  ariaDescribedBy,
                ])}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  if (propOnChange) {
                    debouncer(propOnChange, event.currentTarget.value);
                  }
                  setInputValue(event.currentTarget.value);
                }}
                onBlur={handleOnBlur}
                value={controlledValue || inputValue}
              />
            )}
          </Debounce>
          {icon}
        </HtmlDiv>
        <StatusText
          id={statusTextId}
          className={classnames({
            [timeInputClassNames.statusTextHasContent]: !!statusText,
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

const StyledTimeInput = styled(
  ({ theme, ...passProps }: TimeInputProps & SuomifiThemeProp) => (
    <BaseTimeInput {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const TimeInput = forwardRef<HTMLInputElement, TimeInputProps>(
  (props: TimeInputProps, ref: React.Ref<HTMLInputElement>) => {
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
