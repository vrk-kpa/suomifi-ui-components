import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../../theme/utils';
import { ThemeComponent } from '../../theme';
import { baseStyles } from './TextInput.baseStyles';
import {
  TextInput as CompTextInput,
  TextInputProps as CompTextInputProps,
} from '../../../components/Form/TextInput';
import classnames from 'classnames';

const baseClassName = 'fi-text-input';
const labelParagraphClassName = `${baseClassName}-label-p`;
const inputContainerClassName = `${baseClassName}-container`;
const errorClassName = `${baseClassName}--error`;
const successClassName = `${baseClassName}--success`;

type TextInputVariant = 'default' | 'error' | 'success';
export interface TextInputProps extends CompTextInputProps, ThemeComponent {
  variant?: TextInputVariant;
}

const StyledTextInput = styled(
  ({
    theme,
    variant,
    className,
    labelTextProps = { className: undefined },
    inputContainerProps = { className: undefined },
    ...passProps
  }: TextInputProps) => {
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
 * Use for user inputting text
 */
export class TextInput extends Component<TextInputProps> {
  static error = (props: TextInputProps) => (
    <StyledTextInput {...withDefaultTheme(props)} variant="error" />
  );

  static success = (props: TextInputProps) => (
    <StyledTextInput {...withDefaultTheme(props)} variant="success" />
  );

  render() {
    const { ...passProps } = withDefaultTheme(this.props);

    return <StyledTextInput {...passProps} />;
  }
}
