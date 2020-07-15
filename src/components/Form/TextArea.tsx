import React, { Component, ReactNode, ChangeEvent, FocusEvent } from 'react';
import {
  HtmlLabel,
  HtmlTextarea,
  HtmlTextareaProps,
  HtmlDiv,
  HtmlSpan,
} from '../../reset';
/* import { VisuallyHidden } from '../Visually-hidden/Visually-hidden'; */
/* import { Paragraph, ParagraphProps } from '../Paragraph/Paragraph'; */
import classnames from 'classnames';
import { idGenerator } from '../../utils/uuid';

const baseClassName = 'fi-textarea';
const textareaClassNames = {
  container: `${baseClassName}_container`,
  label: `${baseClassName}_label`,
  textarea: `${baseClassName}_textarea`,
  hintText: `${baseClassName}_hintText`,
  statusText: `${baseClassName}_statusText`,
};

export interface TextareaProps extends HtmlTextareaProps {
  /** Custom classname for the input to extend or customize */
  className?: string;
  /** Disable input usage */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: () => void;
  /** To execute on input text change */
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  /** To execute on input text onBlur */
  onBlur?: (event: FocusEvent<HTMLTextAreaElement>) => void;
  /** Label */
  labelText: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: 'hidden' | 'visible';
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  children?: ReactNode;
  /** Hint text to be shown below the component */
  hintText?: string;
  status?: 'default' | 'error';
  /** Status text to be shown below the component and hint text. Use e.g. for validation error */
  statusText?: string;
}

export class Textarea extends Component<TextareaProps> {
  render() {
    const {
      id: propId,
      className,
      disabled = false,
      children,
      onClick: dismissOnClick,
      labelText,
      hintText,
      status,
      statusText,
      ...passProps
    } = this.props;
    const id = idGenerator(propId);
    const statusTextId = `${idGenerator(propId)}-statusText`;
    const hintTextId = `${idGenerator(propId)}-hintText`;

    const infoElementIds =
      statusText || hintText ? [statusTextId, hintTextId].join(' ') : '';

    return (
      <HtmlDiv
        className={classnames(
          baseClassName,
          textareaClassNames.container,
          className,
          {},
        )}
      >
        <HtmlLabel htmlFor={id} className={textareaClassNames.label}>
          {labelText}
        </HtmlLabel>

        {hintText && (
          <HtmlSpan className={textareaClassNames.hintText} id={hintTextId}>
            {hintText}
          </HtmlSpan>
        )}
        <HtmlTextarea
          id={id}
          aria-describedby={infoElementIds}
          className={textareaClassNames.textarea}
          disabled={disabled}
          {...passProps}
        >
          {children}
        </HtmlTextarea>
        {statusText && !disabled && (
          <HtmlSpan className={textareaClassNames.statusText} id={statusTextId}>
            {statusText}
          </HtmlSpan>
        )}
      </HtmlDiv>
    );
  }
}
