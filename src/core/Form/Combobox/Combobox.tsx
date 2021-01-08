import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { HtmlDiv } from '../../../reset';
import { TokensProp, InternalTokensProp } from '../../theme';
import { baseStyles } from './Combobox.baseStyles';
import classnames from 'classnames';

const baseClassName = 'fi-combobox';
// const comboboxClassNames = {
//   wrapper: `${baseClassName}_wrapper`,
// };

export interface ComboboxProps extends TokensProp {
  /** Combobox container div class name for custom styling. */
  className?: string;
}

class BaseCombobox extends Component<ComboboxProps> {
  render() {
    const { className, ...passProps } = this.props;

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(baseClassName, className, {})}
      >
        Combobox
      </HtmlDiv>
    );
  }
}

const StyledCombobox = styled(
  ({ tokens, ...passProps }: ComboboxProps & InternalTokensProp) => (
    <BaseCombobox {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class Combobox extends Component<ComboboxProps> {
  render() {
    return <StyledCombobox {...withSuomifiDefaultProps(this.props)} />;
  }
}
