import React, { ReactElement } from 'react';
import { styled } from 'styled-components';
import { baseStyles } from './DropdownItemGroup.basestyles';
import { dropdownClassNames } from '../Dropdown/Dropdown';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../theme';
import { HtmlDiv, HtmlDivProps } from '../../../../reset';
import { DropdownItemProps } from '../DropdownItem/DropdownItem';
import { AutoId } from '../../../utils/AutoId/AutoId';

export interface DropdownItemGroupProps<T extends string = string>
  extends Omit<HtmlDivProps, 'children'> {
  /** Group label text */
  label: string;
  /** DropdownItem children */
  children:
    | Array<ReactElement<DropdownItemProps<T>>>
    | ReactElement<DropdownItemProps<T>>;
  /** CSS class for custom styles */
  className?: string;
}

interface BaseDropdownItemGroupProps<T extends string = string>
  extends DropdownItemGroupProps<T> {
  labelId: string;
}

const dropdownItemGroupClassNames = {
  label: `${dropdownClassNames.item}-group_label`,
  group: `${dropdownClassNames.item}-group`,
};

const BaseDropdownItemGroup = <T extends string>(
  props: BaseDropdownItemGroupProps<T> & SuomifiThemeProp,
) => {
  const { children, className, theme, label, labelId, ...passProps } = props;

  return (
    <HtmlDiv
      className={classnames(className, dropdownItemGroupClassNames.group)}
      role="group"
      aria-labelledby={labelId}
      {...passProps}
    >
      <HtmlDiv
        className={dropdownItemGroupClassNames.label}
        id={labelId}
        aria-hidden="true"
      >
        {label}
      </HtmlDiv>
      {children}
    </HtmlDiv>
  );
};

const StyledDropdownItemGroup = styled(BaseDropdownItemGroup)`
  ${({ theme }) => baseStyles(theme)}
`;

const DropdownItemGroup = <T extends string = string>(
  props: DropdownItemGroupProps<T>,
) => {
  const { label, ...passProps } = props;
  return (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <AutoId>
          {(id) => (
            <StyledDropdownItemGroup
              theme={suomifiTheme}
              label={label}
              labelId={id}
              {...passProps}
            />
          )}
        </AutoId>
      )}
    </SuomifiThemeConsumer>
  );
};

DropdownItemGroup.displayName = 'DropdownItemGroup';
export { DropdownItemGroup };
