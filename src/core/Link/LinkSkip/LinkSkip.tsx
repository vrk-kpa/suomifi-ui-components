import React, { Component } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { Link } from '../Link/Link';
import { linkSkipStyles } from './LinkSkip.baseStyles';
import { BaseLinkProps } from '../BaseLink/BaseLink';

const skipClassName = 'fi-link--skip';

export interface LinkSkipProps extends BaseLinkProps {}

const StyledLinkSkip = styled((props: LinkSkipProps) => <Link {...props} />)`
  ${linkSkipStyles}
`;

/**
 * <i class="semantics" />
 * Used for adding skip link for keyboard and screenreader users
 */
export class LinkSkip extends Component<LinkSkipProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <StyledLinkSkip
        {...passProps}
        className={classnames(className, skipClassName)}
      />
    );
  }
}
