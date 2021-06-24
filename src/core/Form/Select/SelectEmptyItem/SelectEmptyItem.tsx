import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlLi } from '../../../../reset';
import { baseStyles } from './SelectEmptyItem.baseStyles';

const baseClassName = 'fi-select-empty-item';

const selectItemClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
};

export interface SelectEmptyItemProps {
  /** SelectItem container div class name for custom styling. */
  className?: string;
}

class BaseSelectEmptyItem extends Component<SelectEmptyItemProps> {
  render() {
    const { className, children, ...passProps } = this.props;
    return (
      <HtmlLi
        className={classnames(baseClassName, className, {})}
        tabIndex={-1}
        role="option"
      >
        <HtmlDiv
          className={selectItemClassNames.content_wrapper}
          {...passProps}
        >
          {children}
        </HtmlDiv>
      </HtmlLi>
    );
  }
}

const StyledSelectEmptyItem = styled(BaseSelectEmptyItem)`
  ${baseStyles}
`;

export class SelectEmptyItem extends Component<SelectEmptyItemProps> {
  render() {
    return <StyledSelectEmptyItem {...this.props} />;
  }
}
