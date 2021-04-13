import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivProps } from '../../../../reset';
import { AutoId } from '../../../../utils/AutoId';
import { baseStyles } from './ChipList.baseStyles';

const baseClassName = 'fi-chip-list';

const chipListClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
};

export interface ChipListProps extends HtmlDivProps {
  className?: string;
  /**
   * Unique id
   * If no id is specified, one will be generated automatically
   */
  id?: string;
}

class BaseChipList extends Component<ChipListProps> {
  render() {
    const { className, children, id, ...passProps } = this.props;
    return (
      <HtmlDiv className={classnames(baseClassName, className, {})} id={id}>
        <HtmlDiv className={chipListClassNames.content_wrapper} {...passProps}>
          {children}
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

const StyledChipList = styled(({ id: propId, ...passProps }: ChipListProps) => (
  <AutoId id={propId}>{(id) => <BaseChipList id={id} {...passProps} />}</AutoId>
))`
  ${baseStyles}
`;

export class ChipList extends Component<ChipListProps> {
  render() {
    return <StyledChipList {...this.props} />;
  }
}
