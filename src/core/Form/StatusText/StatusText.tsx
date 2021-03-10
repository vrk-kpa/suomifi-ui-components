import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import { InputStatus } from '../types';
import { baseStyles } from './StatusText.baseStyles';

const baseClassName = 'fi-status-text';
const statusTextClassNames = {
  error: `${baseClassName}--error`,
};

export interface StatusTextProps extends HtmlSpanProps {
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

const StyledStatusText = styled(
  ({ className, children, status, ...passProps }: StatusTextProps) => (
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
  ${baseStyles}
`;

export class StatusText extends Component<StatusTextProps> {
  render() {
    const { disabled, children, ...passProps } = this.props;
    if (disabled || !children) {
      return null;
    }
    return <StyledStatusText {...passProps}>{children}</StyledStatusText>;
  }
}
