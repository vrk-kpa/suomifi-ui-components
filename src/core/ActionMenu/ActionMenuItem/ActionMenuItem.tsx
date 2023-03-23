import React, { ReactNode, forwardRef, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { HtmlLi } from '../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './ActionMenuItem.baseStyles';
import styled from 'styled-components';
import { Icon, BaseIconKeys, IconProps } from '../../Icon/Icon';
import { RouterLink, RouterLinkProps } from '../../Link';
import {
  ActionMenuProviderState,
  ActionMenuConsumer,
} from './../ActionMenuPopover/ActionMenuPopover';

type ItemAction =
  | {
      href: string;
      onClick: never;
    }
  | {
      href: never;
      onClick: (event: React.MouseEvent) => void;
    };

export interface InternalActionMenuItemProps {
  /** Custom class */
  className?: string;
  /** Text of the action */
  children: ReactNode;
  /** Disables the item */
  disabled?: boolean;

  /** Ref is forwarded to wrapping div element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLDivElement>;

  itemIndex: number;

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

  asComponent: any;
}

// export type ActionMenuItemProps extends InternalActionMenuItemProps , ItemAction

interface ActionMenuItemProps extends InternalActionMenuItemProps {
  consumer: ActionMenuProviderState;
}

const baseClassName = 'fi-action-menu-item';
const disabledClassName = `${baseClassName}--disabled`;
const iconClassName = `${baseClassName}_icon`;
const selectedClassName = `${baseClassName}--selected`;

const CustomButton = (props) => {
  const { children, ...passProps } = props;
  return <button {...passProps}>{props.children}</button>;
};

const BaseActionMenuItem = (props: ActionMenuItemProps) => {
  const {
    className,
    children,
    disabled,
    forwardedRef,
    consumer,
    itemIndex,
    icon,
    iconProps = { className: undefined },
    asComponent = CustomButton,
    ...passProps
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
        asComponent={asComponent}
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

const StyledActionMenuItem = styled(
  (props: ActionMenuItemProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseActionMenuItem {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ActionMenuItem = forwardRef<HTMLDivElement, ActionMenuItemProps>(
  (props: ActionMenuItemProps, ref: React.Ref<HTMLDivElement>) => (
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
