import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { TokensProp, InternalTokensProp } from '../../theme';
import {
  Radiobutton as CompRadiobutton,
  RadiobuttonProps as CompRadiobuttonProps,
} from '../../../components/Form/Radiobutton';
import { baseStyles } from './Radiobutton.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import classnames from 'classnames';

const baseClassName = 'fi-radiobutton';
const radiobuttonClassNames = {
  disabled: `${baseClassName}--disabled`,
};

export interface RadiobuttonProps extends CompRadiobuttonProps, TokensProp {}

const StyledRadiobutton = styled(
  ({ tokens, ...passProps }: RadiobuttonProps & InternalTokensProp) => (
    <CompRadiobutton {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

class DefaultRadiobutton extends Component<RadiobuttonProps> {
  render() {
    const {
      children,
      disabled = false,
      className,
      ...passProps
    } = withSuomifiDefaultProps(this.props);

    return (
      <StyledRadiobutton
        disabled={disabled}
        className={classnames(baseClassName, className, {
          [radiobuttonClassNames.disabled]: disabled,
        })}
        {...passProps}
      >
        {children}
      </StyledRadiobutton>
    );
  }
}

export class Radiobutton extends Component<RadiobuttonProps> {
  // TODO: Large variant
  render() {
    return <DefaultRadiobutton {...this.props} />;
  }
}
