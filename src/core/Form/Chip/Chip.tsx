import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './Chip.baseStyles';
import { HtmlButton } from '../../../reset';
import { TokensProp, InternalTokensProp } from 'core/theme';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { Icon } from '../../Icon/Icon';
import { logger } from '../../../utils/logger';
import { VisuallyHidden } from '../../../components/Visually-hidden/Visually-hidden';

const baseClassName = 'fi-chip';
const disabledClassName = `${baseClassName}--disabled`;
const iconClassName = `${baseClassName}--icon`;
const contentClassName = `${baseClassName}--content`;
const removableClassName = `${baseClassName}--removable`;

interface InternalChipProps {
  /** Chip element content */
  children?: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
  /** Disable chip */
  disabled?: boolean;
  /**
   * Event handler to execute when clicked
   */
  onClick?: () => void;
  /**
   * Show X-icon next to the content to mark the chip as removable
   * @default false
   */
  removable?: boolean;
  /** Aria-label attribute to let screen reader users know pressing the button will remove the chip/selection  */
  removableLabel?: string;
}

export interface ChipProps extends InternalChipProps, TokensProp {}

class DefaultChip extends Component<ChipProps> {
  render() {
    const {
      className,
      children,
      onClick,
      removable,
      removableLabel,
      disabled = false,
      ...passProps
    } = this.props;

    if (removable && !removableLabel) {
      logger.error(
        'Provide removableLabel to communicate removability to screen readers',
      );
    }

    return (
      <HtmlButton
        className={classnames(baseClassName, className, {
          [disabledClassName]: !!disabled,
          [removableClassName]: !!removable,
        })}
        disabled={disabled}
        onClick={onClick}
        {...passProps}
      >
        <span className={contentClassName}>{children}</span>
        {!!removable && (
          <>
            <Icon
              mousePointer={true}
              icon="close"
              color="currentColor"
              className={iconClassName}
              aria-hidden={true}
            />
            <VisuallyHidden>{removableLabel}</VisuallyHidden>
          </>
        )}
      </HtmlButton>
    );
  }
}

const StyledChip = styled(
  ({ tokens, ...passProps }: ChipProps & InternalTokensProp) => (
    <DefaultChip {...passProps} />
  ),
)`
  ${(tokens) => baseStyles(withSuomifiDefaultProps(tokens))}
`;
/*  Might want to implement passProps in the withSuomifiDefaultProps as well */

export class Chip extends Component<ChipProps> {
  render() {
    const {
      className,
      children,
      disabled,
      ...passProps
    } = withSuomifiDefaultProps(this.props);
    return (
      <StyledChip
        className={classnames(baseClassName, className, {
          [disabledClassName]: !!disabled,
        })}
        disabled={disabled}
        {...passProps}
      >
        {children}
      </StyledChip>
    );
  }
}
