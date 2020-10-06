import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './StatusText.baseStyles';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import { TokensProp, InternalTokensProp } from 'core/theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { idGenerator } from '../../../utils/uuid';

const baseClassName = 'fi-status-text';
const statusTextClassNames = {
  disabled: `${baseClassName}--disabled`,
  error: `${baseClassName}--error`,
  success: `${baseClassName}--success`,
};

type StatusTextStatus = 'default' | 'error' | 'success';

interface InternalStatusTextProps extends HtmlSpanProps {
  /** id */
  id?: string;
  /** Chip element content */
  children?: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
  /** Disable chip */
  disabled?: boolean;
  /** Status */
  status?: StatusTextStatus;
}

export interface StatusTextProps extends InternalStatusTextProps, TokensProp {}

class DefaultChip extends Component<InternalStatusTextProps> {
  render() {
    const {
      id,
      className,
      children,
      disabled = false,
      status,
      ...passProps
    } = this.props;
    const generatedStatusTextId = idGenerator(id);
    return (
      <HtmlSpan
        {...passProps}
        className={classnames(baseClassName, {
          [statusTextClassNames.disabled]: disabled,
          [statusTextClassNames.error]: status === 'error',
          [statusTextClassNames.success]: status === 'success',
        })}
        id={generatedStatusTextId}
      >
        {children}
      </HtmlSpan>
    );
  }
}

const StyledStatusText = styled(
  ({ tokens, ...passProps }: StatusTextProps & InternalTokensProp) => (
    <DefaultChip {...passProps} />
  ),
)`
  ${(tokens) => baseStyles(withSuomifiDefaultProps(tokens))}
`;

export class StatusText extends Component<StatusTextProps> {
  render() {
    const { ...passProps } = withSuomifiDefaultProps(this.props);
    return <StyledStatusText {...passProps} />;
  }
}
