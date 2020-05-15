import React, { Component, ReactNode, ChangeEvent, FocusEvent } from 'react';
import { Omit } from '../../utils/typescript';
import {
  HtmlLabel,
  HtmlLabelProps,
  HtmlInput,
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
  HtmlSpan,
} from '../../reset';
import { VisuallyHidden } from '../Visually-hidden/Visually-hidden';
import { Paragraph, ParagraphProps } from '../Paragraph/Paragraph';
import { logger } from '../../utils/logger';
import classnames from 'classnames';
import styled from 'styled-components';
import { disabledCursor } from '../utils/css';
import { idGenerator } from '../../utils/uuid';

const baseClassName = 'fi-text-input';
const disabledClassName = `${baseClassName}--disabled`;
const labelBaseClassName = `${baseClassName}_label`;
const inputBaseClassName = `${baseClassName}_input`;
const statusTextClassName = `${baseClassName}_statusText`;
const statusTextContainerClassName = `${statusTextClassName}_container`;
const statusTextSpanClassName = `${baseClassName}_statusText_span`;

export interface TextInputLabelProps extends HtmlLabelProps {}

type Label = 'hidden' | 'visible';

export interface TextInputProps extends Omit<HtmlInputProps, 'type'> {
  /** Custom classname for the input to extend or customize */
  className?: string;
  /** Custom classname for the label to extend or customize */
  inputClassName?: string;
  /** Disable input usage */
  disabled?: boolean;
  /** Event handler to execute when clicked */
  onClick?: () => void;
  /** Pass custom props to label container */
  labelProps?: TextInputLabelProps;
  /** Pass custom props to Label text element */
  labelTextProps?: ParagraphProps;
  /** To execute on input text change */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  /** To execute on input text onBlur */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Label */
  labelText: string;
  /** Label displaymode -
   * visible: show above, hidden: show as placeholder
   * @default visible
   */
  labelMode?: Label;

  placeholder?: string;
  /** Input container div to define custom styling */
  inputContainerProps?: HtmlDivProps;
  children?: ReactNode;
  /** Showing the status text; like validation error beneath the component */
  statusText?: string;
}

class BaseTextInput extends Component<TextInputProps> {
  render() {
    const {
      className,
      inputClassName,
      labelText,
      labelMode,
      labelProps,
      labelTextProps,
      inputContainerProps,
      children,
      statusText,
      id: propId,
      ...passProps
    } = this.props;

    const hideLabel = labelMode === 'hidden';
    const generatedId = `${idGenerator(propId)}-statusText`;

    return (
      <HtmlLabel
        {...labelProps}
        className={classnames(labelBaseClassName, className, {
          [disabledClassName]: !!passProps.disabled,
        })}
      >
        {hideLabel ? (
          <VisuallyHidden>{labelText}</VisuallyHidden>
        ) : (
          <Paragraph {...labelTextProps}>{labelText}</Paragraph>
        )}
        <HtmlDiv className={statusTextContainerClassName}>
          <HtmlDiv {...inputContainerProps}>
            <HtmlInput
              id={propId}
              {...passProps}
              className={classnames(inputBaseClassName, inputClassName)}
              type="text"
              aria-describedby={generatedId}
            />
            {children}
          </HtmlDiv>
          {statusText && (
            <HtmlSpan className={statusTextSpanClassName} id={generatedId}>
              {statusText}
            </HtmlSpan>
          )}
        </HtmlDiv>
      </HtmlLabel>
    );
  }
}

export const StyledBaseTextInput = styled((props: TextInputProps) => (
  <BaseTextInput {...props} />
))`
  &.${disabledClassName} {
    ${disabledCursor}
  }
`;

export class TextInput extends Component<TextInputProps> {
  render() {
    const { placeholder, ...passProps } = this.props;

    if (!!placeholder) {
      logger.error(
        'Using placeholder in text inputs is not accessible and it is ignored. Use labelText instead',
      );
    }

    const showPlaceholder = this.props.labelMode === 'hidden';
    const props = {
      placeholder: showPlaceholder ? this.props.labelText : undefined,
    };

    return <StyledBaseTextInput {...passProps} {...props} />;
  }
}
