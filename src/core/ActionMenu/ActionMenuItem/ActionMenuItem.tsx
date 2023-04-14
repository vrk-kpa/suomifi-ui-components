import React, { ReactNode, AriaRole } from 'react';
import classnames from 'classnames';
import { HtmlLi } from '../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './ActionMenuItem.baseStyles';
import styled from 'styled-components';
import { Icon, BaseIconKeys, IconProps } from '../../Icon/Icon';
import { RouterLink } from '../../Link';
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
  /** Index number of the child. Internal use only */
  itemIndex: number;
}

interface BaseActionMenuItemProps extends ActionMenuItemProps {
  consumer: ActionMenuProviderState;
}

const baseClassName = 'fi-action-menu-item';
const disabledClassName = `${baseClassName}--disabled`;
const iconClassName = `${baseClassName}_icon`;
const selectedClassName = `${baseClassName}--selected`;

interface RenderComponentProps {
  /** Text of the action */
  children: ReactNode;
  /** id for the component */
  id: string;
  /**  WAI-ARIA */
  role?: AriaRole | undefined;
}

const ButtonComponent = (props: RenderComponentProps) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

const LinkComponent = (props: RenderComponentProps) => {
  const { children, ...passProps } = props;
  return <a {...passProps}>{children}</a>;
};

const BaseActionMenuItem = (
  props: BaseActionMenuItemProps & SuomifiThemeProp,
) => {
  const {
    className,
    children,
    disabled,
    consumer,
    itemIndex,
    icon,
    iconProps = { className: undefined },
    ...passProps
  } = props;

  const { className: iconPropsClassName, ...passIconProps } = iconProps;

  return (
    <HtmlLi
      className={classnames(className, {
        [baseClassName]: itemIndex !== consumer.activeDescendantIndex,
        [selectedClassName]: itemIndex === consumer.activeDescendantIndex,
        [disabledClassName]: disabled,
      })}
      onClick={() => {
        if (!disabled) {
          consumer.onItemClick(itemIndex);
        }
      }}
      onMouseOver={() => {
        consumer.onItemMouseOver(itemIndex);
      }}
      tabIndex={-1}
    >
      <RouterLink
        asComponent={props.href ? LinkComponent : ButtonComponent}
        id={`${itemIndex}-menu-item`}
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
      </RouterLink>
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
