import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlLi, HtmlSpan } from '../../../../reset';
import { Icon } from '../../../Icon/Icon';
import { baseStyles } from './ComboboxItem.baseStyles';

const baseClassName = 'fi-combobox-item';

const comboboxItemClassNames = {
  wrapper: `${baseClassName}_wrapper`,
  hasKeyboardFocus: `${baseClassName}--hasKeyboardFocus`,
  selected: `${baseClassName}--selected`,
  disabled: `${baseClassName}--disabled`,
  text: `${baseClassName}_text`,
};

const iconBaseClassName = `${baseClassName}_checkbox_icon`;
const iconClassnames = {
  disabled: `${iconBaseClassName}--disabled`,
  checked: `${iconBaseClassName}--checked`,
};

export interface ComboboxItemProps {
  /** ComboboxItem container div class name for custom styling. */
  className?: string;
  /** Indicates if the current item has keyboard focus. */
  hasKeyboardFocus: boolean;

  checked: boolean;
  disabled?: boolean;
  id?: string;
  onClick: () => void;
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
      onClick,
      ...passProps
    } = this.props;

    const CheckedIcon = () => (
      <Icon
        icon="check"
        className={classnames(iconBaseClassName, {
          [iconClassnames.checked]: checked && !disabled,
          [iconClassnames.disabled]: !!disabled,
        })}
      />
    );

    return (
      <HtmlLi
        className={classnames(baseClassName, className, {
          [comboboxItemClassNames.hasKeyboardFocus]: hasKeyboardFocus,
          [comboboxItemClassNames.selected]: checked,
          [comboboxItemClassNames.disabled]: disabled,
        })}
        tabIndex={-1}
        role="option"
        aria-selected={disabled ? undefined : checked}
        aria-disabled={disabled || false}
        id={id}
        onClick={onClick}
      >
        <HtmlSpan
          aria-hidden={true}
          className={comboboxItemClassNames.text}
          {...passProps}
        >
          {!!checked && <CheckedIcon />}
        </HtmlSpan>
        {children}
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
