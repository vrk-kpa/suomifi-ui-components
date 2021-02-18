import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './Chip.baseStyles';
import { HtmlButton, HtmlSpan } from '../../reset';
import { Icon } from '../Icon/Icon';
import { logger } from '../../utils/logger';
import { VisuallyHidden } from '../../components/Visually-hidden/Visually-hidden';

const baseClassName = 'fi-chip';
const chipClassNames = {
  disabled: `${baseClassName}--disabled`,
  icon: `${baseClassName}--icon`,
  content: `${baseClassName}--content`,
  removable: `${baseClassName}--removable`,
  button: `${baseClassName}--button`,
};

type ChipVariant = 'static' | 'default';

export interface ChipProps {
  /** Chip element content */
  children: ReactNode;
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
  actionLabel?: string;
  /**
   * default | static - use default for an interactive chip and static for a purely visual chip.
   * @default default
   */
  variant?: ChipVariant;
}

class DefaultChip extends Component<ChipProps> {
  render() {
    const {
      className,
      children,
      onClick,
      removable,
      actionLabel,
      variant,
      disabled = false,
      ...passProps
    } = this.props;

    if (removable && !actionLabel) {
      logger.error(
        'Provide actionLabel to communicate removability to screen readers',
      );
    }

    if (variant === 'static') {
      return (
        <HtmlSpan
          className={classnames(baseClassName, className, {
            [chipClassNames.disabled]: !!disabled,
            [chipClassNames.removable]: !!removable,
          })}
          {...passProps}
        >
          <HtmlSpan className={chipClassNames.content}>{children}</HtmlSpan>
        </HtmlSpan>
      );
    }
    return (
      <HtmlButton
        className={classnames(baseClassName, chipClassNames.button, className, {
          [chipClassNames.disabled]: !!disabled,
          [chipClassNames.removable]: !!removable,
        })}
        disabled={disabled}
        onClick={onClick}
        {...passProps}
      >
        <HtmlSpan className={chipClassNames.content}>{children}</HtmlSpan>
        {!!removable && (
          <>
            <Icon
              mousePointer={true}
              icon="close"
              color="currentColor"
              className={chipClassNames.icon}
              aria-hidden={true}
            />
            <VisuallyHidden>{actionLabel}</VisuallyHidden>
          </>
        )}
      </HtmlButton>
    );
  }
}

const StyledChip = styled((props: ChipProps) => <DefaultChip {...props} />)`
  ${baseStyles}
`;

export class Chip extends Component<ChipProps> {
  static static = (props: ChipProps) => (
    <StyledChip {...props} variant="static" />
  );

  render() {
    return <StyledChip {...this.props} />;
  }
}
