import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { TokensProp, InternalTokensProp } from '../../theme';
import {
  Checkbox as CompCheckbox,
  CheckboxProps as CompCheckboxProps,
  CheckboxInputProps as CompCheckboxInputProps,
} from '../../../components/Form/Checkbox';
import { baseStyles } from './Checkbox.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import classnames from 'classnames';

const baseClassName = 'fi-checkbox';

const checkboxClassNames = {
  error: `${baseClassName}--error`,
  checked: `${baseClassName}--checked`,
  large: `${baseClassName}--large`,
};

export interface CheckboxProps extends CompCheckboxProps, TokensProp {}
export interface CheckboxInputProps
  extends CompCheckboxInputProps,
    TokensProp {}

const StyledCheckbox = styled(
  ({ tokens, ...passProps }: CheckboxProps & InternalTokensProp) => (
    <CompCheckbox {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class Checkbox extends Component<CheckboxProps> {
  state = {
    checkboxStatus: !!this.props.checked || !!this.props.defaultChecked,
  };

  handleClick = () => {
    const { onClick } = this.props;
    const { checkboxStatus } = this.state;
    this.setState({ checkboxStatus: !checkboxStatus });
    if (!!onClick) {
      onClick({ checkboxState: !checkboxStatus });
    }
  };

  render() {
    const {
      children,
      disabled = false,
      checked,
      onClick,
      status,
      variant,
      className,
      ...passProps
    } = withSuomifiDefaultProps(this.props);
    const { checkboxStatus } = this.state;
    return (
      <StyledCheckbox
        disabled={disabled}
        onClick={this.handleClick}
        {...passProps}
        className={classnames(className, {
          [checkboxClassNames.error]: status === 'error',
          [checkboxClassNames.checked]: checkboxStatus,
          [checkboxClassNames.large]: variant === 'large',
        })}
      >
        {children}
      </StyledCheckbox>
    );
  }
}
