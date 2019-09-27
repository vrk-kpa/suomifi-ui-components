import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent } from '../theme';
import {
  Link as CompLink,
  LinkProps as CompLinkProps,
} from '../../components/Link/Link';
import { asPropType } from '../../utils/typescript';
import { LinkExternal, LinkExternalProps } from './LinkExternal';
import { baseStyles } from './Link.baseStyles';
export { LinkExternal, LinkExternalProps };

type LinkVariant = 'default' | 'external';
export interface LinkProps extends CompLinkProps, ThemeComponent {
  variant?: LinkVariant;
  asProp?: asPropType;
}

const StyledLink = styled(({ theme, asProp, ...passProps }: LinkProps) => (
  // as-property is defined internally as asProp and need to be implemented back if used
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
    const { variant, ...passProps } = withDefaultTheme(this.props);

    if (variant === 'external')
      return <LinkExternal {...passProps as LinkExternalProps} />;
    return <StyledLink {...passProps} />;
  }
}
