import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlUlWithRef } from '../../../../reset';
import { ComboboxItemProps } from '../ComboboxItem/ComboboxItem';
import { baseStyles } from './ComboboxItemList.baseStyles';

const baseClassName = 'fi-combobox-item-list';

const comboboxItemListClassNames = {
  wrapper: `${baseClassName}_wrapper`,
};

export interface ComboboxItemListProps {
  /** ComboboxItemList container div class name for custom styling. */
  className?: string;
  children:
    | Array<React.ReactElement<ComboboxItemProps>>
    | React.ReactElement<ComboboxItemProps>;
  forwardRef: React.RefObject<HTMLUListElement>;
  onBlur?: (event: React.FocusEvent<Element>) => void;
}

class BaseComboboxItemList extends Component<ComboboxItemListProps> {
  render() {
    const {
      className,
      forwardRef,
      children,
      onBlur,
      ...passProps
    } = this.props;
    return (
      <HtmlUlWithRef
        tabIndex={0}
        forwardRef={forwardRef}
        className={classnames(baseClassName, className, {})}
        {...passProps}
        role="listbox"
        onBlur={onBlur}
      >
        <HtmlDiv className={comboboxItemListClassNames.wrapper}>
          {children}
        </HtmlDiv>
      </HtmlUlWithRef>
    );
  }
}

const StyledComboboxItemList = styled(BaseComboboxItemList)`
  ${baseStyles}
`;

export class ComboboxItemList extends Component<ComboboxItemListProps> {
  render() {
    return <StyledComboboxItemList {...this.props} />;
  }
}
