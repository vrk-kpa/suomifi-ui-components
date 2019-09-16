import React, { Component } from 'react';
import classnames from 'classnames';
import { AsProp } from '../../utils/typescript';
import { HtmlH, HtmlHProps, hLevels } from '../../reset/HtmlH/HtmlH';
export { hLevels };

export interface HeadingProps extends HtmlHProps {
  /** Change HTML-element */
  variant: hLevels;
  className?: string;
  asProp?: AsProp;
}

const baseClassName = 'fi-heading';

export class Heading extends Component<HeadingProps> {
  render() {
    const {
      className,
      variant = 'h1',
      as: asStyled,
      asProp,
      ...passProps
    } = this.props;
    const as = !!asProp ? asProp : asStyled;
    return (
      <HtmlH
        {...passProps}
        className={classnames(baseClassName, className)}
        as={!!as ? as : variant}
      />
    );
  }
}
