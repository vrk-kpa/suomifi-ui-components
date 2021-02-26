import React, { Component } from 'react';
import classnames from 'classnames';
import { HtmlP, HtmlPProps } from '../../reset/HtmlP/HtmlP';

export interface ParagraphProps extends HtmlPProps {
  className?: string;
}

export const baseClassName = 'fi-paragraph';

export class Paragraph extends Component<ParagraphProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <HtmlP {...passProps} className={classnames(baseClassName, className)} />
    );
  }
}
