import React, { Component, ChangeEvent, FocusEvent } from 'react';
import {
  HtmlLabel,
  HtmlTextarea,
  HtmlTextareaProps,
  HtmlSpan,
} from '../../reset';
import { VisuallyHidden } from '../Visually-hidden/Visually-hidden';
import { Paragraph } from '../Paragraph/Paragraph';
import classnames from 'classnames';
import styled from 'styled-components';
import { idGenerator } from '../../utils/uuid';

const baseClassName = 'fi-textarea';
const textareaClassNames = {
  label: `${baseClassName}_label`,
  optionalText: `${baseClassName}_optionalText`,
  textarea: `${baseClassName}_textarea`,
  hintText: `${baseClassName}_hintText`,
  statusText: `${baseClassName}_statusText`,
};

export interface TextareaProps extends HtmlTextareaProps {
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
  optionalText?: string;
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
      ...passProps
    } = this.props;

    const onClickProps = !!disabled ? {} : { onMouseDown: onClick };

    const hideLabel = labelMode === 'hidden';
    const id = idGenerator(propId);
    const statusTextId = `${idGenerator(propId)}-statusText`;
    const hintTextId = `${idGenerator(propId)}-hintText`;

    return (
      <HtmlLabel className={classnames(baseClassName, className, {})}>
        {hideLabel ? (
          <VisuallyHidden>{labelText}</VisuallyHidden>
        ) : (
          <Paragraph>
            <HtmlSpan className={textareaClassNames.label}>
              {labelText}
            </HtmlSpan>
            {optionalText && (
              <HtmlSpan className={textareaClassNames.optionalText}>
                {`(${optionalText})`}
              </HtmlSpan>
            )}
          </Paragraph>
        )}
        {hintText && (
          <HtmlSpan className={textareaClassNames.hintText} id={hintTextId}>
            {hintText}
          </HtmlSpan>
        )}
        <HtmlTextarea
          id={id}
          className={textareaClassNames.textarea}
          disabled={disabled}
          defaultValue={children}
          placeholder={visualPlaceholder}
          {...passProps}
          {...onClickProps}
        />
        {statusText && !disabled && (
          <HtmlSpan className={textareaClassNames.statusText} id={statusTextId}>
            {statusText}
          </HtmlSpan>
        )}
      </HtmlLabel>
    );
  }
}

const StyledBaseTextarea = styled((props: TextareaProps) => (
  <BaseTextarea {...props} />
))`
  & .${textareaClassNames.textarea} {
    resize: ${(props) => props.resize || 'vertical'};
  }
`;

export class Textarea extends Component<TextareaProps> {
  render() {
    return <StyledBaseTextarea {...this.props} />;
  }
}
