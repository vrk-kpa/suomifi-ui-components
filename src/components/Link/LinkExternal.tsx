import React, { Component } from 'react';
import classnames from 'classnames';
import { Link, LinkProps } from './Link';

const externalClassName = 'fi-link--external';

export interface LinkExternalProps extends LinkProps {}

export class LinkExternal extends Component<LinkProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <Link
        {...passProps}
        className={classnames(className, externalClassName)}
        target="_blank"
        rel="noopener"
      />
    );
  }
}
