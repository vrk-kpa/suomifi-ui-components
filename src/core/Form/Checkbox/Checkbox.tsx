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
  disabled: `${baseClassName}--disabled`,
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
    checkedState: !!this.props.checked || !!this.props.defaultChecked,
  };

  handleClick = () => {
    const { onClick } = this.props;
    const { checkedState } = this.state;
    this.setState({ checkedState: !checkedState });
    if (!!onClick) {
      onClick({ checkboxState: !checkedState });
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
    const { checkedState } = this.state;
    return (
      <StyledCheckbox
        disabled={disabled}
        onClick={this.handleClick}
        {...passProps}
        className={classnames(baseClassName, className, {
          [checkboxClassNames.error]: status === 'error',
          [checkboxClassNames.checked]: checkedState,
          [checkboxClassNames.large]: variant === 'large',
          [checkboxClassNames.disabled]: !!disabled,
        })}
      >
        {children}
      </StyledCheckbox>
    );
  }
}
