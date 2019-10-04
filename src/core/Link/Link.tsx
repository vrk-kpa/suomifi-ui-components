import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensComponent } from '../theme';
import {
  Link as CompLink,
  LinkProps as CompLinkProps,
} from '../../components/Link/Link';
import { asPropType } from '../../utils/typescript';
import { LinkExternal, LinkExternalProps } from './LinkExternal';
import { baseStyles } from './Link.baseStyles';
export { LinkExternal, LinkExternalProps };

type LinkVariant = 'default' | 'external';
export interface LinkProps extends CompLinkProps, TokensComponent {
  variant?: LinkVariant;
  asProp?: asPropType;
}

const StyledLink = styled(({ tokens, asProp, ...passProps }: LinkProps) => (
  <CompLink {...passProps} as={asProp} />
))`
  ${props => baseStyles(props)};
`;

/**
 * <i class="semantics" />
 * Used for adding a link
 */
export class Link extends Component<LinkProps | LinkExternalProps> {
  static external = (props: LinkExternalProps) => <LinkExternal {...props} />;

  render() {
    const { variant, ...passProps } = withSuomifiDefaultProps(this.props);

    if (variant === 'external')
      return <LinkExternal {...passProps as LinkExternalProps} />;
    return <StyledLink {...passProps} />;
  }
}
