import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './StatusText.baseStyles';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import { TokensProp, InternalTokensProp } from 'core/theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { InputStatus } from '../types';

const baseClassName = 'fi-status-text';
const statusTextClassNames = {
  error: `${baseClassName}--error`,
};

interface InternalStatusTextProps extends HtmlSpanProps {
  /** id */
  id?: string;
  /** StatusText element content */
  children?: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
  /** Disable StatusText */
  disabled?: boolean;
  /** Status */
  status?: InputStatus;
}

export interface StatusTextProps extends InternalStatusTextProps, TokensProp {}

const StyledStatusText = styled(
  ({
    className,
    children,
    tokens,
    status,
    ...passProps
  }: StatusTextProps & InternalTokensProp) => (
    <HtmlSpan
      {...passProps}
      className={classnames(className, baseClassName, {
        [statusTextClassNames.error]: status === 'error',
      })}
    >
      {children}
    </HtmlSpan>
  ),
)`
  ${(tokens) => baseStyles(withSuomifiDefaultProps(tokens))}
`;

export class StatusText extends Component<StatusTextProps> {
  render() {
    const { disabled, children, ...passProps } = withSuomifiDefaultProps(
      this.props,
    );
    if (disabled || !children) {
      return null;
    }
    return <StyledStatusText {...passProps}>{children}</StyledStatusText>;
  }
}
