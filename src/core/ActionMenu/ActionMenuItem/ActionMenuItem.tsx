import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlLi } from '../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './ActionMenuItem.baseStyles';
import styled from 'styled-components';
import { Icon, BaseIconKeys, IconProps } from '../../Icon/Icon';

import {
  ActionMenuProviderState,
  ActionMenuConsumer,
} from './../ActionMenuPopover/ActionMenuPopover';

export interface ActionMenuItemProps {
  /** Custom class */
  className?: string;
  /** Text of the action */
  children: ReactNode;
  /** Disables the item */
  disabled?: boolean;
  /** Icon from suomifi-theme */
  icon?: BaseIconKeys;
  /** Icon from suomifi-theme to be placed on right side */
  iconRight?: BaseIconKeys;
  /** Properties given to Icon-component */
  iconProps?: IconProps;
  /** Link url. If provided the component is rendered as link `<a>` instead of `<button>` */
  href?: string;
  /** Called when menu item is clicked */
  onClick?: () => void;
}

interface BaseActionMenuItemProps extends ActionMenuItemProps {
  consumer: ActionMenuProviderState;
  itemIndex?: number; // Index number of the child. For internal use only. Added by ActionMenuPopover.
}

const baseClassName = 'fi-action-menu-item';
const disabledClassName = `${baseClassName}--disabled`;
const iconClassName = `${baseClassName}_icon`;
const selectedClassName = `${baseClassName}--selected`;

const BaseActionMenuItem = (
  props: BaseActionMenuItemProps & SuomifiThemeProp,
) => {
  const {
    className,
    children,
    disabled,
    consumer,
    itemIndex = -1,
    icon,
    iconProps = { className: undefined },
    onClick,
    href,
    ...passProps
  } = props;

  const { className: iconPropsClassName, ...passIconProps } = iconProps;
  const hasKeyboardFocus = consumer.activeDescendantIndex === itemIndex;
  const listElementRef = React.useRef<HTMLLIElement>(null);

  React.useLayoutEffect(() => {
    if (hasKeyboardFocus) {
      listElementRef.current?.focus({ preventScroll: false });
    }
  }, [consumer.activeDescendantIndex]);

  return (
    <HtmlLi
      forwardedRef={listElementRef}
      className={classnames(baseClassName, className, {
        [selectedClassName]: itemIndex === consumer.activeDescendantIndex,
        [disabledClassName]: disabled,
      })}
      onClick={() => {
        if (!disabled) {
          consumer.onItemClick(itemIndex);

          if (onClick) {
            onClick();
          }

          if (href) {
            window.open(href, '_self');
          }
        }
      }}
      onMouseDown={(event) => {
        // Prevents li from "stealing" focus from ul
        event.preventDefault();
      }}
      onMouseOver={() => {
        consumer.onItemMouseOver(itemIndex);
      }}
      tabIndex={hasKeyboardFocus ? 0 : -1}
      id={`${consumer.parentId}-list-item-${itemIndex}`}
      role="menuitem"
      aria-disabled={disabled}
      {...passProps}
    >
      {!!icon && (
        <Icon
          {...passIconProps}
          mousePointer={true}
          icon={icon}
          color="currentColor"
          className={classnames(iconClassName, iconPropsClassName)}
        />
      )}
      {children}
    </HtmlLi>
  );
};

const StyledActionMenuItem = styled(BaseActionMenuItem)`
  ${({ theme }) => baseStyles(theme)}
`;

const ActionMenuItem = (props: ActionMenuItemProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <ActionMenuConsumer>
        {(consumer) => (
          <StyledActionMenuItem
            theme={suomifiTheme}
            consumer={consumer}
            {...props}
          />
        )}
      </ActionMenuConsumer>
    )}
  </SuomifiThemeConsumer>
);

ActionMenuItem.displayName = 'ActionMenuItem';
export { ActionMenuItem };
