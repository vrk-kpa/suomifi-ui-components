import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import { InputStatus, AriaLiveMode } from '../types';
import { baseStyles } from './StatusText.baseStyles';

const baseClassName = 'fi-status-text';
const statusTextClassNames = {
  error: `${baseClassName}--error`,
  hasContent: `${baseClassName}--hasContent`,
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
  /** aria-live mode for the element */
  ariaLiveMode?: AriaLiveMode;
}

const StyledStatusText = styled(
  ({
    className,
    children,
    disabled,
    status,
    ariaLiveMode,
    ...passProps
  }: StatusTextProps) => {
    const ariaLiveProp = !disabled ? { 'aria-live': ariaLiveMode } : {};

    return (
      <HtmlSpan
        {...passProps}
        {...ariaLiveProp}
        className={classnames(className, baseClassName, {
          [statusTextClassNames.hasContent]: children,
          [statusTextClassNames.error]: status === 'error',
        })}
      >
        {children}
      </HtmlSpan>
    );
  },
)`
  ${baseStyles}
`;

export class StatusText extends Component<StatusTextProps> {
  render() {
    const { children, ...passProps } = this.props;
    return <StyledStatusText {...passProps}>{children}</StyledStatusText>;
  }
}
