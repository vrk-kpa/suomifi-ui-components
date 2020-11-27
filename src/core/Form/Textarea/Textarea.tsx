import React, { Component, ChangeEvent, FocusEvent } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { TokensProp, InternalTokensProp } from '../../theme';
import { baseStyles } from './Textarea.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { HtmlTextarea, HtmlTextareaProps, HtmlDiv } from '../../../reset';
import { idGenerator } from '../../../utils/uuid';
import { LabelText } from '../LabelText/LabelText';
import { HintText } from '../HintText/HintText';
import { StatusText } from '../StatusText/StatusText';

const baseClassName = 'fi-textarea';
const textareaClassNames = {
  textareaContainer: `${baseClassName}_textarea-element-container`,
  textarea: `${baseClassName}_textarea`,
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
};

export interface TextareaProps extends HtmlTextareaProps, TokensProp {
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
  status?: 'default' | 'error';
  /** Status text to be shown below the component and hint text. Use e.g. for validation error */
  statusText?: string;
  /** Resize mode of the textarea
      'both' | 'vertical' | 'horizontal' | 'none'
      @default 'vertical' 
   */
  resize?: 'both' | 'vertical' | 'horizontal' | 'none';
  /** Optional text that is shown after labelText. Will be wrapped in parentheses. */
  optionalText?: string;
  /** Unique id
   * @default uuidV4
   */
  id?: string;
  /** Input name */
  name?: string;
}

class BaseTextarea extends Component<TextareaProps> {
  render() {
    const {
      id: propId,
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
      resize: dismissResize,
      optionalText,
      'aria-describedby': ariaDescribedBy,
      ...passProps
    } = this.props;

    const onClickProps = !!disabled ? {} : { onMouseDown: onClick };
    const id = idGenerator(propId);
    const statusTextId = `${id}-statusText`;
    const hintTextId = `${id}-hintText`;

    const getDescribedBy = () => {
      if (statusText || hintText || ariaDescribedBy) {
        return {
          'aria-describedby': [
            ...(statusText ? [statusTextId] : []),
            ...(hintText ? [hintTextId] : []),
            ...(ariaDescribedBy ? [ariaDescribedBy] : []),
          ].join(' '),
        };
      }
      return {};
    };

    return (
      <HtmlDiv
        className={classnames(baseClassName, className, {
          [textareaClassNames.disabled]: !!disabled,
          [textareaClassNames.error]: status === 'error' && !disabled,
        })}
      >
        <LabelText
          htmlFor={id}
          labelMode={labelMode}
          as="label"
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
            {...{ 'aria-invalid': status === 'error' }}
            {...getDescribedBy()}
            {...passProps}
            {...onClickProps}
          />
        </HtmlDiv>
        <StatusText id={statusTextId}>{statusText}</StatusText>
      </HtmlDiv>
    );
  }
}

const StyledTextarea = styled(
  ({ tokens, ...passProps }: TextareaProps & InternalTokensProp) => (
    <BaseTextarea {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class Textarea extends Component<TextareaProps> {
  render() {
    return <StyledTextarea {...withSuomifiDefaultProps(this.props)} />;
  }
}
