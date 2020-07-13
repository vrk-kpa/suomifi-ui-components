import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { TokensProp, InternalTokensProp } from '../../theme';
import {
  RadiobuttonGroup as CompRadiobuttonGroup,
  RadiobuttonGroupProps as CompRadiobuttonGroupProps,
} from '../../../components/Form/RadiobuttonGroup';
import { baseStyles } from './RadiobuttonGroup.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import classnames from 'classnames';

const baseClassName = 'fi-radiobuttongroup';

export interface RadiobuttonGroupProps
  extends CompRadiobuttonGroupProps,
    TokensProp {}

const StyledRadiobuttonGroup = styled(
  ({ tokens, ...passProps }: RadiobuttonGroupProps & InternalTokensProp) => (
    <CompRadiobuttonGroup {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class RadiobuttonGroup extends Component<RadiobuttonGroupProps> {
  render() {
    const { children, className, ...passProps } = withSuomifiDefaultProps(
      this.props,
    );

    return (
      <StyledRadiobuttonGroup
        className={classnames(baseClassName, className, {})}
        {...passProps}
      >
        {children}
      </StyledRadiobuttonGroup>
    );
  }
}
