import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { baseStyles } from '../BaseLink/BaseLink.baseStyles';
import { HtmlA } from '../../../reset';
import { BaseLinkProps, baseClassName } from '../BaseLink/BaseLink';

export interface LinkProps extends BaseLinkProps {}

const StyledLink = styled(({ asProp, className, ...passProps }: LinkProps) => (
  <HtmlA
    {...passProps}
    className={classnames(baseClassName, className)}
    as={asProp}
  />
))`
  ${baseStyles};
`;

/**
 * <i class="semantics" />
 * Used for adding a link
 */
export class Link extends Component<LinkProps> {
  render() {
    return <StyledLink {...this.props} />;
  }
}
