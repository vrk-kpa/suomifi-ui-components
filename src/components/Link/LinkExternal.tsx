import React, { Component } from 'react';
import classnames from 'classnames';
import { Link, LinkProps } from './Link';

const externalClassName = 'fi-link--external';

export interface LinkExternalProps extends LinkProps {
  /** Open to a new window
   * @default true
   */
  toNewWindow?: boolean;
}

export class LinkExternal extends Component<LinkExternalProps> {
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
