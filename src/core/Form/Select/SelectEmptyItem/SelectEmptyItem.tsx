import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlLi } from '../../../../reset';
import { baseStyles } from './SelectEmptyItem.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../../theme';

const baseClassName = 'fi-select-empty-item';

const selectItemClassNames = {
  content_wrapper: `${baseClassName}_content_wrapper`,
};

export interface SelectEmptyItemProps {
  /** SelectItem container div class name for custom styling. */
  className?: string;
}

class BaseSelectEmptyItem extends Component<
  SelectEmptyItemProps & SuomifiThemeProp
> {
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
