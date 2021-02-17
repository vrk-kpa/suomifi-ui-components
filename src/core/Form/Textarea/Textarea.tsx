import React, { Component, ChangeEvent, FocusEvent } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { TokensProp, InternalTokensProp } from '../../theme';
import { baseStyles } from './Textarea.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import {
  HtmlTextarea,
  HtmlTextareaProps,
  HtmlDiv,
  HtmlDivProps,
} from '../../../reset';
import { AutoId } from '../../../utils/AutoId';
import { LabelText } from '../LabelText/LabelText';
import { HintText } from '../HintText/HintText';
import { StatusText } from '../StatusText/StatusText';
import { InputStatus } from '../types';
import { getConditionalAriaProp } from '../../../utils/aria';

const baseClassName = 'fi-textarea';
const textareaClassNames = {
  fullWidth: `${baseClassName}--full-width`,
  textareaContainer: `${baseClassName}_textarea-element-container`,
  textarea: `${baseClassName}_textarea`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
};

type TextareaStatus = Exclude<InputStatus, 'success'>;

export interface TextareaProps
  extends Omit<HtmlTextareaProps, 'placeholder'>,
    TokensProp {
  /** Custom classname to extend or customize */
  className?: string;
  /** Disable usage */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: () => void;
  /** To execute on textarea text change */
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  /** To execute on textarea text onBlur */
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  /** Label */
  labelText: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: 'hidden' | 'visible';
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** Text content for textarea */
  children?: string;
  /** Hint text to be shown below the component */
  hintText?: string;
  /**
   * 'default' | 'error'
   * @default default
   */
  status?: TextareaStatus;
  /** Status text to be shown below the component and hint text. Use e.g. for validation error */
  statusText?: string;
  /** Resize mode of the textarea
      'both' | 'vertical' | 'horizontal' | 'none'
      @default 'vertical' 
   */
  resize?: 'both' | 'vertical' | 'horizontal' | 'none';
  /** Optional text that is shown after labelText. Will be wrapped in parentheses. */
  optionalText?: string;
  /**
   * Unique id
   * If no id is specified, one will be generated automatically
   */
  id?: string;
  /** Input name */
  name?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Textarea container div props */
  containerProps?: Omit<HtmlDivProps, 'className'>;
}

class BaseTextarea extends Component<TextareaProps> {
  render() {
    const {
      id,
      className,
      disabled = false,
      children,
      onClick,
      labelMode,
      labelText,
      hintText,
      status,
      statusText,
      visualPlaceholder,
      resize,
      optionalText,
      'aria-describedby': ariaDescribedBy,
      fullWidth,
      containerProps,
      ...passProps
    } = this.props;

    const onClickProps = !!disabled ? {} : { onMouseDown: onClick };
    const statusTextId = statusText ? `${id}-statusText` : undefined;
    const hintTextId = hintText ? `${id}-hintText` : undefined;

    return (
      <HtmlDiv
        {...containerProps}
        className={classnames(baseClassName, className, {
          [textareaClassNames.disabled]: !!disabled,
          [textareaClassNames.error]: status === 'error' && !disabled,
          [textareaClassNames.fullWidth]: fullWidth,
        })}
      >
        <LabelText
          htmlFor={id}
          labelMode={labelMode}
          asProp="label"
          optionalText={optionalText}
        >
          {labelText}
        </LabelText>
        <HintText id={hintTextId}>{hintText}</HintText>
        <HtmlDiv className={textareaClassNames.textareaContainer}>
          <HtmlTextarea
            id={id}
            className={textareaClassNames.textarea}
            disabled={disabled}
            defaultValue={children}
            placeholder={visualPlaceholder}
            aria-invalid={status === 'error'}
            {...getConditionalAriaProp('aria-describedby', [
              statusTextId,
              hintTextId,
              ariaDescribedBy,
            ])}
            {...passProps}
            {...onClickProps}
          />
        </HtmlDiv>
        <StatusText id={statusTextId} status={status}>
          {statusText}
        </StatusText>
      </HtmlDiv>
    );
  }
}

const StyledTextarea = styled(
  ({
    tokens,
    id: propId,
    ...passProps
  }: TextareaProps & InternalTokensProp) => (
    <AutoId id={propId}>
      {(id) => <BaseTextarea id={id} {...passProps} />}
    </AutoId>
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class Textarea extends Component<TextareaProps> {
  render() {
    return <StyledTextarea {...withSuomifiDefaultProps(this.props)} />;
  }
}
