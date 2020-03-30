import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import { Link, LinkProps } from './Link';
import {
  LinkSkip as CompLinkSkip,
  LinkSkipProps as CompLinkSkipProps,
} from '../../components/Link/LinkSkip';

import { skipStyles } from './Link.baseStyles';

export interface LinkSkipProps
  extends CompLinkSkipProps,
    LinkProps,
    TokensProp {}

const StyledLinkSkip = styled(
  ({ tokens, ...passProps }: LinkSkipProps & InternalTokensProp) => (
    <Link {...passProps} asProp={CompLinkSkip} />
  ),
)`
  ${(props) => skipStyles(props)};
`;

/**
 * <i class="semantics" />
 * Used for adding skip link for keyboard and screenreader users
 */
export class LinkSkip extends Component<LinkSkipProps> {
  render() {
    const { children, ...passProps } = withSuomifiDefaultProps(this.props);
    return <StyledLinkSkip {...passProps}>{children}</StyledLinkSkip>;
  }
}
