import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlUlWithRef } from '../../../../reset';
import { MultiSelectItemProps } from '../MultiSelectItem/MultiSelectItem';
import { baseStyles } from './MultiSelectItemList.baseStyles';

const baseClassName = 'fi-multiselect-item-list';

const multiSelectItemListClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
};

export interface MultiSelectItemListProps {
  /** MultiSelectItemList container div class name for custom styling. */
  className?: string;
  children:
    | Array<React.ReactElement<MultiSelectItemProps>>
    | React.ReactElement<MultiSelectItemProps>;
  forwardRef: React.RefObject<HTMLUListElement>;
  onBlur?: (event: React.FocusEvent<Element>) => void;
  /** Id needed for aria-owns and aria-controls in Combobox */
  id: string;
}

class BaseMultiSelectItemList extends Component<MultiSelectItemListProps> {
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
        <HtmlDiv className={multiSelectItemListClassNames.content_wrapper}>
          {children}
        </HtmlDiv>
      </HtmlUlWithRef>
    );
  }
}

const StyledMultiSelectItemList = styled(BaseMultiSelectItemList)`
  ${baseStyles}
`;

export class MultiSelectItemList extends Component<MultiSelectItemListProps> {
  render() {
    return <StyledMultiSelectItemList {...this.props} />;
  }
}
