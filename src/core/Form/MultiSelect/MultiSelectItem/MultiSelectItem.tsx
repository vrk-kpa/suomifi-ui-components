import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiTheme, SuomifiThemeConsumer } from '../../../theme';
import { HtmlLi, HtmlSpan } from '../../../../reset';
import { Icon } from '../../../Icon/Icon';
import { baseStyles } from './MultiSelectItem.baseStyles';

const baseClassName = 'fi-multiselect-item';

const multiSelectItemClassNames = {
  wrapper: `${baseClassName}_wrapper`,
  hasKeyboardFocus: `${baseClassName}--hasKeyboardFocus`,
  selected: `${baseClassName}--selected`,
  disabled: `${baseClassName}--disabled`,
  icon_wrapper: `${baseClassName}_icon_wrapper`,
};

const iconBaseClassName = `${baseClassName}_checkbox_icon`;
const iconClassnames = {
  disabled: `${iconBaseClassName}--disabled`,
  checked: `${iconBaseClassName}--checked`,
};

export interface MultiSelectItemProps {
  /** MultiSelectItem container div class name for custom styling. */
  className?: string;
  /** Indicates if the current item has keyboard focus. */
  hasKeyboardFocus: boolean;

  checked: boolean;
  disabled?: boolean;
  id?: string;
  onClick: () => void;
}

class BaseMultiSelectItem extends Component<
  MultiSelectItemProps & { theme: SuomifiTheme }
> {
  render() {
    const {
      className,
      theme,
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
          [multiSelectItemClassNames.hasKeyboardFocus]: hasKeyboardFocus,
          [multiSelectItemClassNames.selected]: checked,
          [multiSelectItemClassNames.disabled]: disabled,
        })}
        tabIndex={-1}
        role="option"
        aria-selected={checked}
        aria-disabled={disabled || false}
        id={id}
        onClick={onClick}
      >
        <HtmlSpan
          aria-hidden={true}
          className={multiSelectItemClassNames.icon_wrapper}
          {...passProps}
        >
          {!!checked && <CheckedIcon />}
        </HtmlSpan>
        {children}
      </HtmlLi>
    );
  }
}

const StyledMultiSelectItem = styled(BaseMultiSelectItem)`
  ${({ theme }) => baseStyles(theme)}
`;

export class MultiSelectItem extends Component<MultiSelectItemProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledMultiSelectItem theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
