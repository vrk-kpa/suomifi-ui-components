import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlDiv, HtmlDivProps } from '../../../reset';
import { AutoId } from '../../utils/AutoId/AutoId';
import { baseStyles } from './ChipList.baseStyles';

const baseClassName = 'fi-chip-list';

const chipListClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
};

export interface ChipListProps extends HtmlDivProps {
  /** ChipList container div class name for custom styling. */
  className?: string;
  /**
   * Unique id
   * If no id is specified, one will be generated automatically
   */
  id?: string;
}

class BaseChipList extends Component<ChipListProps & SuomifiThemeProp> {
  render() {
    const { className, theme, children, id, ...passProps } = this.props;
    return (
      <HtmlDiv className={classnames(baseClassName, className, {})} id={id}>
        <HtmlDiv className={chipListClassNames.content_wrapper} {...passProps}>
          {children}
        </HtmlDiv>
      </HtmlDiv>
    );
  }
}

const StyledChipList = styled(BaseChipList)`
  ${({ theme }) => baseStyles(theme)}
`;

const ChipList = (props: ChipListProps) => {
  const { id: propId, ...passProps } = props;
  return (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <AutoId id={propId}>
          {(id) => (
            <StyledChipList theme={suomifiTheme} id={id} {...passProps} />
          )}
        </AutoId>
      )}
    </SuomifiThemeConsumer>
  );
};

ChipList.displayName = 'ChipList';
export { ChipList };
