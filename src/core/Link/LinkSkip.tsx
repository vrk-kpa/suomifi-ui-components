import React, { Component } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { Link, LinkProps } from './Link';
import { skipLinkStyles } from './Link.baseStyles';

const skipClassName = 'fi-link--skip';

export interface LinkSkipProps extends LinkProps {}

const StyledLinkSkip = styled((props: LinkSkipProps) => <Link {...props} />)`
  ${skipLinkStyles}
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
