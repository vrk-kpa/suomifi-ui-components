import React, { ReactNode, ReactElement, forwardRef, FocusEvent } from 'react';
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

export interface TimeInputProps
  extends StatusTextCommonProps,
    Omit<
      HTMLAttributesIncludingDataAttributes<HTMLDivElement>,
      'className' | 'onChange'
    > {
  /** CSS class for custom styles */
  className?: string;
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
  dotSeparator: `${baseClassName}_dot-separator`,
};

const BaseTimeInput = (props: TimeInputProps) => {
  const {
    className,
    labelText,
    labelMode,
    onChange: propOnChange,
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

  const hintTextId = `${id}-hintText`;
  // const statusTextId = `${id}-statusText`;

  return (
    <HtmlDiv
      {...passProps}
      className={classnames(baseClassName, className, {
        [timeInputClassNames.disabled]: disabled,
        [timeInputClassNames.error]: status === 'error',
        [timeInputClassNames.success]: status === 'success',
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
        <HtmlDiv className={timeInputClassNames.inputContainer}>
          <HtmlDiv className={timeInputClassNames.hoursInputElementContainer}>
            <HtmlInput
              inputMode="numeric"
              placeholder="--"
              className={timeInputClassNames.hoursInput}
              maxLength={2}
            />
          </HtmlDiv>
          <HtmlDiv className={timeInputClassNames.dotSeparator}>.</HtmlDiv>
          <HtmlDiv className={timeInputClassNames.minutesInputElementContainer}>
            <HtmlInput
              inputMode="numeric"
              placeholder="--"
              className={timeInputClassNames.minutesInput}
              maxLength={2}
            />
          </HtmlDiv>
        </HtmlDiv>
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
