import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { TokensProp, DefinedTokensProp } from '../../theme';
import { baseStyles } from './TextInput.baseStyles';
import {
  TextInput as CompTextInput,
  TextInputProps as CompTextInputProps,
} from '../../../components/Form/TextInput';
import classnames from 'classnames';

const baseClassName = 'fi-text-input';
const labelParagraphClassName = `${baseClassName}_label-p`;
const inputContainerClassName = `${baseClassName}_container`;
const errorClassName = `${baseClassName}--error`;
const successClassName = `${baseClassName}--success`;

type TextInputVariant = 'default' | 'error' | 'success';
export interface TextInputProps extends CompTextInputProps, TokensProp {
  variant?: TextInputVariant;
}

const StyledTextInput = styled(
  ({
    tokens,
    variant,
    className,
    labelTextProps = { className: undefined },
    inputContainerProps = { className: undefined },
    ...passProps
  }: TextInputProps & DefinedTokensProp) => {
    return (
      <CompTextInput
        {...passProps}
        labelTextProps={{
          ...labelTextProps,
          className: classnames(
            labelTextProps.className,
            labelParagraphClassName,
          ),
        }}
        inputContainerProps={{
          ...inputContainerProps,
          className: classnames(
            inputContainerProps.className,
            inputContainerClassName,
          ),
        }}
        className={classnames(className, {
          [errorClassName]: variant === 'error',
          [successClassName]: variant === 'success',
        })}
      />
    );
  },
)`
  ${props => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting text
 */
export class TextInput extends Component<TextInputProps> {
  static error = (props: TextInputProps) => (
    <StyledTextInput {...withSuomifiDefaultProps(props)} variant="error" />
  );

  static success = (props: TextInputProps) => (
    <StyledTextInput {...withSuomifiDefaultProps(props)} variant="success" />
  );

  render() {
    const { ...passProps } = withSuomifiDefaultProps(this.props);

    return <StyledTextInput {...passProps} />;
  }
}
