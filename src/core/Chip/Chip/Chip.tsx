import React, { Component, forwardRef } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { getLogger } from '../../../utils/log';
import { HtmlButton, HtmlButtonProps, HtmlSpan } from '../../../reset';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { Icon } from '../../Icon/Icon';
import {
  BaseChipProps,
  baseClassName,
  chipClassNames,
} from '../BaseChip/BaseChip';
import { baseStyles } from './Chip.baseStyles';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';

const chipButtonClassNames = {
  removable: `${baseClassName}--removable`,
  button: `${baseClassName}--button`,
  icon: `${baseClassName}--icon`,
};

interface InternalChipProps
  extends BaseChipProps,
    Omit<
      HtmlButtonProps,
      'forwardedRef' | 'disabled' | 'onClick' | 'children' | 'as'
    > {
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
  /** Soft disable the chip to allow tab-focus, but disable onClick functionality */
  'aria-disabled'?: boolean;
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
      'aria-disabled': ariaDisabled = false,
      ...passProps
    } = this.props;

    const onClickProp = !!disabled || !!ariaDisabled ? {} : { onClick };

    if (removable && !actionLabel) {
      getLogger().error(
        'Provide actionLabel to communicate removability to screen readers',
      );
    }
    return (
      <HtmlButton
        className={classnames(
          baseClassName,
          chipButtonClassNames.button,
          className,
          {
            [chipClassNames.disabled]: !!disabled || !!ariaDisabled,
            [chipButtonClassNames.removable]: !!removable,
          },
        )}
        disabled={disabled}
        aria-disabled={!!ariaDisabled || !!disabled}
        {...onClickProp}
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
              className={chipButtonClassNames.icon}
              aria-hidden={true}
            />
            <VisuallyHidden>{actionLabel}</VisuallyHidden>
          </>
        )}
      </HtmlButton>
    );
  }
}

const StyledChip = styled(
  ({
    theme,
    ...passProps
  }: InternalChipProps & InnerRef & SuomifiThemeProp) => (
    <DefaultChip {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const Chip = forwardRef(
  (props: ChipProps, ref: React.RefObject<HTMLButtonElement>) => {
    const { ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledChip theme={suomifiTheme} forwardedRef={ref} {...passProps} />
        )}
      </SuomifiThemeConsumer>
    );
  },
);

Chip.displayName = 'Chip';
export { Chip };
