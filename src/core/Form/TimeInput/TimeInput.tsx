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
  autocompleteTimeString,
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
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  labelIsVisible: `${baseClassName}_label--visible`,
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
  /** Hint text to be shown below the component's label */
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
  /** Tooltip component for the input's label */
  tooltipComponent?: ReactElement;
}

const BaseTimeInput = (props: TimeInputProps) => {
  const {
    className,
    labelText,
    labelMode,
    visualPlaceholder,
    onChange: propOnChange,
    onBlur: propOnBlur,
    wrapperProps,
    optionalText,
    status,
    statusText,
    hintText,
    id,
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

  const handleOnBlur = () => {
    const adjustedValue = autocompleteTimeString(inputValue);
    if (adjustedValue) {
      setInputValue(adjustedValue);
    }

    if (!!propOnBlur) {
      propOnBlur(adjustedValue || inputValue);
    }
  };

  const hintTextId = `${id}-hintText`;
  const statusTextId = `${id}-statusText`;
  return (
    <HtmlDiv
      {...wrapperProps}
      className={classnames(baseClassName, className, {
        [timeInputClassNames.disabled]: !!passProps.disabled,
        [timeInputClassNames.error]: status === 'error',
        [timeInputClassNames.success]: status === 'success',
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
                placeholder={visualPlaceholder}
                forwardedRef={forkRefs(inputRef, definedRef)}
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
