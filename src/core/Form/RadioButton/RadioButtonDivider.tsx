import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import { HtmlSpan } from '../../../reset';
import { TokensProp, InternalTokensProp } from '../../theme';
import { baseStyles } from './RadioButtonDivider.baseStyles';
import { withSuomifiDefaultProps } from '../../theme/utils';
import classnames from 'classnames';

const baseClassName = 'fi-radio-button-divider';
const radioButtonDividerClassNames = {
  large: `${baseClassName}--large`,
};

export interface RadioButtonDividerProps extends TokensProp {
  children: ReactNode;
  className?: string;
  variant?: 'small' | 'large';
}

const StyledRadioButtonDivider = styled(
  ({ className, children }: RadioButtonDividerProps & InternalTokensProp) => (
    <HtmlSpan className={className}>{children}</HtmlSpan>
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
