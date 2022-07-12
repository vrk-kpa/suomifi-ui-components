import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { getConditionalAriaProp } from '../../../utils/aria';
import { HtmlLi, HtmlNav, HtmlNavProps, HtmlOl } from '../../../reset';
import { baseStyles } from './Breadcrumb.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';

const baseClassName = 'fi-breadcrumb';
const listClassName = `${baseClassName}_list`;
const itemClassName = `${baseClassName}_item`;

export interface BreadcrumbProps extends HtmlNavProps {
  /** Name for the breadcrumb like 'Breadcrumb' */
  'aria-label': string;
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Link element displayed content
   */
  children?: ReactNode;
}

const breadcrumbItems = (children: ReactNode) =>
  React.Children.map(children, (child) => (
    <HtmlLi className={itemClassName}>{child}</HtmlLi>
  ));

class BaseBreadcrumb extends Component<BreadcrumbProps & SuomifiThemeProp> {
  render() {
    const { className, theme, children, ...passProps } = this.props;
    return (
      <HtmlNav {...passProps} className={classnames(baseClassName, className)}>
        <HtmlOl className={listClassName}>{breadcrumbItems(children)}</HtmlOl>
      </HtmlNav>
    );
  }
}

const StyledBreadcrumb = styled(BaseBreadcrumb)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Used for navigation path
 */
const Breadcrumb = (props: BreadcrumbProps) => {
  const { 'aria-label': ariaLabel, ...passProps } = props;
  return (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledBreadcrumb
          theme={suomifiTheme}
          {...passProps}
          {...getConditionalAriaProp('aria-label', [ariaLabel])}
        />
      )}
    </SuomifiThemeConsumer>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
export { Breadcrumb };
