import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { getConditionalAriaProp } from '../../../utils/aria';
import { HtmlLi, HtmlNav, HtmlNavProps, HtmlOl } from '../../../reset';
import { baseStyles } from './Breadcrumb.baseStyles';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import { filterDuplicateKeys } from '../../../utils/common/common';

const baseClassName = 'fi-breadcrumb';
const listClassName = `${baseClassName}_list`;
const itemClassName = `${baseClassName}_item`;

export interface BreadcrumbProps extends HtmlNavProps, MarginProps {
  /** Labels the breadcrumb for screen reader users */
  'aria-label': string;
  /** CSS class for custom styles */
  className?: string;
  /**
   * Use `<BreadcrumbLink>` elements as children
   */
  children?: ReactNode;
}

const breadcrumbItems = (children: ReactNode) =>
  React.Children.map(children, (child) => (
    <HtmlLi className={itemClassName}>{child}</HtmlLi>
  ));

class BaseBreadcrumb extends Component<BreadcrumbProps> {
  render() {
    const { className, children, ...rest } = this.props;
    const [_marginProps, passProps] = separateMarginProps(rest);

    return (
      <HtmlNav
        {...passProps}
        className={classnames(baseClassName, className)}
        style={{ ...passProps?.style }}
      >
        <HtmlOl className={listClassName}>{breadcrumbItems(children)}</HtmlOl>
      </HtmlNav>
    );
  }
}

const StyledBreadcrumb = styled(
  ({
    globalMargins,
    theme,
    ...passProps
  }: BreadcrumbProps & SuomifiThemeProp & GlobalMarginProps) => (
    <BaseBreadcrumb {...passProps} />
  ),
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.breadcrumb,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const Breadcrumb = (props: BreadcrumbProps) => {
  const { 'aria-label': ariaLabel, ...passProps } = props;
  return (
    <SpacingConsumer>
      {({ margins }) => (
        <SuomifiThemeConsumer>
          {({ suomifiTheme }) => (
            <StyledBreadcrumb
              theme={suomifiTheme}
              globalMargins={margins}
              {...passProps}
              {...getConditionalAriaProp('aria-label', [ariaLabel])}
            />
          )}
        </SuomifiThemeConsumer>
      )}
    </SpacingConsumer>
  );
};

Breadcrumb.displayName = 'Breadcrumb';
export { Breadcrumb };
