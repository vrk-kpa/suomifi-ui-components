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
import { Icon, IconProps, BaseIconKeys } from '../../Icon/Icon';
import { Omit } from '../../../utils/typescript';

const baseClassName = 'fi-text-input';

export const textInputClassNames = {
  baseClassName,
  labelParagraph: `${baseClassName}_label-p`,
  inputContainer: `${baseClassName}_container`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
  icon: `${baseClassName}_with-icon`,
};

export interface TextInputProps extends CompTextInputProps, TokensProp {
  icon?: BaseIconKeys;
  iconProps?: Omit<IconProps, 'icon'>;
}

const StyledTextInput = styled(
  ({
    tokens,
    status,
    className,
    labelTextProps = { className: undefined },
    inputContainerProps = { className: undefined },
    ...passProps
  }: TextInputProps & InternalTokensProp) => {
    return (
      <CompTextInput
        {...passProps}
        status={status}
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
        className={classnames(baseClassName, className, {
          [textInputClassNames.error]: status === 'error',
          [textInputClassNames.success]: status === 'success',
        })}
      />
    );
  },
)`
  ${(props) => baseStyles(props)}
`;

/**
 * <i class="semantics" />
 * Use for user inputting text
 */
export class TextInput extends Component<TextInputProps> {
  render() {
    const { children, ...passProps } = withSuomifiDefaultProps(this.props);

    const icon = this.props.icon || this.props.iconProps?.icon;

    const iconProps = {
      ...this.props.iconProps,
      icon,
    };

    return (
      <StyledTextInput
        {...passProps}
        className={classnames({
          [textInputClassNames.icon]: icon !== undefined,
        })}
      >
        {children}
        {icon && <Icon {...iconProps} />}
      </StyledTextInput>
    );
  }
}
