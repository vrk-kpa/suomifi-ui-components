import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { TokensProp, InternalTokensProp } from '../../theme';
import { baseStyles } from './TextInput.baseStyles';
import {
  TextInput as CompTextInput,
  TextInputProps as CompTextInputProps,
} from '../../../components/Form/TextInput';
import classnames from 'classnames';
const baseClassName = 'fi-text-input';

export const textInputClassNames = {
  baseClassName,
  labelParagraph: `${baseClassName}_label-p`,
  inputContainer: `${baseClassName}_container`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
};
type TextInputVariant = 'default' | 'error' | 'success';

export interface TextInputProps extends CompTextInputProps, TokensProp {
  /**
   * 'default' | 'error' | 'success'
   * @default default
   */
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
  }: TextInputProps & InternalTokensProp) => {
    return (
      <CompTextInput
        {...passProps}
        labelTextProps={{
          ...labelTextProps,
          className: classnames(
            labelTextProps.className,
            textInputClassNames.labelParagraph,
          ),
        }}
        inputContainerProps={{
          ...inputContainerProps,
          className: classnames(
            inputContainerProps.className,
            textInputClassNames.inputContainer,
          ),
        }}
        className={classnames(className, {
          [textInputClassNames.error]: variant === 'error',
          [textInputClassNames.success]: variant === 'success',
        })}
        aria-invalid={variant === 'error' ? 'true' : undefined}
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
  render() {
    const { ...passProps } = withSuomifiDefaultProps(this.props);

    return <StyledTextInput {...passProps} />;
  }
}
