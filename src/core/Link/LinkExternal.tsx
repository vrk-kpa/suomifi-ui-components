import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent } from '../theme';
import { Link, LinkProps } from './Link';
import {
  LinkExternal as CompLinkExternal,
  LinkExternalProps as CompLinkExternalProps,
} from '../../components/Link/LinkExternal';
import { HtmlSpan } from '../../reset/HtmlSpan/HtmlSpan';
import { Icon } from '../Icon/Icon';
import { externalStyles } from './Link.baseStyles';
import classnames from 'classnames';

const baseClassName = 'fi-link-external';
const containerClassName = `${baseClassName}-container`;
const iconClassName = `${baseClassName}-icon`;

export interface LinkExternalProps
  extends CompLinkExternalProps,
    LinkProps,
    ThemeComponent {
  /** Translated explanation of 'opens to a new window' */
  'aria-label': string;
}

const StyledLinkExternal = styled(
  ({
    theme,
    className,
    'aria-label': ariaLabel,
    ...passProps
  }: LinkExternalProps) => (
    <HtmlSpan className={classnames(className, containerClassName)}>
      <Link {...passProps} as={CompLinkExternal} aria-label={ariaLabel} />
    </HtmlSpan>
  ),
)`
  ${props => externalStyles(props)};
`;

/**
 * Used for adding a external site link
 */
export class LinkExternal extends Component<LinkExternalProps> {
  render() {
    const { children, ...passProps } = withDefaultTheme(this.props);
    return (
      <StyledLinkExternal {...passProps}>
        {children}
        <Icon
          icon="linkExternal"
          className={iconClassName}
          color={passProps.theme.colors.highlightBase}
        />
      </StyledLinkExternal>
    );
  }
}
