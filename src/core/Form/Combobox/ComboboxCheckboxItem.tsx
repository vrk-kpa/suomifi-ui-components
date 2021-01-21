import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv } from '../../../reset';
import { TokensProp, InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { CheckboxProps, Checkbox } from '../Checkbox/Checkbox';
import { baseStyles } from './ComboboxCheckboxItem.baseStyles';

const baseClassName = 'fi-combobox-item';

const comboboxItemClassNames = {
  wrapper: `${baseClassName}_wrapper`,
};

export interface ComboboxItemProps extends CheckboxProps, TokensProp {
  /** ComboboxItem container div class name for custom styling. */
  className?: string;
}

class BaseComboboxItem extends Component<ComboboxItemProps> {
  render() {
    const { className, children, ...passProps } = this.props;
    return (
      <HtmlDiv className={classnames(baseClassName, className, {})}>
        <HtmlDiv className={comboboxItemClassNames.wrapper}>
          <Checkbox {...passProps}>{children}</Checkbox>
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

const StyledComboboxItem = styled(
  ({ tokens, ...passProps }: ComboboxItemProps & InternalTokensProp) => (
    <BaseComboboxItem {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class ComboboxItem extends Component<ComboboxItemProps> {
  render() {
    return <StyledComboboxItem {...withSuomifiDefaultProps(this.props)} />;
  }
}
