import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent } from '../theme';
import {
  LinkExternal as CompLinkExternal,
  LinkExternalProps as CompLinkExternalProps,
} from '../../components/Link/LinkExternal';
// import { baseStyles } from './Link.baseStyles';

export interface LinkExternalProps
  extends CompLinkExternalProps,
    ThemeComponent {}

const StyledLinkExternal = styled(
  ({ theme, ...passProps }: LinkExternalProps) => (
    <CompLinkExternal {...passProps} />
  ),
)``;
//   ${props => baseStyles(props)};
// `;

/**
 * Used for adding a external site link
 */
export class LinkExternal extends Component<LinkExternalProps> {
  render() {
    const passProps = withDefaultTheme(this.props);
    return <StyledLinkExternal {...passProps} />;
  }
}
