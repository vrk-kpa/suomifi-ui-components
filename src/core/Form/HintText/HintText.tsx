import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './HintText.baseStyles';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import { TokensProp, InternalTokensProp } from 'core/theme';
import { withSuomifiDefaultProps } from '../../theme/utils';

const baseClassName = 'fi-hint-text';

interface InternalHintTextProps extends HtmlSpanProps {
  /** id */
  id?: string;
  /** HintText element content */
  children?: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
}

export interface HintTextProps extends InternalHintTextProps, TokensProp {}

const StyledHintText = styled(
  ({
    className,
    children,
    tokens,
    ...passProps
  }: HintTextProps & InternalTokensProp) => (
    <HtmlSpan
      {...passProps}
      className={classnames(className, baseClassName, {})}
    >
      {children}
    </HtmlSpan>
  ),
)`
  ${(tokens) => baseStyles(withSuomifiDefaultProps(tokens))}
`;
export class HintText extends Component<HintTextProps> {
  render() {
    const { children, ...passProps } = withSuomifiDefaultProps(this.props);
    if (!children) {
      return null;
    }
    return <StyledHintText {...passProps}>{children}</StyledHintText>;
  }
}
