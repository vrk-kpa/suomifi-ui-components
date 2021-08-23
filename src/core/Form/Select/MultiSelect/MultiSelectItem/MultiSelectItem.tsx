import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { HtmlSpan } from '../../../../../reset';
import { Icon } from '../../../../Icon/Icon';
import {
  SelectItem,
  SelectItemProps,
} from '../../BaseSelect/SelectItem/SelectItem';
import { baseStyles } from './MultiSelectItem.baseStyles';

const baseClassName = 'fi-multiselect-item';
const multiSelectItemClassNames = {
  icon_wrapper: `${baseClassName}_icon_wrapper`,
  selected: `${baseClassName}--selected`,
  disabled: `${baseClassName}--disabled`,
};

const iconBaseClassName = `${baseClassName}_checkbox_icon`;
const iconClassnames = {
  disabled: `${iconBaseClassName}--disabled`,
  checked: `${iconBaseClassName}--checked`,
};

export interface MultiSelectItemProps extends SelectItemProps {}

class BaseMultiSelectItem extends Component<
  MultiSelectItemProps & SuomifiThemeProp
> {
  render() {
    const {
      className,
      theme,
      children,
      checked,
      hasKeyboardFocus,
      hightlightQuery,
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
      <SelectItem
        className={classnames(baseClassName, className, {
          [multiSelectItemClassNames.selected]: checked,
          [multiSelectItemClassNames.disabled]: disabled,
        })}
        checked={checked}
        hasKeyboardFocus={hasKeyboardFocus}
        disabled={disabled}
        id={id}
        hightlightQuery={hightlightQuery}
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
      </SelectItem>
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
