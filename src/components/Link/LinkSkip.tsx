import React, { Component } from 'react';
import classnames from 'classnames';
import { Link, LinkProps } from './Link';

const skipClassName = 'fi-link--skip';

export interface LinkSkipProps extends LinkProps {}

export class LinkSkip extends Component<LinkSkipProps> {
  render() {
    const { className, ...passProps } = this.props;

    return (
      <Link {...passProps} className={classnames(className, skipClassName)} />
    );
  }
}
