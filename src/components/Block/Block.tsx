import React, { Component } from 'react';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivProps } from '../../reset/HtmlDiv/HtmlDiv';

export interface BlockProps extends HtmlDivProps {
  /**
   * Change block semantics
   * @default default
   */
  variant?: 'default' | 'section' | 'header' | 'nav' | 'main' | 'footer';
  className?: string;
}

const baseClassName = 'fi-block';

export class Block extends Component<BlockProps> {
  render() {
    const { className, variant, ...passProps } = this.props;
    const ComponentVariant =
      !variant || variant === 'default' ? HtmlDiv : variant;
    return (
      <ComponentVariant
        {...passProps}
        className={classnames(baseClassName, className)}
      />
    );
  }
}
