import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { TokensProp, InternalTokensProp } from '../../theme';
import {
  RadioButtonGroup as CompRadioButtonGroup,
  RadioButtonGroupProps as CompRadioButtonGroupProps,
} from '../../../components/Form/RadioButtonGroup';
import { baseStyles } from './RadioButtonGroup.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import classnames from 'classnames';

const baseClassName = 'fi-radio-button-group';

export interface RadioButtonGroupProps
  extends CompRadioButtonGroupProps,
    TokensProp {}

const StyledRadioButtonGroup = styled(
  ({ tokens, ...passProps }: RadioButtonGroupProps & InternalTokensProp) => (
    <CompRadioButtonGroup {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class RadioButtonGroup extends Component<RadioButtonGroupProps> {
  render() {
    const { children, className, ...passProps } = withSuomifiDefaultProps(
      this.props,
    );

    return (
      <StyledRadioButtonGroup
        className={classnames(baseClassName, className, {})}
        {...passProps}
      >
        {children}
      </StyledRadioButtonGroup>
    );
  }
}
