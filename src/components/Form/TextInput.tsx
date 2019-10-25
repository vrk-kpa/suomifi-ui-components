import React, { Component, ReactNode, ChangeEvent, FocusEvent } from 'react';
import { Omit } from '../../utils/typescript';
import {
  HtmlLabel,
  HtmlLabelProps,
  HtmlInput,
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
} from '../../reset';
import { VisuallyHidden } from '../Visually-hidden/Visually-hidden';
import { Paragraph, ParagraphProps } from '../Paragraph/Paragraph';
import classnames from 'classnames';
import { logger } from '../../utils/logger';

const baseClassName = 'fi-text-input';
const disabledClassName = `${baseClassName}--disabled`;
const labelBaseClassName = `${baseClassName}_label`;
const inputBaseClassName = `${baseClassName}_input`;

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
  /** Label displaymode
   * visible: show above, hidden: show as placeholder
   */
  labelMode?: Label;

  placeholder?: string;
  /** Input container div to define custom styling */
  inputContainerProps?: HtmlDivProps;
  children?: ReactNode;
}

export class BaseTextInput extends Component<TextInputProps> {
  render() {
    const {
      className,
      inputClassName,
      labelText,
      labelMode,
      placeholder,
      labelProps,
      labelTextProps,
      inputContainerProps,
      children,
      ...passProps
    } = this.props;

    const hideLabel = labelMode === 'hidden';

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
        <HtmlDiv {...inputContainerProps}>
          <HtmlInput
            {...passProps}
            className={classnames(inputBaseClassName, inputClassName)}
            type="text"
            placeholder={hideLabel ? labelText : ''} // halutaanko että on sauma muutenkin käyttää labeltextiä tässä
          />
          {children}
        </HtmlDiv>
      </HtmlLabel>
    );
  }
}

export class TextInput extends BaseTextInput {
  render() {
    const { placeholder, ...passProps } = this.props;

    if (!!placeholder) {
      logger.error(
        'Using placeholder in text inputs is not accessible and it is ignored. Use labelText instead',
      );
    }
    return <BaseTextInput {...passProps} />;
  }
}
