import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { TokensProp, InternalTokensProp } from '../../theme';
import {
  RadioButton as CompRadioButton,
  RadioButtonProps as CompRadioButtonProps,
} from '../../../components/Form/RadioButton';
import { RadioButtonGroup, RadioButtonGroupProps } from './RadioButtonGroup';
import {
  RadioButtonDivider,
  RadioButtonDividerProps,
} from './RadioButtonDivider';
import { baseStyles } from './RadioButton.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import classnames from 'classnames';

const baseClassName = 'fi-radio-button';
const radioButtonClassNames = {
  disabled: `${baseClassName}--disabled`,
  large: `${baseClassName}--large`,
  checked: `${baseClassName}--checked`,
};

export interface RadioButtonProps extends CompRadioButtonProps, TokensProp {}

const StyledRadioButton = styled(
  ({
    tokens,
    className,
    disabled = false,
    variant,
    checked,
    ...passProps
  }: RadioButtonProps & InternalTokensProp) => (
    <CompRadioButton
      className={classnames(baseClassName, className, {
        [radioButtonClassNames.disabled]: disabled,
        [radioButtonClassNames.large]: variant === 'large',
        [radioButtonClassNames.checked]: checked,
      })}
      checked={checked}
      disabled={disabled}
      {...passProps}
    />
  ),
)`
  ${(props) => baseStyles(props)}
`;

class DefaultRadioButton extends Component<
  RadioButtonProps & InternalTokensProp
> {
  render() {
    return <StyledRadioButton {...this.props} />;
  }
}

export class RadioButton extends Component<RadioButtonProps> {
  static group = (props: RadioButtonGroupProps) => (
    <RadioButtonGroup {...withSuomifiDefaultProps(props)} />
  );

  static large = (props: RadioButtonProps) => (
    <DefaultRadioButton {...withSuomifiDefaultProps(props)} variant="large" />
  );

  static divider = (props: RadioButtonDividerProps) => (
    <RadioButtonDivider {...withSuomifiDefaultProps(props)} />
  );

  render() {
    return <DefaultRadioButton {...withSuomifiDefaultProps(this.props)} />;
  }
}
