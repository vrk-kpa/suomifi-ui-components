import React, {
  forwardRef,
  ChangeEvent,
  FocusEvent,
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
    Omit<HtmlInputProps, 'type' | 'onChange' | 'defaultValue'> {
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
  /** Callback fired on input blur */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
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
   * Status of the component. Error state creates a red border around the Checkbox.
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
    ...passProps
  } = props;

  const [inputValue, setInputValue] = useState(defaultValue || '');

  const inputRef = useRef<HTMLInputElement>(null);
  const definedRef = forwardedRef || null;

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    const inputValInt = parseInt(inputValue, 10);

    // Handle automatic filling of 1 or 2 characters: 14 --> 14.00.
    // Also remove leading zero from hours which are under 10
    if (inputValue.length <= 2 && !Number.isNaN(inputValue)) {
      if (inputValInt >= 0 && inputValInt < 25) {
        setInputValue(`${inputValInt}.00`);
      }
    }

    // Handle automatic filling of 4 characters: 1400 --> 14.00
    if (
      inputValue.length === 4 &&
      !Number.isNaN(inputValue) &&
      /^\d+$/.test(inputValue)
    ) {
      if (inputValInt >= 0 && inputValInt < 2500) {
        setInputValue(
          `${inputValue[0]}${inputValue[1]}.${inputValue[2]}${inputValue[3]}`,
        );
      }
    }

    if (!!propOnBlur) {
      propOnBlur(event);
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
                placeholder={visualPlaceholder}
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

                  if (event.currentTarget.value.includes(':')) {
                    setInputValue(event.currentTarget.value.replace(':', '.'));
                  } else {
                    setInputValue(event.currentTarget.value);
                  }
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
