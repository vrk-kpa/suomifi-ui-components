import React, { ReactNode, forwardRef, AriaRole } from 'react';
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
  /** Ref is forwarded to wrapping div element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLDivElement>;
  /**
   * Icon from suomifi-theme
   */
  icon?: BaseIconKeys;
  /**
   * Icon from suomifi-theme to be placed on right side
   */
  iconRight?: BaseIconKeys;
  /**
   * Properties given to Icon-component
   */
  iconProps?: IconProps;
  /** Link url. If provided the cmponent is rendered as link <a> instead of <button> */
  href?: string;
}

export interface InternalActionMenuItemProps extends ActionMenuItemProps {
  itemIndex: number;
}

interface BaseActionMenuItemProps extends InternalActionMenuItemProps {
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

const BaseActionMenuItem = (props: BaseActionMenuItemProps) => {
  const {
    className,
    children,
    disabled,
    consumer,
    itemIndex,
    icon,
    iconProps = { className: undefined },
    href,
  } = props;

  const { className: iconPropsClassName, ...passIconProps } = iconProps;

  return (
    <HtmlLi
      className={classnames(className, {
        [baseClassName]: itemIndex !== consumer.focusedIndex,
        [selectedClassName]: itemIndex === consumer.focusedIndex,
        [disabledClassName]: disabled,
      })}
      onClick={() => {
        consumer.onItemClick(itemIndex);
      }}
      onMouseOver={() => {
        consumer.onItemMouseOver(itemIndex);
      }}
      tabIndex={-1}
    >
      <RouterLink
        asComponent={href ? LinkComponent : ButtonComponent}
        id={`${itemIndex}-menu-item`}
        role="menuitem"
        aria-disabled={disabled}
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

const StyledActionMenuItem = styled(
  (props: BaseActionMenuItemProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseActionMenuItem {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ActionMenuItem = forwardRef<HTMLDivElement, InternalActionMenuItemProps>(
  (props: InternalActionMenuItemProps, ref: React.Ref<HTMLDivElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <ActionMenuConsumer>
          {(consumer) => (
            <StyledActionMenuItem
              theme={suomifiTheme}
              consumer={consumer}
              forwardedRef={ref}
              {...props}
            />
          )}
        </ActionMenuConsumer>
      )}
    </SuomifiThemeConsumer>
  ),
);

ActionMenuItem.displayName = 'ActionMenuItem';
export { ActionMenuItem };
