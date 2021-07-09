import React, { Component } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { Link } from '../Link/Link';
import { SkipLinkStyles } from './SkipLink.baseStyles';
import { BaseLinkProps } from '../BaseLink/BaseLink';

const skipClassName = 'fi-link--skip';

export interface SkipLinkProps extends BaseLinkProps {}

const StyledSkipLink = styled((props: SkipLinkProps) => <Link {...props} />)`
  ${SkipLinkStyles}
`;

/**
 * <i class="semantics" />
 * Used for adding skip link for keyboard and screenreader users
 */
export class SkipLink extends Component<SkipLinkProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <StyledSkipLink
        {...passProps}
        className={classnames(className, skipClassName)}
      />
    );
  }
}
