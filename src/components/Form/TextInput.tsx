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
import { logger } from '../../utils/logger';
import classnames from 'classnames';

const baseClassName = 'fi-text-input';
const disabledClassName = `${baseClassName}--disabled`;
const labelBaseClassName = `${baseClassName}-label`;
const inputBaseClassName = `${baseClassName}-input`;

export interface TextInputLabelProps extends HtmlLabelProps {}

type Label = 'default' | 'screenreader';

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
   * default: show above, screenreader: show as placeholder
   */
  labelMode?: Label;
  /** Input placeholder-text if not using screenreader-labelmode */
  placeholder?: string;
  /** Input container div to define custom styling */
  inputContainerProps?: HtmlDivProps;
  children?: ReactNode;
}

export class TextInput extends Component<TextInputProps> {
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

    const ifScreenreader = labelMode === 'screenreader';
    if (ifScreenreader && !!placeholder) {
      logger.warn(
        'Placeholder not used as label is hidden and using label instead',
      );
    }

    return (
      <HtmlLabel
        {...labelProps}
        className={classnames(labelBaseClassName, className, {
          [disabledClassName]: !!passProps.disabled,
        })}
      >
        {ifScreenreader ? (
          <VisuallyHidden>{labelText}</VisuallyHidden>
        ) : (
          <Paragraph {...labelTextProps}>{labelText}</Paragraph>
        )}
        <HtmlDiv {...inputContainerProps}>
          <HtmlInput
            {...passProps}
            className={classnames(inputBaseClassName, inputClassName)}
            type="text"
            placeholder={ifScreenreader ? labelText : placeholder}
          />
          {children}
        </HtmlDiv>
      </HtmlLabel>
    );
  }
}
