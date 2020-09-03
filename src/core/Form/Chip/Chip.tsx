import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
// import { default as styled } from 'styled-components';
// import { baseStyles } from './Chip.baseStyles';
import { HtmlButton } from '../../../reset';
import { TokensProp } from 'core/theme';
import { withSuomifiDefaultProps } from '../../theme/utils';

const baseClassName = 'fi-chip';
const disabledClassName = `${baseClassName}--disabled`;

interface InternalChipProps {
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

export interface ChipProps extends InternalChipProps, TokensProp {}

export class Chip extends Component<ChipProps> {
  render() {
    const {
      className,
      children,
      disabled = false,
      ...passProps
    } = withSuomifiDefaultProps(this.props);
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

/*
  render() {
    return styled(
      ({ tokens, ...passProps }: ChipProps & InternalTokensProp) => (
        <DefaultChip {...passProps} />
      ),
    )`
      ${(props) => baseStyles(props)}
    `;
  }
}
*/
