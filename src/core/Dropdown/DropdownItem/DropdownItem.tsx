import React, { ReactNode, useLayoutEffect, useRef } from 'react';
import { default as styled } from 'styled-components';
import { baseStyles } from './DropdownItem.basestyles';
import {
  dropdownClassNames,
  DropdownConsumer,
  DropdownProviderState,
} from '../Dropdown/Dropdown';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlLi } from '../../../reset';
import { Icon } from '../../Icon/Icon';
import { getOwnerDocument } from '../../../utils/common/common';

export interface DropdownItemProps {
  /** Item value */
  value: string;
  /** Item content */
  children: ReactNode;
  /** Classname for item */
  className?: string;
}

interface BaseDropdownItemProps extends DropdownItemProps {
  consumer: DropdownProviderState;
}

const dropdownItemClassNames = {
  hasKeyboardFocus: `${dropdownClassNames.item}--hasKeyboardFocus`,
  selected: `${dropdownClassNames.item}--selected`,
  noSelectedStyles: `${dropdownClassNames.item}--noSelectedStyles`,
  icon: `${dropdownClassNames.item}_icon`,
};

const BaseDropdownItem = (props: BaseDropdownItemProps & SuomifiThemeProp) => {
  const { children, className, theme, consumer, value, ...passProps } = props;
  const selected = consumer.selectedDropdownValue === value;
  const hasKeyboardFocus = consumer.focusedItemValue === value;

  const listElementRef = useRef<HTMLLIElement>(null);

  const listElementId = `${consumer.id}-${value}`;

  useLayoutEffect(() => {
    const ownerDocument = getOwnerDocument(listElementRef);
    if (ownerDocument.activeElement?.id !== listElementId && hasKeyboardFocus) {
      listElementRef.current?.focus({ preventScroll: true });
    }
  }, [consumer.focusedItemValue]);

  return (
    <HtmlLi
      className={classnames(className, dropdownClassNames.item, {
        [dropdownItemClassNames.hasKeyboardFocus]: hasKeyboardFocus,
        [dropdownItemClassNames.selected]: selected,
        [dropdownItemClassNames.noSelectedStyles]: consumer.noSelectedStyles,
      })}
      tabIndex={hasKeyboardFocus ? 0 : -1}
      role="option"
      aria-selected={selected}
      id={listElementId}
      onKeyDown={(event: React.KeyboardEvent) => {
        if (event.key === 'Tab') {
          event.preventDefault();
          consumer.onItemTabPress();
        }
      }}
      onClick={() => {
        consumer.onItemClick(value);
      }}
      forwardedRef={listElementRef}
      {...passProps}
    >
      {children}
      {selected && !consumer.noSelectedStyles && (
        <Icon
          icon="check"
          className={dropdownItemClassNames.icon}
          aria-hidden={true}
        />
      )}
    </HtmlLi>
  );
};

const StyledDropdownItem = styled(BaseDropdownItem)`
  ${({ theme }) => baseStyles(theme)}
`;

const DropdownItem = (props: DropdownItemProps) => (
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
