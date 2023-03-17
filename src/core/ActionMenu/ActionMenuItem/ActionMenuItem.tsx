import React, { ReactNode, forwardRef, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { HtmlLi } from '../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './ActionMenuItem.baseStyles';
import styled from 'styled-components';
import { Icon, BaseIconKeys, IconProps } from '../../Icon/Icon';
import {
  RouterLink,
  PolymorphicComponentProps,
} from '../../Link/RouterLink/RouterLink';
import {
  ActionMenuProviderState,
  ActionMenuConsumer,
} from './../ActionMenuPopover/ActionMenuPopover';

export interface ActionMenuItemProps {
  /** Custom class */
  className?: string;
  /** Use the polymorphic `<RouterLink>` component as child to get intended CSS styling */
  children: ReactNode;
  /** Toggle to show item as the selected one */
  selected?: boolean;
  /** Disables the item */
  disabled?: boolean;

  /** Ref is forwarded to wrapping div element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLDivElement>;

  onAction: (event: React.MouseEvent) => void;

  onSelected: (event: React.MouseEvent) => void;

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
}

interface BaseActionMenuItemProps
  extends ActionMenuItemProps,
    PolymorphicComponentProps {
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

const ComponentX = forwardRef((props, ref) => {
  const { children, ...passProps } = props;
  return (
    <a {...passProps} ref={ref}>
      Some component - {children}
    </a>
  );
});

const BaseActionMenuItem = (props: BaseActionMenuItemProps) => {
  const {
    selected,
    className,
    children,
    disabled,
    forwardedRef,
    onAction,
    consumer,
    itemIndex,
    icon,
    iconProps = { className: undefined },
    asComponent = ComponentX,
    // asComponent = CustomButton,
    ...passProps
  } = props;

  const { className: iconPropsClassName, ...passIconProps } = iconProps;

  const itemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (consumer.focusedIndex === itemIndex) {
      console.log('hook hit in: ', itemIndex);
      console.log('has current: ', itemRef.current);
      //  itemRef.current?.focus();
    }
  }, [consumer.focusedIndex]);

  return (
    <HtmlLi
      className={classnames(className, {
        [baseClassName]: !selected,
        [selectedClassName]: selected,
        [disabledClassName]: disabled,
      })}
      //   forwardedRef={forwardedRef}
      onClick={(event) => {
        console.log('clikety item');
        consumer.onItemClick(itemIndex);
      }}
      onMouseEnter={() => {
        console.log('item mouse enter');
      }}
      onMouseOver={() => {
        console.log('item mouse over');
        consumer.onItemMouseOver(itemIndex);
      }}
      onMouseLeave={(event) => {
        console.log('item mouse leave');
      }}
      tabIndex={-1}
    >
      <RouterLink
        // ref={itemRef}
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
  (props: BaseActionMenuItemProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseActionMenuItem {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ActionMenuItem = forwardRef<HTMLDivElement, ActionMenuItemProps>(
  (props: ActionMenuItemProps, ref: React.Ref<HTMLDivElement>) => (
    // const { id: propId, ...passProps } = props;
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
