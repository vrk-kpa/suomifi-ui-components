import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { TokensProp, InternalTokensProp } from '../../theme';
import {
  RadioButtonDivider as CompRadioButtonDivider,
  RadioButtonDividerProps as CompRadioButtonDividerProps,
} from '../../../components/Form/RadioButtonDivider';
import { baseStyles } from './RadioButtonDivider.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import classnames from 'classnames';

const baseClassName = 'fi-radio-button-divider';
const radioButtonDividerClassNames = {
  large: `${baseClassName}--large`,
};

export interface RadioButtonDividerProps
  extends CompRadioButtonDividerProps,
    TokensProp {}

const StyledRadioButtonDivider = styled(
  ({ tokens, ...passProps }: RadioButtonDividerProps & InternalTokensProp) => (
    <CompRadioButtonDivider {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class RadioButtonDivider extends Component<RadioButtonDividerProps> {
  render() {
    const { className, variant, ...passProps } = withSuomifiDefaultProps(
      this.props,
    );
    return (
      <StyledRadioButtonDivider
        className={classnames(baseClassName, className, {
          [radioButtonDividerClassNames.large]: variant === 'large',
        })}
        {...passProps}
      />
    );
  }
}
