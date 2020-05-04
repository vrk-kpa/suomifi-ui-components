import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { TokensProp, InternalTokensProp } from '../../theme';
import {
  Checkbox as CompCheckbox,
  CheckboxProps as CompCheckboxProps,
} from '../../../components/Form/Checkbox';
import { baseStyles } from './Checkbox.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import classnames from 'classnames';
import { Icon } from '../../Icon/Icon';

const baseClassName = 'fi-checkbox';

const checkboxClassNames = {
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  checked: `${baseClassName}--checked`,
  large: `${baseClassName}--large`,
};

const iconBaseClassName = 'fi-checkbox_icon';

const iconClassnames = {
  disabled: `${iconBaseClassName}--disabled`,
  checked: `${iconBaseClassName}--checked`,
  error: `${iconBaseClassName}--error`,
};

export interface CheckboxProps extends CompCheckboxProps, TokensProp {}

const StyledCheckbox = styled(
  ({ tokens, ...passProps }: CheckboxProps & InternalTokensProp) => (
    <CompCheckbox {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

class DefaultCheckbox extends Component<CheckboxProps> {
  state = {
    checkedState: !!this.props.checked || !!this.props.defaultChecked,
  };

  static getDerivedStateFromProps(
    nextProps: CheckboxProps,
    prevState: { checkedState: boolean },
  ) {
    const { checked } = nextProps;
    if (checked !== undefined && checked !== prevState.checkedState) {
      return { checkedState: checked };
    }
    return null;
  }

  handleClick = () => {
    const { onClick, checked } = this.props;
    const { checkedState } = this.state;
    if (checked === undefined) {
      this.setState({ checkedState: !checkedState });
    }
    if (!!onClick) {
      onClick({ checkboxState: !checkedState });
    }
  };

  render() {
    const {
      children,
      disabled = false,
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
          [checkboxClassNames.error]: status === 'error' && !disabled,
          [checkboxClassNames.checked]: checkedState && !disabled,
          [checkboxClassNames.large]: variant === 'large',
          [checkboxClassNames.disabled]: !!disabled,
        })}
      >
        {!!checkedState && (
          <Icon
            icon="check"
            className={classnames(iconBaseClassName, {
              [iconClassnames.checked]: checkedState && !disabled,
              [iconClassnames.error]: status === 'error' && !disabled,
              [iconClassnames.disabled]: !!disabled,
            })}
          />
        )}
        {children}
      </StyledCheckbox>
    );
  }
}

export class Checkbox extends Component<CheckboxProps> {
  static large = (props: CheckboxProps) => {
    return <DefaultCheckbox {...props} variant="large" />;
  };

  render() {
    return <DefaultCheckbox {...this.props} />;
  }
}
