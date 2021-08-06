import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { SuomifiTheme, SuomifiThemeConsumer } from '../../../theme';
import { HtmlDiv, HtmlLi } from '../../../../reset';
import { baseStyles } from './MultiSelectEmptyItem.baseStyles';

const baseClassName = 'fi-multiselect-empty-item';

const multiSelectItemClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
};

export interface MultiSelectEmptyItemProps {
  /** MultiSelectItem container div class name for custom styling. */
  className?: string;
}

class BaseMultiSelectEmptyItem extends Component<
  MultiSelectEmptyItemProps & { theme: SuomifiTheme }
> {
  render() {
    const { className, theme, children, ...passProps } = this.props;
    return (
      <HtmlLi
        className={classnames(baseClassName, className, {})}
        tabIndex={-1}
        role="option"
      >
        <HtmlDiv
          className={multiSelectItemClassNames.content_wrapper}
          {...passProps}
        >
          {children}
        </HtmlDiv>
      </HtmlLi>
    );
  }
}

const StyledMultiSelectEmptyItem = styled(BaseMultiSelectEmptyItem)`
  ${({ theme }) => baseStyles(theme)}
`;

export class MultiSelectEmptyItem extends Component<MultiSelectEmptyItemProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledMultiSelectEmptyItem theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
