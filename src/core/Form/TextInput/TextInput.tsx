import React, {
  forwardRef,
  Component,
  ChangeEvent,
  FocusEvent,
  ReactElement,
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
import { Icon, IconProps, BaseIconKeys } from '../../Icon/Icon';
import { Label, LabelMode } from '../Label/Label';
import { StatusText } from '../StatusText/StatusText';
import { HintText } from '../HintText/HintText';
import { InputStatus, StatusTextCommonProps } from '../types';
import { baseStyles } from './TextInput.baseStyles';

const baseClassName = 'fi-text-input';
export const textInputClassNames = {
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

type TextInputValue = string | number | undefined;

interface InternalTextInputProps
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
  /** To execute on input text change */
  onChange?: (value: TextInputValue) => void;
  /** To execute on input text onBlur */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Label */
  labelText: string;
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
  /** 'text' | 'email' | 'number' | 'password' | 'tel' | 'url'
   * @default text
   */
  type?: 'text' | 'email' | 'number' | 'password' | 'tel' | 'url';
  /** Input name */
  name?: string;
  /** Controlled value */
  value?: TextInputValue;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Text to mark a field optional. Will be wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  /** Debounce time in milliseconds for onChange function. No debounce is applied if no value is given. */
  debounce?: number;
  /** Suomi.fi icon to be shown inside the input field */
  icon?: BaseIconKeys;
  /** Properties for the icon */
  iconProps?: Omit<IconProps, 'icon'>;
  /** Tooltip component for label */
  tooltipComponent?: ReactElement;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLInputElement>;
}

export interface TextInputProps extends InternalTextInputProps {
  /** Ref object to be passed to the input element */
  ref?: React.RefObject<HTMLInputElement>;
}

class BaseTextInput extends Component<TextInputProps & InnerRef> {
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
      type = 'text',
      fullWidth,
      icon,
      iconProps,
      forwardedRef,
      debounce,
      statusTextAriaLiveMode = 'assertive',
      'aria-describedby': ariaDescribedBy,
      tooltipComponent,
      ...passProps
    } = this.props;

    const resolvedIcon: BaseIconKeys = icon || iconProps?.icon;

    const hintTextId = `${id}-hintText`;
    const statusTextId = `${id}-statusText`;
    return (
      <HtmlDiv
        {...wrapperProps}
        className={classnames(baseClassName, className, {
          [textInputClassNames.disabled]: !!passProps.disabled,
          [textInputClassNames.icon]: resolvedIcon !== undefined,
          [textInputClassNames.error]: status === 'error',
          [textInputClassNames.success]: status === 'success',
          [textInputClassNames.fullWidth]: fullWidth,
        })}
      >
        <HtmlSpan className={textInputClassNames.styleWrapper}>
          <Label
            htmlFor={id}
            labelMode={labelMode}
            optionalText={optionalText}
            className={classnames({
              [textInputClassNames.labelIsVisible]: labelMode !== 'hidden',
            })}
            tooltipComponent={tooltipComponent}
          >
            {labelText}
          </Label>
          <HintText id={hintTextId}>{hintText}</HintText>
          <HtmlDiv className={textInputClassNames.inputElementContainer}>
            <Debounce waitFor={debounce}>
              {(debouncer: Function) => (
                <HtmlInput
                  {...passProps}
                  id={id}
                  className={textInputClassNames.inputElement}
                  type={type}
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
            {resolvedIcon && <Icon {...{ ...iconProps, icon: resolvedIcon }} />}
          </HtmlDiv>
          <StatusText
            id={statusTextId}
            className={classnames({
              [textInputClassNames.statusTextHasContent]: !!statusText,
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

const StyledTextInput = styled(
  ({
    theme,
    ...passProps
  }: InternalTextInputProps & InnerRef & SuomifiThemeProp) => (
    <BaseTextInput {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting text.
 * Props other than specified explicitly are passed on to underlying input element.
 * @component
 */
export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (props: TextInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledTextInput
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
