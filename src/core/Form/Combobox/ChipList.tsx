import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { TokensProp, InternalTokensProp } from '../../theme';
import { HtmlDiv, HtmlDivProps } from '../../../reset';
import { AutoId } from '../../../utils/AutoId';
import { baseStyles } from './ChipList.baseStyles';

const baseClassName = 'fi-chip-list';

const chipListClassNames = {
  wrapper: `${baseClassName}_wrapper`,
};

export interface ChipListProps extends HtmlDivProps, TokensProp {
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
        <HtmlDiv className={chipListClassNames.wrapper} {...passProps}>
          {children}
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

const StyledChipList = styled(
  ({
    tokens,
    id: propId,
    ...passProps
  }: ChipListProps & InternalTokensProp) => (
    <AutoId id={propId}>
      {(id) => <BaseChipList id={id} {...passProps} />}
    </AutoId>
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class ChipList extends Component<ChipListProps> {
  render() {
    return <StyledChipList {...withSuomifiDefaultProps(this.props)} />;
  }
}
