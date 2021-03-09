import React, { Component, forwardRef, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './Chip.baseStyles';
import { HtmlButton, HtmlSpan } from '../../../reset';
import { Icon } from '../../Icon/Icon';
import { logger } from '../../../utils/logger';
import { VisuallyHidden } from '../../../components/Visually-hidden/Visually-hidden';

const baseClassName = 'fi-chip';
const chipClassNames = {
  disabled: `${baseClassName}--disabled`,
  icon: `${baseClassName}--icon`,
  content: `${baseClassName}--content`,
  removable: `${baseClassName}--removable`,
  button: `${baseClassName}--button`,
};

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
  onClick?: () => void;
  /**
   * Show X-icon next to the content to mark the chip as removable
   * @default false
   */
  removable?: boolean;
  /** Aria-label attribute to let screen reader users know pressing the button will remove the chip/selection  */
  actionLabel?: string;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLButtonElement>;
}

export interface ChipProps extends InternalChipProps {
  /** Ref object to be passed to the button element */
  ref?: React.RefObject<HTMLButtonElement>;
}

class DefaultChip extends Component<ChipProps & InnerRef> {
  render() {
    const {
      className,
      children,
      onClick,
      removable,
      actionLabel,
      forwardedRef,
      disabled = false,
      ...passProps
    } = this.props;

    if (removable && !actionLabel) {
      logger.error(
        'Provide actionLabel to communicate removability to screen readers',
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
        forwardedRef={forwardedRef}
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

const StyledChip = styled(({ ...passProps }: InternalChipProps & InnerRef) => (
  <DefaultChip {...passProps} />
))`
  ${baseStyles}
`;

export const Chip = forwardRef(
  (props: ChipProps, ref: React.RefObject<HTMLButtonElement>) => {
    const { ...passProps } = props;
    return <StyledChip forwardedRef={ref} {...passProps} />;
  },
);
