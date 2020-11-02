import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { TokensProp, InternalTokensProp } from '../../theme';
import {
  Textarea as CompTextarea,
  TextareaProps as CompTextareaProps,
} from '../../../components/Form/Textarea';
import { baseStyles } from './Textarea.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import classnames from 'classnames';

const baseClassName = 'fi-textarea';

const textareaClassNames = {
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
};

export interface TextareaProps extends CompTextareaProps, TokensProp {}

const StyledTextarea = styled(
  ({ tokens, ...passProps }: TextareaProps & InternalTokensProp) => (
    <CompTextarea {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class Textarea extends Component<TextareaProps> {
  render() {
    const {
      children,
      disabled = false,
      status,
      className,
      ...passProps
    } = withSuomifiDefaultProps(this.props);
    return (
      <StyledTextarea
        disabled={disabled}
        className={classnames(className, {
          [textareaClassNames.disabled]: !!disabled,
          [textareaClassNames.error]: status === 'error' && !disabled,
        })}
        status={status}
        {...passProps}
      >
        {children}
      </StyledTextarea>
    );
  }
}
