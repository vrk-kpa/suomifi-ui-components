import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlUlWithRef } from '../../../../reset';
import { SelectItemProps } from '../SelectItem/SelectItem';
import { baseStyles } from './SelectItemList.baseStyles';

const baseClassName = 'fi-select-item-list';

const selectItemListClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
};

export interface SelectItemListProps {
  /** SelectItemList container div class name for custom styling. */
  className?: string;
  children:
    | Array<React.ReactElement<SelectItemProps>>
    | React.ReactElement<SelectItemProps>;
  forwardRef: React.RefObject<HTMLUListElement>;
  onBlur?: (event: React.FocusEvent<Element>) => void;
  /** Id needed for aria-owns and aria-controls in Combobox */
  id: string;
}

class BaseSelectItemList extends Component<SelectItemListProps> {
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
        onBlur={onBlur}
      >
        <HtmlDiv className={selectItemListClassNames.content_wrapper}>
          {children}
        </HtmlDiv>
      </HtmlUlWithRef>
    );
  }
}

const StyledSelectItemList = styled(BaseSelectItemList)`
  ${baseStyles}
`;

export class SelectItemList extends Component<SelectItemListProps> {
  render() {
    return <StyledSelectItemList {...this.props} />;
  }
}
