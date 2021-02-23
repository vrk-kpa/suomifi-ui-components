import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlLi } from '../../../../reset';
import { TokensProp, InternalTokensProp } from '../../../theme';
import { withSuomifiDefaultProps } from '../../../theme/utils';
import { CheckboxProps, Checkbox } from '../../Checkbox/Checkbox';
import { baseStyles } from './ComboboxItem.baseStyles';

const baseClassName = 'fi-combobox-item';

const comboboxItemClassNames = {
  wrapper: `${baseClassName}_wrapper`,
  currentSelection: `${baseClassName}--currentSelection`,
};

export interface ComboboxItemProps extends CheckboxProps, TokensProp {
  /** ComboboxItem container div class name for custom styling. */
  className?: string;
  currentSelection: boolean;
}

class BaseComboboxItem extends Component<ComboboxItemProps> {
  render() {
    const {
      className,
      children,
      defaultChecked,
      currentSelection,
      disabled,
      id,
      ...passProps
    } = this.props;
    return (
      <HtmlLi
        className={classnames(baseClassName, className, {
          [comboboxItemClassNames.currentSelection]: currentSelection,
        })}
        tabIndex={-1}
        role="option"
        // aria-selected={defaultChecked}
        aria-disabled={disabled}
        aria-selected={currentSelection}
        id={id}
      >
        <HtmlDiv className={comboboxItemClassNames.wrapper}>
          <Checkbox
            disabled={disabled}
            defaultChecked={defaultChecked}
            {...passProps}
          >
            {children}
          </Checkbox>
        </HtmlDiv>
      </HtmlLi>
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
