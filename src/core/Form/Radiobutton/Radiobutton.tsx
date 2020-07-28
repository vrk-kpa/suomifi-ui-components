import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { TokensProp, InternalTokensProp } from '../../theme';
import {
  Radiobutton as CompRadiobutton,
  RadiobuttonProps as CompRadiobuttonProps,
} from '../../../components/Form/Radiobutton';
import { RadiobuttonGroup, RadiobuttonGroupProps } from './RadiobuttonGroup';
import {
  RadiobuttonDivider,
  RadiobuttonDividerProps,
} from './RadiobuttonDivider';
import { baseStyles } from './Radiobutton.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import classnames from 'classnames';

const baseClassName = 'fi-radiobutton';
const radiobuttonClassNames = {
  disabled: `${baseClassName}--disabled`,
  large: `${baseClassName}--large`,
  checked: `${baseClassName}--checked`,
};

export interface RadiobuttonProps extends CompRadiobuttonProps, TokensProp {}

const StyledRadiobutton = styled(
  ({
    tokens,
    className,
    disabled = false,
    variant,
    checked,
    ...passProps
  }: RadiobuttonProps & InternalTokensProp) => (
    <CompRadiobutton
      className={classnames(baseClassName, className, {
        [radiobuttonClassNames.disabled]: disabled,
        [radiobuttonClassNames.large]: variant === 'large',
        [radiobuttonClassNames.checked]: checked,
      })}
      checked={checked}
      disabled={disabled}
      {...passProps}
    />
  ),
)`
  ${(props) => baseStyles(props)}
`;

class DefaultRadiobutton extends Component<
  RadiobuttonProps & InternalTokensProp
> {
  render() {
    return <StyledRadiobutton {...this.props} />;
  }
}

export class Radiobutton extends Component<RadiobuttonProps> {
  static group = (props: RadiobuttonGroupProps) => {
    return <RadiobuttonGroup {...withSuomifiDefaultProps(props)} />;
  };

  static large = (props: RadiobuttonProps) => {
    return (
      <DefaultRadiobutton {...withSuomifiDefaultProps(props)} variant="large" />
    );
  };

  static divider = (props: RadiobuttonDividerProps) => {
    return <RadiobuttonDivider {...withSuomifiDefaultProps(props)} />;
  };

  render() {
    return <DefaultRadiobutton {...withSuomifiDefaultProps(this.props)} />;
  }
}
