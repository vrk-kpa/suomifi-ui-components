import React, {
  forwardRef,
  Component,
  ChangeEvent,
  FocusEvent,
  ReactNode,
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
} from '../../../reset';
import { Label, LabelMode } from '../Label/Label';
import { StatusText } from '../StatusText/StatusText';
import { HintText } from '../HintText/HintText';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './DateInput.baseStyles';

const baseClassName = 'fi-date-input';
export const dateInputClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  labelIsVisible: `${baseClassName}_label--visible`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputElement: `${baseClassName}_input`,
  styleWrapper: `${baseClassName}_wrapper`,
  statusTextHasContent: `${baseClassName}_statusText--has-content`,
};

type DateInputValue = string | undefined;

type DatePickerProps =
  | {
      datePickerDisabled: true | undefined;
    }
  | {
      /** Hides date picker from date input. */
      datePickerDisabled: false;
      /** Aria-label for calendar button that opens the date picker. Required if date picker is enabled. */
      openButtonLabel: string;
      /** Text for close button. Required if date picker is enabled. */
      closeButtonText: string;
      /** Text for date selection button. Required if date picker is enabled. */
      selectButtonText: string;
      /** Aria-label for year select. Required if date picker is enabled. */
      yearSelectLabel: string;
      /** Aria-label for month select. Required if date picker is enabled. */
      monthSelectLabel: string;
      /** Aria-label for moving to next month Required if date picker is enabled. */
      nextMonthButtonLabel: string;
      /** Aria-label for moving to previous month. Required if date picker is enabled. */
      prevMonthButtonLabel: string;
      /** Language for date picker's week days and months. For example 'fi'.
       * @see date-fns locale code
       */
      language: string;
      /** Date format for the date selected with date picker, for example 'd.M.yyyy'.
       * @see date-fns format
       */
      dateFormat: string;
      /** Minimum date user can select from date picker. Required if date picker is enabled. */
      minDate?: Date;
      /** Maximum date user can select from date picker. */
      maxDate?: Date;
      /** Initial month to show when date picker is opened. By default current month. */
      initialMonth?: Date;
    };

interface InternalDateInputProps
  extends StatusTextCommonProps,
    Omit<HtmlInputProps, 'onChange'> {
  /** TextInput container div class name for custom styling. */
  className?: string;
  /** TextInput wrapping div element props */
  wrapperProps?: Omit<HtmlDivProps, 'className'>;
  /** Disable input usage */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: () => void;
  /** To execute on input text change */
  onChange?: (value: DateInputValue) => void;
  /** To execute on input text onBlur */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Label */
  labelText: ReactNode;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Hint text to be shown below the component */
  hintText?: string;
  /**
   * 'default' | 'error' | 'success'
   * @default default
   */
  status?: InputStatus;
  /** Controlled value */
  value?: DateInputValue;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Text to mark a field optional. Will be wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /** Debounce time in milliseconds for onChange function. No debounce is applied if no value is given. */
  debounce?: number;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLInputElement>;
}

export type DateInputProps = InternalDateInputProps & {
  /** Ref object to be passed to the input element */
  ref?: React.RefObject<HTMLInputElement>;
} & DatePickerProps;

class BaseDateInput extends Component<DateInputProps & InnerRef> {
  render() {
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
      datePickerDisabled = true,
      ...passProps
    } = this.props;

    const hintTextId = `${id}-hintText`;
    const statusTextId = `${id}-statusText`;
    return (
      <HtmlDiv
        {...wrapperProps}
        className={classnames(baseClassName, className, {
          [dateInputClassNames.disabled]: !!passProps.disabled,
          [dateInputClassNames.error]: status === 'error',
          [dateInputClassNames.success]: status === 'success',
          [dateInputClassNames.fullWidth]: fullWidth,
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
          >
            {labelText}
          </Label>
          <HintText id={hintTextId}>{hintText}</HintText>
          <HtmlDiv className={dateInputClassNames.inputElementContainer}>
            <Debounce waitFor={debounce}>
              {(debouncer: Function) => (
                <HtmlInput
                  {...passProps}
                  id={id}
                  className={dateInputClassNames.inputElement}
                  type="text"
                  forwardedRef={forwardedRef}
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
                  }}
                />
              )}
            </Debounce>
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
  }
}

const StyledDateInput = styled(
  ({
    theme,
    ...passProps
  }: InternalDateInputProps &
    DatePickerProps &
    InnerRef &
    SuomifiThemeProp) => <BaseDateInput {...passProps} />,
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting date.
 * Props other than specified explicitly are passed on to underlying input element.
 * @component
 */
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
