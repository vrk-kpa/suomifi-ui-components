import React, { ReactNode, useLayoutEffect, useRef } from 'react';
import { default as styled } from 'styled-components';
import { IconCheck } from 'suomifi-icons';
import { baseStyles } from './DropdownItem.basestyles';
import {
  dropdownClassNames,
  DropdownConsumer,
  DropdownProviderState,
} from '../Dropdown/Dropdown';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../theme';
import { HtmlLi, HtmlLiProps } from '../../../../reset';
import { getOwnerDocument } from '../../../../utils/common';

export interface DropdownItemProps<T extends string = string>
  extends HtmlLiProps {
  /** Item value */
  value: T;
  /** Item content */
  children: ReactNode;
  /** CSS class for custom styles */
  className?: string;
  /** Disables the option
   * @default false
   */
  disabled?: boolean;
}

interface BaseDropdownItemProps<T extends string = string>
  extends DropdownItemProps<T> {
  consumer: DropdownProviderState<T>;
}

const dropdownItemClassNames = {
  hasKeyboardFocus: `${dropdownClassNames.item}--hasKeyboardFocus`,
  selected: `${dropdownClassNames.item}--selected`,
  disabled: `${dropdownClassNames.item}--disabled`,
  noSelectedStyles: `${dropdownClassNames.item}--noSelectedStyles`,
  icon: `${dropdownClassNames.item}_icon`,
};

const BaseDropdownItem = <T extends string>(
  props: BaseDropdownItemProps<T> & SuomifiThemeProp,
) => {
  const {
    children,
    className,
    theme,
    consumer,
    value,
    disabled = false,
    ...passProps
  } = props;
  const selected = consumer.selectedDropdownValue === value;
  const hasKeyboardFocus = consumer.focusedItemValue === value;

  const listElementId = `${consumer.id}-${value}`;

  const listElementRef = useRef<HTMLLIElement>(null);

  useLayoutEffect(() => {
    const ownerDocument = getOwnerDocument(listElementRef);
    if (ownerDocument.activeElement?.id !== listElementId && hasKeyboardFocus) {
      listElementRef.current?.focus({ preventScroll: true });
    }
  }, [consumer.focusedItemValue]);

  const handleClick = () => {
    if (!disabled) {
      consumer.onItemClick(value);
    }
  };

  return (
    <HtmlLi
      className={classnames(className, dropdownClassNames.item, {
        [dropdownItemClassNames.hasKeyboardFocus]: hasKeyboardFocus,
        [dropdownItemClassNames.selected]: selected,
        [dropdownItemClassNames.disabled]: disabled,
        [dropdownItemClassNames.noSelectedStyles]: consumer.noSelectedStyles,
      })}
      tabIndex={hasKeyboardFocus ? 0 : -1}
      role="option"
      aria-disabled={disabled}
      aria-selected={selected}
      id={listElementId}
      onClick={handleClick}
      forwardedRef={listElementRef}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          consumer.onItemTabPress();
        }
      }}
      onMouseOver={() => {
        consumer.onItemMouseOver(value);
      }}
      {...passProps}
    >
      {children}
      {selected && !consumer.noSelectedStyles && (
        <IconCheck className={dropdownItemClassNames.icon} aria-hidden={true} />
      )}
    </HtmlLi>
  );
};

const StyledDropdownItem = styled(BaseDropdownItem)`
  ${({ theme }) => baseStyles(theme)}
`;

const DropdownItem = <T extends string = string>(
  props: DropdownItemProps<T>,
) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <DropdownConsumer>
        {(consumer) => (
          <StyledDropdownItem
            theme={suomifiTheme}
            consumer={consumer}
            {...props}
          />
        )}
      </DropdownConsumer>
    )}
  </SuomifiThemeConsumer>
);

DropdownItem.displayName = 'DropdownItem';
export { DropdownItem };
