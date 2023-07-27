import React, { ReactElement, ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlButton } from '../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './ActionMenuItem.baseStyles';
import styled from 'styled-components';
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
  /** Icon from suomifi-icons to be shown inside the input field */
  icon?: ReactElement;
  /** Callback fired when menu item is clicked */
  onClick?: (event: React.MouseEvent) => void;
}

interface BaseActionMenuItemProps extends ActionMenuItemProps {
  consumer: ActionMenuProviderState;
  itemIndex?: number; // Index number of the child. For internal use only. Added by ActionMenuPopover.
}

const baseClassName = 'fi-action-menu-item';
const disabledClassName = `${baseClassName}--disabled`;
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
    onClick,
    theme, // Only destructured away so they don't end up in the DOM
    ...passProps
  } = props;

  const hasKeyboardFocus = consumer.activeDescendantIndex === itemIndex;
  const listElementRef = React.useRef<HTMLButtonElement>(null);

  React.useLayoutEffect(() => {
    if (hasKeyboardFocus) {
      listElementRef.current?.focus({ preventScroll: false });
    }
  }, [consumer.activeDescendantIndex]);

  return (
    <HtmlButton
      forwardedRef={listElementRef}
      className={classnames(baseClassName, className, {
        [selectedClassName]: itemIndex === consumer.activeDescendantIndex,
        [disabledClassName]: disabled,
      })}
      onClick={(event) => {
        if (!disabled) {
          event.preventDefault();
          if (onClick) onClick(event);
          consumer.onItemClick(itemIndex);
        }
      }}
      onMouseOver={() => {
        consumer.onItemMouseOver(itemIndex);
      }}
      onKeyDown={(event) => {
        if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault();
          listElementRef.current?.click();
        }
      }}
      tabIndex={hasKeyboardFocus ? 0 : -1}
      id={`${consumer.parentId}-list-item-${itemIndex}`}
      role="menuitem"
      aria-disabled={disabled}
      {...passProps}
    >
      {icon}
      {children}
    </HtmlButton>
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
