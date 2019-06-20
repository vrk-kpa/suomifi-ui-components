import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent } from '../theme';
import { Link, LinkProps } from './Link';
import {
  LinkExternal as CompLinkExternal,
  LinkExternalProps as CompLinkExternalProps,
} from '../../components/Link/LinkExternal';
import { Icon } from '../Icon/Icon';
import { externalStyles } from './Link.baseStyles';
import { Omit } from '../../utils/typescript';
import { VisuallyHidden } from '../../components';
import { logger } from '../../utils/logger';

const iconClassName = 'fi-link_icon';

export interface LinkExternalProps
  extends CompLinkExternalProps,
    LinkProps,
    ThemeComponent {
  /** Translated explanation of 'opens to a new window' */
  'aria-label': string;
  /** Hide the icon */
  hideIcon?: boolean;
}

const StyledLinkExternal = styled(
  ({
    theme,
    ...passProps
  }: Omit<LinkExternalProps, 'aria-label' | 'hideIcon'>) => (
    <Link {...passProps} as={CompLinkExternal} />
  ),
)`
  ${props => externalStyles(props)};
`;

/**
 * Used for adding a external site link
 */
export class LinkExternal extends Component<LinkExternalProps> {
  render() {
    const {
      children,
      'aria-label': ariaLabel,
      hideIcon,
      ...passProps
    } = withDefaultTheme(this.props);
    if (!ariaLabel) {
      logger.warn(
        'External link needs a translated description of link opening to a new window',
      );
    }
    return (
      <StyledLinkExternal {...passProps}>
        {children}
        <VisuallyHidden>{ariaLabel}</VisuallyHidden>
        {!hideIcon && (
          <Icon
            icon="linkExternal"
            className={iconClassName}
            color="currentColor"
          />
        )}
      </StyledLinkExternal>
    );
  }
}
