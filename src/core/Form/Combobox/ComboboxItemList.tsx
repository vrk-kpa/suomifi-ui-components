import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlUlWithRef } from '../../../reset';
import { TokensProp, InternalTokensProp } from '../../theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { baseStyles } from './ComboboxItemList.baseStyles';
import { ComboboxItemProps } from './ComboboxItem';

const baseClassName = 'fi-combobox-item-list';

const comboboxItemListClassNames = {
  wrapper: `${baseClassName}_wrapper`,
};

export interface ComboboxItemListProps extends TokensProp {
  /** ComboboxItemList container div class name for custom styling. */
  className?: string;
  children: Array<React.ReactElement<ComboboxItemProps>>;
  forwardRef: React.RefObject<HTMLUListElement>;
}

class BaseComboboxItemList extends Component<ComboboxItemListProps> {
  render() {
    const { className, forwardRef, children, ...passProps } = this.props;
    return (
      <HtmlUlWithRef
        forwardRef={forwardRef}
        className={classnames(baseClassName, className, {})}
        {...passProps}
      >
        <HtmlDiv className={comboboxItemListClassNames.wrapper}>
          {children}
        </HtmlDiv>
      </HtmlUlWithRef>
    );
  }
}

const StyledComboboxItemList = styled(
  ({ tokens, ...passProps }: ComboboxItemListProps & InternalTokensProp) => (
    <BaseComboboxItemList {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class ComboboxItemList extends Component<ComboboxItemListProps> {
  render() {
    return <StyledComboboxItemList {...withSuomifiDefaultProps(this.props)} />;
  }
}
