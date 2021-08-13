import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlLi } from '../../../../reset';
import { baseStyles } from './SelectItem.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../theme';

const baseClassName = 'fi-select-item';

const selectItemClassNames = {
  wrapper: `${baseClassName}_wrapper`,
  hasKeyboardFocus: `${baseClassName}--hasKeyboardFocus`,
  selected: `${baseClassName}--selected`,
  disabled: `${baseClassName}--disabled`,
  icon_wrapper: `${baseClassName}_icon_wrapper`,
};

export interface SelectItemProps {
  /** SelectItem container div class name for custom styling. */
  className?: string;
  /** Indicates if the current item has keyboard focus. */
  hasKeyboardFocus: boolean;

  checked: boolean;
  disabled?: boolean;
  id?: string;
  onClick: () => void;
}

class BaseSelectItem extends Component<SelectItemProps & SuomifiThemeProp> {
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

    return (
      <HtmlLi
        className={classnames(baseClassName, className, {
          [selectItemClassNames.hasKeyboardFocus]: hasKeyboardFocus,
          [selectItemClassNames.selected]: checked,
          [selectItemClassNames.disabled]: disabled,
        })}
        tabIndex={-1}
        role="option"
        aria-selected={checked}
        aria-disabled={disabled || false}
        id={id}
        onClick={onClick}
        {...passProps}
      >
        {children}
      </HtmlLi>
    );
  }
}

const StyledSelectItem = styled(BaseSelectItem)`
  ${({ theme }) => baseStyles(theme)}
`;

export class SelectItem extends Component<SelectItemProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledSelectItem theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
