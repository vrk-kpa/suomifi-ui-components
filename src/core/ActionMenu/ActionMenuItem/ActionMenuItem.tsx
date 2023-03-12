import React, { ReactNode, forwardRef } from 'react';
import classnames from 'classnames';
import { HtmlDivWithRef, HtmlLi, HtmlUl } from '../../../reset';
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
}

interface BaseActionMenuItemProps extends ActionMenuItemProps {
  consumer: ActionMenuProviderState;
}

const baseClassName = 'fi-service-navigation-item';
const selectedClassName = `${baseClassName}--selected`;
const disabledClassName = `${baseClassName}--disabled`;

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
    ...passProps
  } = props;

  // return <div ref={forwardedRef}> oop</div>;

  return (
    <HtmlLi
      className={classnames(className, {
        [baseClassName]: !selected,
        [selectedClassName]: selected,
        [disabledClassName]: disabled,
      })}
      role="menuitem"
      aria-disabled={disabled}
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
      {...passProps}
    >
      {children}
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
