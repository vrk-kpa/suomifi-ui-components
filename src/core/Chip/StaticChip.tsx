import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { staticChipBaseStyles } from './StaticChip.baseStyles';
import { HtmlSpan } from '../../reset';

export const baseClassName = 'fi-chip';
export const chipClassNames = {
  disabled: `${baseClassName}--disabled`,
  icon: `${baseClassName}--icon`,
  content: `${baseClassName}--content`,
  removable: `${baseClassName}--removable`,
  button: `${baseClassName}--button`,
};

export interface StaticChipProps {
  /** Chip element content */
  children: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
  /** Disable chip */
  disabled?: boolean;
}

class BaseChip extends Component<StaticChipProps> {
  render() {
    const { className, children, disabled = false, ...passProps } = this.props;

    return (
      <HtmlSpan
        className={classnames(baseClassName, className, {
          [chipClassNames.disabled]: !!disabled,
        })}
        {...passProps}
      >
        <HtmlSpan className={chipClassNames.content}>{children}</HtmlSpan>
      </HtmlSpan>
    );
  }
}

const StyledChip = styled(({ ...passProps }: StaticChipProps) => (
  <BaseChip {...passProps} />
))`
  ${staticChipBaseStyles}
`;

export class StaticChip extends Component<StaticChipProps> {
  render() {
    const { ...passProps } = this.props;
    return <StyledChip {...passProps} />;
  }
}
