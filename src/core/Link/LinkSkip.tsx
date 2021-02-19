import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { Link, LinkProps } from './Link';
import {
  LinkSkip as CompLinkSkip,
  LinkSkipProps as CompLinkSkipProps,
} from '../../components/Link/LinkSkip';

import { skipLinkStyles } from './Link.baseStyles';

export interface LinkSkipProps extends CompLinkSkipProps, LinkProps {}

const StyledLinkSkip = styled((props: LinkSkipProps) => (
  <Link {...props} asProp={CompLinkSkip} />
))`
  ${skipLinkStyles}
`;

/**
 * <i class="semantics" />
 * Used for adding skip link for keyboard and screenreader users
 */
export class LinkSkip extends Component<LinkSkipProps> {
  render() {
    return <StyledLinkSkip {...this.props} />;
  }
}
