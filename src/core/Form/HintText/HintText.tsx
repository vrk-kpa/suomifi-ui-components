import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './HintText.baseStyles';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';

const baseClassName = 'fi-hint-text';

export interface HintTextProps extends HtmlSpanProps {
  /** id */
  id?: string;
  /** HintText element content */
  children?: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
}

const StyledHintText = styled(
  ({ className, children, ...passProps }: HintTextProps) => (
    <HtmlSpan
      {...passProps}
      className={classnames(className, baseClassName, {})}
    >
      {children}
    </HtmlSpan>
  ),
)`
  ${baseStyles}
`;
export class HintText extends Component<HintTextProps> {
  render() {
    const { children, ...passProps } = this.props;
    if (!children) {
      return null;
    }
    return <StyledHintText {...passProps}>{children}</StyledHintText>;
  }
}
