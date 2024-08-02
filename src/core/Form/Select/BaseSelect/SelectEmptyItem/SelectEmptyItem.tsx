import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../../theme';
import { HtmlDiv, HtmlLi } from '../../../../../reset';
import { baseStyles } from './SelectEmptyItem.baseStyles';

const baseClassName = 'fi-select-empty-item';

const itemClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
};

export interface SelectEmptyItemProps {
  /** Item container div class name for custom styling. */
  className?: string;
  /** Item content */
  children?: ReactNode;
}

class BaseSelectEmptyItem extends Component<
  SelectEmptyItemProps & SuomifiThemeProp
> {
  render() {
    const { className, theme, children, ...passProps } = this.props;
    return (
      <HtmlLi
        className={classnames(baseClassName, className, {})}
        tabIndex={-1}
        role="option"
      >
        <HtmlDiv className={itemClassNames.content_wrapper} {...passProps}>
          {children}
        </HtmlDiv>
      </HtmlLi>
    );
  }
}

const StyledSelectEmptyItem = styled(BaseSelectEmptyItem)`
  ${({ theme }) => baseStyles(theme)}
`;

export class SelectEmptyItem extends Component<SelectEmptyItemProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledSelectEmptyItem theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
