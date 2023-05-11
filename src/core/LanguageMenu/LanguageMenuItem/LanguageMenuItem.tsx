import React, { ReactNode, AriaRole } from 'react';
import classnames from 'classnames';
import { HtmlLi, HtmlButton, HtmlA } from '../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './LanguageMenuItem.baseStyles';
import styled from 'styled-components';
import { RouterLink } from '../../Link';
import {
  LanguageMenuProviderState,
  LanguageMenuConsumer,
} from './../LanguageMenuPopover/LanguageMenuPopover';

export interface LanguageMenuItemProps {
  /** Language of the item. Must be provided for assistive technology. */
  lang: string;
  /** Custom class */
  className?: string;
  /** Text of the action */
  children: ReactNode;
  /** Link url. If provided the component is rendered as link `<a>` instead of `<button>` */
  href?: string;
  /** Called when menu item is clicked */
  onClick?: () => void;
  /** Show item as selected one */
  selected?: boolean;
}

interface BaseLanguageMenuItemProps extends LanguageMenuItemProps {
  consumer: LanguageMenuProviderState;
  itemIndex?: number; // Index number of the child. For internal use only. Added by LanguageMenuPopover.
}

const baseClassName = 'fi-language-menu-item';
const hasKeyboardFocusClassName = `${baseClassName}--isHighlighted`;
const selectedClassName = `${baseClassName}--selected`;

interface RenderComponentProps {
  /** Text of the menu item */
  children: ReactNode;
  /** id for the component */
  id: string;
  /**  WAI-ARIA */
  role?: AriaRole | undefined;
}

const ButtonComponent = (props: RenderComponentProps) => {
  const { children, ...passProps } = props;
  return <HtmlButton {...passProps}>{props.children}</HtmlButton>;
};

const LinkComponent = (props: RenderComponentProps) => {
  const { children, ...passProps } = props;
  return <HtmlA {...passProps}>{children}</HtmlA>;
};

const BaseLanguageMenuItem = (
  props: BaseLanguageMenuItemProps & SuomifiThemeProp,
) => {
  const {
    className,
    children,
    selected,
    consumer,
    itemIndex = -1,
    ...passProps
  } = props;

  return (
    <HtmlLi
      className={classnames(baseClassName, className, {
        [hasKeyboardFocusClassName]:
          itemIndex === consumer.activeDescendantIndex,
        [selectedClassName]: selected,
      })}
      onClick={() => {
        consumer.onItemClick(itemIndex);
      }}
      onMouseDown={(event) => {
        // Prevents li from "stealing" focus from ul
        event.preventDefault();
      }}
      onMouseOver={() => {
        consumer.onItemMouseOver(itemIndex);
      }}
      tabIndex={-1}
      id={`${consumer.id}-${itemIndex}-menu-list-item`}
    >
      <RouterLink
        asComponent={props.href ? LinkComponent : ButtonComponent}
        id={`${consumer.id}-${itemIndex}-menu-item`}
        role="menuitem"
        {...passProps}
      >
        {children}
      </RouterLink>
    </HtmlLi>
  );
};

const StyledLanguageMenuItem = styled(BaseLanguageMenuItem)`
  ${({ theme }) => baseStyles(theme)}
`;

const LanguageMenuItem = (props: LanguageMenuItemProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <LanguageMenuConsumer>
        {(consumer) => (
          <StyledLanguageMenuItem
            theme={suomifiTheme}
            consumer={consumer}
            {...props}
          />
        )}
      </LanguageMenuConsumer>
    )}
  </SuomifiThemeConsumer>
);

LanguageMenuItem.displayName = 'LanguageMenuItem';
export { LanguageMenuItem };
