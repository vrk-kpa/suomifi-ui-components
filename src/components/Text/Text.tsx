import React, { Component } from 'react';
import classnames from 'classnames';
import { HtmlSpan, HtmlSpanProps } from '../../reset/HtmlSpan/HtmlSpan';

export interface TextProps extends HtmlSpanProps {
  className?: string;
}

const baseClassName = 'fi-text';

export class Text extends Component<TextProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <HtmlSpan
        {...passProps}
        className={classnames(baseClassName, className)}
      />
    );
  }
}
