import React, { Component, forwardRef } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { IconClose } from 'suomifi-icons';
import { getLogger } from '../../../utils/log';
import { HtmlButton, HtmlButtonProps, HtmlSpan } from '../../../reset';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import {
  BaseChipProps,
  baseClassName,
  chipClassNames,
} from '../BaseChip/BaseChip';
import { baseStyles } from './Chip.baseStyles';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';

const chipButtonClassNames = {
  removable: `${baseClassName}--removable`,
  button: `${baseClassName}--button`,
  icon: `${baseClassName}--icon`,
};

export interface ChipProps
  extends BaseChipProps,
    MarginProps,
    Omit<
      HtmlButtonProps,
      'forwardedRef' | 'disabled' | 'onClick' | 'children' | 'as'
    > {
  /**
   * Callback fired when Chip is clicked
   */
  onClick?: () => void;
  /**
   * Shows an X-icon next to the content to mark the Chip as removable. Always use `actionLabel` for screen readers when removable is true.
   * @default false
   */
  removable?: boolean;
  /** Creates an aria-label text to let screen reader users know pressing the button will remove the chip/selection.
   * Required with `removable`
   */
  actionLabel?: string;
  /** Soft disables the chip to allow tab-focus. Disables `onClick()` functionality */
  'aria-disabled'?: boolean;
  /** Ref is forwarded to the button element. Alternative to React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLButtonElement>;
}
class DefaultChip extends Component<ChipProps> {
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
      style,
      ...rest
    } = this.props;
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);

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
        style={{ ...marginStyle, ...style }}
      >
        <HtmlSpan className={chipClassNames.content}>{children}</HtmlSpan>
        {!!removable && (
          <>
            <IconClose
              mousePointer={true}
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
    globalMargins,
    ...passProps
  }: ChipProps & SuomifiThemeProp & GlobalMarginProps) => (
    <DefaultChip {...passProps} />
  ),
)`
  ${({ theme, globalMargins }) => baseStyles(theme, globalMargins?.chip)}
`;

const Chip = forwardRef(
  (props: ChipProps, ref: React.RefObject<HTMLButtonElement>) => {
    const { ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <StyledChip
                theme={suomifiTheme}
                globalMargins={margins}
                forwardedRef={ref}
                {...passProps}
              />
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

Chip.displayName = 'Chip';
export { Chip };
