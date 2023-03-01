import React, { ReactNode } from 'react';
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
};

const BaseDropdownItem = (props: BaseDropdownItemProps & SuomifiThemeProp) => {
  const { className, theme, consumer, value, ...passProps } = props;
  const selected = consumer.selectedDropdownValue === value;
  const hasKeyboardFocus = consumer.focusedItemID === value;
  return (
    <HtmlLi
      className={classnames(className, dropdownClassNames.item, {
        [dropdownItemClassNames.hasKeyboardFocus]: hasKeyboardFocus,
        [dropdownItemClassNames.selected]: selected,
      })}
      tabIndex={-1}
      role="option"
      aria-selected={selected}
      id={`${consumer.id}-${value}`}
      onClick={(event) => {
        console.log(event);
        consumer.onItemClick(value);
      }}
      {...passProps}
    />
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
