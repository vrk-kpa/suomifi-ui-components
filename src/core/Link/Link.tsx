import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils/defaultTheme';
import { ThemeComponent } from '../theme';
import {
  Link as CompLink,
  LinkProps as CompLinkProps,
} from '../../components/Link/Link';
import { baseStyles } from './Link.baseStyles';

export interface LinkProps extends CompLinkProps, ThemeComponent {}

const StyledLink = styled(({ theme, ...passProps }: LinkProps) => (
  <CompLink {...passProps} />
))`
  ${props => baseStyles(props)};
`;

/**
 * Used for grouping expansion panels
 */
export class Link extends Component<LinkProps> {
  render() {
    const passProps = withDefaultTheme(this.props);
    return <StyledLink {...passProps} />;
  }
}
