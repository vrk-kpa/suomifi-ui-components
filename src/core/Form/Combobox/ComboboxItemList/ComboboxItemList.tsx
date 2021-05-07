import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlUlWithRef } from '../../../../reset';
import { ComboboxItemProps } from '../ComboboxItem/ComboboxItem';
import { baseStyles } from './ComboboxItemList.baseStyles';

const baseClassName = 'fi-combobox-item-list';

const comboboxItemListClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
};

export interface ComboboxItemListProps {
  /** ComboboxItemList container div class name for custom styling. */
  className?: string;
  children:
    | Array<React.ReactElement<ComboboxItemProps>>
    | React.ReactElement<ComboboxItemProps>;
  forwardRef: React.RefObject<HTMLUListElement>;
  onBlur?: (event: React.FocusEvent<Element>) => void;
  /** Id needed for aria-owns and aria-controls in Combobox */
  id: string;
}

class BaseComboboxItemList extends Component<ComboboxItemListProps> {
  render() {
    const {
      className,
      forwardRef,
      children,
      onBlur,
      id,
      ...passProps
    } = this.props;
    return (
      <HtmlUlWithRef
        id={id}
        tabIndex={0}
        forwardRef={forwardRef}
        className={classnames(baseClassName, className, {})}
        {...passProps}
        role="listbox"
        aria-multiselectable="true"
        onBlur={onBlur}
      >
        <HtmlDiv className={comboboxItemListClassNames.content_wrapper}>
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
