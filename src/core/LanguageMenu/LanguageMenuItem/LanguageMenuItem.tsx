import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlButton } from '../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './LanguageMenuItem.baseStyles';
import { styled } from 'styled-components';
import {
  LanguageMenuProviderState,
  LanguageMenuConsumer,
} from './../LanguageMenuPopover/LanguageMenuPopover';

export interface LanguageMenuItemProps {
  /** Language code for language menu item. Must be provided for assistive technology. */
  lang: string;
  /** CSS class for custom styles */
  className?: string;
  /** Text for the language menu item. Text should contain full language name and not only the abbreviation. */
  children: ReactNode;
  /** Callback fired when menu item is clicked */
  onSelect: () => void;
  /** Marks the item as the currently selected one */
  selected?: boolean;
}

interface BaseLanguageMenuItemProps extends LanguageMenuItemProps {
  consumer: LanguageMenuProviderState;
  itemIndex?: number; // Index number of the child. For internal use only. Added by LanguageMenuPopover.
}

const baseClassName = 'fi-language-menu-item';
const hasKeyboardFocusClassName = `${baseClassName}--isHighlighted`;
const selectedClassName = `${baseClassName}--selected`;

const BaseLanguageMenuItem = (
  props: BaseLanguageMenuItemProps & SuomifiThemeProp,
) => {
  const {
    className,
    children,
    selected,
    onSelect,
    consumer,
    itemIndex = -1,
    theme,
    ...passProps
  } = props;

  const hasKeyboardFocus = consumer.activeDescendantIndex === itemIndex;
  const listElementRef = React.useRef<HTMLButtonElement>(null);

  React.useLayoutEffect(() => {
    if (hasKeyboardFocus) {
      listElementRef.current?.focus();
    }
  }, [consumer.activeDescendantIndex]);

  return (
    <HtmlButton
      forwardedRef={listElementRef}
      className={classnames(baseClassName, className, {
        [hasKeyboardFocusClassName]: hasKeyboardFocus,
        [selectedClassName]: selected,
      })}
      onClick={() => {
        onSelect();
        consumer.onItemClick(itemIndex);
      }}
      onMouseOver={() => {
        consumer.onItemMouseOver(itemIndex);
      }}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          listElementRef.current?.click();
        }
      }}
      tabIndex={hasKeyboardFocus ? 0 : -1}
      id={`${consumer.parentId}-list-item-${itemIndex}`}
      role="menuitem"
      aria-current={selected}
      {...passProps}
    >
      {children}
    </HtmlButton>
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
