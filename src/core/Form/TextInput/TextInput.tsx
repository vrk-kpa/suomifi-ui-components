/* eslint-disable arrow-body-style */
import React, { Component, ChangeEvent, FocusEvent } from 'react';
import { default as styled } from 'styled-components';
import {
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
  HtmlSpan,
  HtmlInputWithRef,
} from '../../../reset';
import { baseStyles } from './TextInput.baseStyles';
import { LabelText, LabelMode } from '../LabelText/LabelText';
import { StatusText } from '../StatusText/StatusText';
import { InputStatus } from '../types';
import { HintText } from '../HintText/HintText';
import classnames from 'classnames';
import { Icon, IconProps, BaseIconKeys } from '../../Icon/Icon';
import { AutoId } from '../../../utils/AutoId';
import { Debounce } from '../../utils/Debounce/Debounce';
import { getConditionalAriaProp } from '../../../utils/aria';

const baseClassName = 'fi-text-input';
export const textInputClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  icon: `${baseClassName}_with-icon`,
  inputElementContainer: `${baseClassName}_input-element-container`,
  inputElement: `${baseClassName}_input`,
  styleWrapper: `${baseClassName}_wrapper`,
};

type TextInputValue = string | number | undefined;

interface InternalTextInputProps
  extends Omit<HtmlInputProps, 'type' | 'onChange'> {
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
  /** Status text to be shown below the component and hint text. Use e.g. for validation error */
  statusText?: string;
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
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLInputElement>;
}

export interface TextInputProps extends InternalTextInputProps {
  /** Ref object to be passed */
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
      'aria-describedby': ariaDescribedBy,
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
          <LabelText
            htmlFor={id}
            labelMode={labelMode}
            asProp="label"
            optionalText={optionalText}
          >
            {labelText}
          </LabelText>
          <HintText id={hintTextId}>{hintText}</HintText>
          <HtmlDiv className={textInputClassNames.inputElementContainer}>
            <Debounce waitFor={this.props.debounce}>
              {(debouncer: Function) => (
                <HtmlInputWithRef
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
          <StatusText id={statusTextId} status={status}>
            {statusText}
          </StatusText>
        </HtmlSpan>
      </HtmlDiv>
    );
  }
}

const StyledTextInput = styled(
  ({ ...passProps }: InternalTextInputProps & InnerRef) => {
    return <BaseTextInput {...passProps} />;
  },
)`
  ${baseStyles}
`;

/**
 * <i class="semantics" />
 * Use for user inputting text.
 * Props other than specified explicitly are passed on to underlying input element.
 */
export const TextInput = React.forwardRef(
  (props: TextInputProps, ref: React.Ref<HTMLInputElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <AutoId id={propId}>
        {(id) => <StyledTextInput id={id} forwardedRef={ref} {...passProps} />}
      </AutoId>
    );
  },
);
