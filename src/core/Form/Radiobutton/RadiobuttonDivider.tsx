import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { TokensProp, InternalTokensProp } from '../../theme';
import {
  RadiobuttonDivider as CompRadiobuttonDivider,
  RadiobuttonDividerProps as CompRadiobuttonDividerProps,
} from '../../../components/Form/RadiobuttonDivider';
import { baseStyles } from './RadiobuttonDivider.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import classnames from 'classnames';

const baseClassName = 'fi-radiobuttondivider';
const radiobuttonDividerClassNames = {
  large: `${baseClassName}--large`,
};

export interface RadiobuttonDividerProps
  extends CompRadiobuttonDividerProps,
    TokensProp {}

const StyledRadiobuttonDivider = styled(
  ({ tokens, ...passProps }: RadiobuttonDividerProps & InternalTokensProp) => (
    <CompRadiobuttonDivider {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class RadiobuttonDivider extends Component<RadiobuttonDividerProps> {
  render() {
    const { className, variant, ...passProps } = withSuomifiDefaultProps(
      this.props,
    );
    return (
      <StyledRadiobuttonDivider
        className={classnames(baseClassName, className, {
          [radiobuttonDividerClassNames.large]: variant === 'large',
        })}
        {...passProps}
      />
    );
  }
}
