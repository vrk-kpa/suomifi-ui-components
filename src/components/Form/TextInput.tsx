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
const hintTextClassName = `${baseClassName}_hintText`;

export interface TextInputLabelProps extends HtmlLabelProps {}

type Label = 'hidden' | 'visible';

type InputType = 'text' | 'email' | 'number' | 'password' | 'tel' | 'url';

type TextInputStatus = 'default' | 'error' | 'success';

export interface TextInputProps extends Omit<HtmlInputProps, 'type'> {
  /** Input container div to define custom styling */
  inputContainerProps?: HtmlDivProps;
  /** Custom classname for the input element container div to extend or customize */
  inputElementContainerClassName?: string;
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
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: Label;
  /** Placeholder text for input. Use only as visual aid, not for instructions. */
  visualPlaceholder?: string;
  /** A custom element to be passed to the component. Will be rendered after the input */
  children?: ReactNode;
  /** Hint text to be shown below the component */
  hintText?: string;
  /**
   * 'default' | 'error' | 'success'
   * @default default
   */
  status?: TextInputStatus;
  /** Status text to be shown below the component and hint text. Use e.g. for validation error */
  statusText?: string;
  /** 'text' | 'email' | 'number' | 'password' | 'tel' | 'url'
   * @default text
   */
  type?: InputType;
  /** Input name */
  name?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
}

class BaseTextInput extends Component<TextInputProps> {
  render() {
    const {
      inputElementContainerClassName,
      labelText,
      labelMode,
      labelProps,
      labelTextProps,
      inputContainerProps,
      children,
      status,
      statusText,
      hintText,
      visualPlaceholder,
      id: propId,
      type = 'text',
      fullWidth,
      style,
      ...passProps
    } = this.props;

    const hideLabel = labelMode === 'hidden';
    const generatedStatusTextId = `${idGenerator(propId)}-statusText`;
    const generatedHintTextId = `${idGenerator(propId)}-hintText`;

    return (
      <HtmlDiv
        {...inputContainerProps}
        className={classnames(inputContainerProps?.className, {
          [disabledClassName]: !!passProps.disabled,
        })}
      >
        <HtmlLabel
          {...labelProps}
          className={classnames(labelBaseClassName, labelProps?.className)}
        >
          {hideLabel ? (
            <VisuallyHidden>{labelText}</VisuallyHidden>
          ) : (
            <Paragraph {...labelTextProps}>{labelText}</Paragraph>
          )}
          {hintText && (
            <Paragraph className={hintTextClassName} id={generatedHintTextId}>
              {hintText}
            </Paragraph>
          )}
          <HtmlDiv className={statusTextContainerClassName}>
            <HtmlDiv className={inputElementContainerClassName}>
              <HtmlInput
                {...passProps}
                id={propId}
                className={classnames(inputBaseClassName, passProps?.className)}
                type={type}
                placeholder={visualPlaceholder}
                {...{ 'aria-invalid': status === 'error' }}
              />
              {children}
            </HtmlDiv>
            {statusText && (
              <HtmlSpan
                className={statusTextClassName}
                id={generatedStatusTextId}
              >
                {statusText}
              </HtmlSpan>
            )}
          </HtmlDiv>
        </HtmlLabel>
      </HtmlDiv>
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
    return <StyledBaseTextInput {...this.props} />;
  }
}
