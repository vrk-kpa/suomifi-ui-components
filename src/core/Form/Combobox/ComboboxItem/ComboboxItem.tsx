import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlLi } from '../../../../reset';
import { CheckboxProps, Checkbox } from '../../Checkbox/Checkbox';
import { baseStyles } from './ComboboxItem.baseStyles';

const baseClassName = 'fi-combobox-item';

const comboboxItemClassNames = {
  wrapper: `${baseClassName}_wrapper`,
  hasKeyboardFocus: `${baseClassName}--hasKeyboardFocus`,
};

export interface ComboboxItemProps
  extends Omit<CheckboxProps, 'ref' | 'forwardedRef'> {
  /** ComboboxItem container div class name for custom styling. */
  className?: string;
  /** Indicates if the current item has keyboard focus. */
  hasKeyboardFocus: boolean;
}

class BaseComboboxItem extends Component<ComboboxItemProps> {
  render() {
    const {
      className,
      children,
      checked,
      hasKeyboardFocus,
      disabled,
      id,
      ...passProps
    } = this.props;
    return (
      <HtmlLi
        className={classnames(baseClassName, className, {
          [comboboxItemClassNames.hasKeyboardFocus]: hasKeyboardFocus,
        })}
        tabIndex={-1}
        role="option"
        aria-selected={checked}
        aria-disabled={disabled || false}
        id={id}
      >
        <HtmlDiv className={comboboxItemClassNames.wrapper}>
          <Checkbox disabled={disabled} checked={checked} {...passProps}>
            {children}
          </Checkbox>
        </HtmlDiv>
      </HtmlLi>
    );
  }
}

const StyledComboboxItem = styled(BaseComboboxItem)`
  ${baseStyles}
`;

export class ComboboxItem extends Component<ComboboxItemProps> {
  render() {
    return <StyledComboboxItem {...this.props} />;
  }
}
