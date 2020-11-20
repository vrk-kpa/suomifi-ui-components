import React, { Component, ChangeEvent, FocusEvent } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../../theme/utils';
import {
  HtmlInput,
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
} from '../../../reset';
import { TokensProp, InternalTokensProp } from '../../theme';
import { baseStyles } from './TextInput.baseStyles';
import { LabelText, LabelMode } from '../LabelText/LabelText';
import { StatusText } from '../StatusText/StatusText';
import { InputStatus } from '../types';
import { HintText } from '../HintText/HintText';
import classnames from 'classnames';
import { Icon, IconProps, BaseIconKeys } from '../../Icon/Icon';
import { Omit } from '../../../utils/typescript';
import { idGenerator } from '../../../utils/uuid';

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
};

export interface TextInputProps
  extends Omit<HtmlInputProps, 'type'>,
    TokensProp {
  /** TextInput container div class name for custom styling. */
  className?: string;
  /** TextInput container div props */
  inputContainerProps?: Omit<HtmlDivProps, 'className'>;
  /** Disable input usage */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: () => void;
  /** To execute on input text change */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
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
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Text to mark a field optional. Will be wrapped in parentheses and shown after labelText. */
  optionalText?: string;
  icon?: BaseIconKeys;
  iconProps?: Omit<IconProps, 'icon'>;
}

class BaseTextInput extends Component<TextInputProps> {
  private id: string;

  private hintTextId: string;

  private statusTextId: string;

  constructor(props: TextInputProps) {
    super(props);
    this.id = `${idGenerator(props.id)}`;
    this.hintTextId = `${this.id}-hintText`;
    this.statusTextId = `${this.id}-statusText`;
  }

  render() {
    const {
      className,
      labelText,
      labelMode,
      inputContainerProps,
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
      'aria-describedby': ariaDescribedBy,
      ...passProps
    } = this.props;

    const resolvedIcon = icon || iconProps?.icon;

    const newIconProps = {
      ...iconProps,
      icon: resolvedIcon,
    };

    const getDescribedBy = () => {
      if (statusText || hintText || ariaDescribedBy) {
        return {
          'aria-describedby': [
            ...(statusText ? [this.statusTextId] : []),
            ...(hintText ? [this.hintTextId] : []),
            ...(ariaDescribedBy ? [ariaDescribedBy] : []),
          ].join(' '),
        };
      }
      return {};
    };

    return (
      <HtmlDiv
        {...inputContainerProps}
        className={classnames(baseClassName, className, {
          [textInputClassNames.disabled]: !!passProps.disabled,
          [textInputClassNames.icon]: resolvedIcon !== undefined,
          [textInputClassNames.error]: status === 'error',
          [textInputClassNames.success]: status === 'success',
          [textInputClassNames.fullWidth]: fullWidth,
        })}
      >
        <LabelText
          htmlFor={this.id}
          labelMode={labelMode}
          as="label"
          optionalText={optionalText}
        >
          {labelText}
        </LabelText>
        <HintText id={this.hintTextId}>{hintText}</HintText>
        <HtmlDiv className={textInputClassNames.inputElementContainer}>
          <HtmlInput
            {...passProps}
            id={this.id}
            className={textInputClassNames.inputElement}
            type={type}
            placeholder={visualPlaceholder}
            {...{ 'aria-invalid': status === 'error' }}
            {...getDescribedBy()}
          />
          {resolvedIcon && <Icon {...newIconProps} />}
        </HtmlDiv>
        <StatusText id={this.statusTextId} status={status}>
          {statusText}
        </StatusText>
      </HtmlDiv>
    );
  }
}

const StyledTextInput = styled(
  ({ tokens, ...passProps }: TextInputProps & InternalTokensProp) => {
    return <BaseTextInput {...passProps} />;
  },
)`
  ${(props) => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting text.
 * Props other than specified explicitly are passed on to underlying input element.
 */
export class TextInput extends Component<TextInputProps> {
  render() {
    return <StyledTextInput {...withSuomifiDefaultProps(this.props)} />;
  }
}
