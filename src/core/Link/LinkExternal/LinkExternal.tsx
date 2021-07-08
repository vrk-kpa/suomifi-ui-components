import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { logger } from '../../../utils/logger';
import classnames from 'classnames';
import { Icon } from '../../Icon/Icon';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { linkExternalStyles } from './LinkExternal.baseStyles';
import { HtmlA } from '../../../reset';
import { BaseLinkProps, baseClassName } from '../BaseLink/BaseLink';

const iconClassName = 'fi-link_icon';
const externalClassName = 'fi-link--external';

export interface LinkExternalProps extends BaseLinkProps {
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
    const {
      asProp,
      children,
      className,
      toNewWindow = true,
      labelNewWindow,
      hideIcon,
      ...passProps
    } = this.props;
    return (
      <HtmlA
        {...passProps}
        className={classnames(baseClassName, className, externalClassName)}
        target={!!toNewWindow ? '_blank' : undefined}
        rel={!!toNewWindow ? 'noopener' : undefined}
        as={asProp}
      >
        {children}
        <VisuallyHidden>{labelNewWindow}</VisuallyHidden>
        {!hideIcon && (
          <Icon
            icon="linkExternal"
            className={iconClassName}
            color="currentColor"
          />
        )}
      </HtmlA>
    );
  }
}

const StyledLinkExternal = styled((props: LinkExternalProps) => (
  <BaseLinkExternal {...props} />
))`
  ${linkExternalStyles};
`;

/**
 * <i class="semantics" />
 * Used for adding a external site link
 */
export class LinkExternal extends Component<LinkExternalProps> {
  render() {
    const { labelNewWindow, ...passProps } = this.props;
    if (!labelNewWindow) {
      logger.warn(
        'External link needs a translated description of link opening to a new window',
      );
    }
    return (
      <StyledLinkExternal labelNewWindow={labelNewWindow} {...passProps} />
    );
  }
}
