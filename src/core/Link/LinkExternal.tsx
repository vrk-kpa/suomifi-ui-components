import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { logger } from '../../utils/logger';
import classnames from 'classnames';
import { Icon } from '../Icon/Icon';
import { Link, LinkProps } from './Link';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { externalStyles } from './Link.baseStyles';

const iconClassName = 'fi-link_icon';
const externalClassName = 'fi-link--external';

export interface LinkExternalProps extends LinkProps {
  /** Translated explanation of 'opens to a new window' */
  labelNewWindow: string;
  /** Hide the icon */
  hideIcon?: boolean;
  /** Open to a new window
   * @default true
   */
  toNewWindow?: boolean;
}

class BaseLinkExternal extends Component<LinkExternalProps> {
  render() {
    const { className, toNewWindow = true, ...passProps } = this.props;
    return (
      <Link
        {...passProps}
        className={classnames(className, externalClassName)}
        target={!!toNewWindow ? '_blank' : undefined}
        rel={!!toNewWindow ? 'noopener' : undefined}
      />
    );
  }
}

const StyledLinkExternal = styled(
  (props: Omit<LinkExternalProps, 'labelNewWindow' | 'hideIcon'>) => (
    <Link {...props} asProp={BaseLinkExternal} />
  ),
)`
  ${externalStyles};
`;

/**
 * <i class="semantics" />
 * Used for adding a external site link
 */
export class LinkExternal extends Component<LinkExternalProps> {
  render() {
    const { children, labelNewWindow, hideIcon, ...passProps } = this.props;
    if (!labelNewWindow) {
      logger.warn(
        'External link needs a translated description of link opening to a new window',
      );
    }
    return (
      <StyledLinkExternal {...passProps}>
        {children}
        <VisuallyHidden>{labelNewWindow}</VisuallyHidden>
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
