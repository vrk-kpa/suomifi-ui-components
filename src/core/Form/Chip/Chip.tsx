import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './Chip.baseStyles';
import { HtmlButton } from '../../../reset';
import { TokensProp, InternalTokensProp } from 'core/theme';

const baseClassName = 'fi-chip';
const disabledClassName = `${baseClassName}--disabled`;

export interface ChipProps extends TokensProp {
  /** Chip element content */
  children: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
  /** Disable chip */
  disabled?: boolean;
  /**
   * Event handler to execute when clicked
   */
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  /**
   * Option to delete Chip by clicking on it
   * @default true
   */
  removable?: boolean;
}

class BasicChip extends React.Component<ChipProps> {
  render() {
    const { className, children, disabled = false, ...passProps } = this.props;
    return (
      <HtmlButton
        className={classnames(baseClassName, className, {
          [disabledClassName]: !!disabled,
          ...passProps,
        })}
      >
        {children}
      </HtmlButton>
    );
  }
}

const StyledChip = styled(
  ({ tokens, ...passProps }: ChipProps & InternalTokensProp) => (
    <BasicChip {...passProps} />
  ),
)`
  ${(props) => baseStyles(props)}
`;

export class Chip extends Component<ChipProps> {
  render() {
    return <StyledChip {...this.props} />;
  }
}
