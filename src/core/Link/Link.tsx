import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import {
  Link as CompLink,
  LinkProps as CompLinkProps,
} from '../../components/Link/Link';
import { asPropType } from '../../utils/typescript';
import { LinkExternal, LinkExternalProps } from './LinkExternal';
import { LinkSkip, LinkSkipProps } from './LinkSkip';
import { baseStyles } from './Link.baseStyles';

type LinkVariant = 'default' | 'external' | 'skip';
export interface LinkProps extends CompLinkProps, TokensProp {
  variant?: LinkVariant;
  asProp?: asPropType;
}

const StyledLink = styled(
  ({ tokens, asProp, ...passProps }: LinkProps & InternalTokensProp) => (
    <CompLink {...passProps} as={asProp} />
  ),
)`
  ${(props) => baseStyles(props)};
`;

/**
 * <i class="semantics" />
 * Used for adding a link
 */
export class Link extends Component<LinkProps | LinkExternalProps> {
  static external = (props: LinkExternalProps) => <LinkExternal {...props} />;

  static skip = (props: LinkSkipProps) => <LinkSkip {...props} />;

  render() {
    const { variant, ...passProps } = withSuomifiDefaultProps(this.props);

    if (variant === 'external' && 'labelNewWindow' in passProps) {
      return <LinkExternal {...(passProps as LinkExternalProps)} />;
    }
    if (variant === 'skip') {
      return <LinkSkip {...passProps} />;
    }
    return <StyledLink {...passProps} />;
  }
}
