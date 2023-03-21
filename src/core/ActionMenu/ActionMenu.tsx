import React, { forwardRef, FocusEvent, useState, useRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import { ActionMenuPopover, InitialFocus } from './ActionMenuPopover';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { Button } from '../Button/Button';
import { HtmlDiv, HtmlDivProps, HtmlButtonProps } from '../../reset';
import { baseStyles } from './ActionMenu.baseStyles';
import { getConditionalAriaProp } from '../../utils/aria';

const baseClassName = 'fi-action-menu';
export const actionMenuClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
  disabled: `${baseClassName}--disabled`,
  button: `${baseClassName}_button`,
  buttonDisabled: `${baseClassName}_button--disabled`,
  iconOnly: `${baseClassName}_button--icon-only`,
  menuClosed: `${baseClassName}_button--menu--closed`,
};

export interface ActionMenuProps
  extends Omit<HtmlButtonProps, 'type' | 'onChange'> {
  /** Button container div class name for custom styling */
  className?: string;
  /** Button wrapping div element props */
  wrapperProps?: Omit<HtmlDivProps, 'className'>;
  /** Disable button usage */
  disabled?: boolean;
  /** Callback fired when button is clicked */
  onClick?: () => void;
  /** Callback fired on button onBlur
   * @param {FocusEvent<HTMLButtonElement>} event FocusEvent
   */
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  /** Controlled value */
  value?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Label text for the button */
  openButtonLabel: string;
  /** Label text for the button */
  buttonText?: string;
  /** Callback fired when menu opens */
  onClose?: () => void;
  /** Callback fired when menu closes */
  onOpen?: () => void;
  /** Ref is forwarded to the button element. Alternative for React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLButtonElement>;
}

const BaseActionMenu = (props: ActionMenuProps) => {
  const {
    className,
    wrapperProps,
    id,
    fullWidth,
    forwardedRef,
    defaultValue,
    value,
    buttonText,
    openButtonLabel,
    children,
    onOpen,
    onClose,
    onClick,
    onBlur,
    ...passProps
  } = props;

  const openButtonRef = forwardedRef || useRef<HTMLButtonElement>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectFirstItem, setSelectFirstItem] = useState<InitialFocus>('none');

  const menuId = `${id}-menu`;
  const buttonId = `${id}-button`;

  const openMenu = () => {
    if (onOpen) {
      onOpen();
    }
    // Highlighting the first item is a compomise to keep NVDA smooth
    setSelectFirstItem('first');
    setMenuVisible(true);
  };

  const closeMenu = () => {
    if (onClose) {
      onClose();
    }

    console.log(openButtonRef.current);
    // Move focus back to the button when menu is closed
    openButtonRef.current?.focus();
    setMenuVisible(false);
  };

  const handleButtonClick = () => {
    if (onClick) {
      onClick();
    }

    if (menuVisible) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowUp' && !menuVisible) {
      event.preventDefault();
      openMenu();
      setSelectFirstItem('last');
    }

    if (
      (event.key === 'ArrowDown' ||
        event.key === 'Enter' ||
        event.key === ' ') &&
      !menuVisible
    ) {
      event.preventDefault();
      openMenu();
      setSelectFirstItem('first');
    }
  };

  return (
    <HtmlDiv
      {...wrapperProps}
      className={classnames(baseClassName, className, {
        [actionMenuClassNames.disabled]: !!passProps.disabled,
        [actionMenuClassNames.fullWidth]: fullWidth,
      })}
    >
      <>
        <Button
          {...passProps}
          id={buttonId}
          variant="secondary"
          iconRight="optionsVertical"
          aria-expanded={menuVisible}
          aria-controls={menuId}
          forwardedRef={openButtonRef}
          className={classnames(
            actionMenuClassNames.button,
            {
              [actionMenuClassNames.buttonDisabled]: passProps.disabled,
            },
            {
              [actionMenuClassNames.menuClosed]: !menuVisible,
            },
            {
              [actionMenuClassNames.iconOnly]:
                !buttonText || buttonText.length < 1,
            },
          )}
          onClick={handleButtonClick}
          onKeyDown={handleKeyDown}
          onBlur={(event) => {
            if (onBlur) {
              onBlur(event);
            }
          }}
        >
          {buttonText}
          <VisuallyHidden>{openButtonLabel}</VisuallyHidden>
        </Button>
        {menuVisible && (
          <ActionMenuPopover
            menuId={menuId}
            buttonId={buttonId}
            openButtonRef={openButtonRef}
            onClose={() => closeMenu()}
            children={children}
            initialFocus={selectFirstItem}
          />
        )}
      </>
    </HtmlDiv>
  );
};

const StyledActionMenu = styled(
  ({ theme, ...passProps }: ActionMenuProps & SuomifiThemeProp) => (
    <BaseActionMenu {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for user selecting action.
 *
 * Props other than specified explicitly are passed on to underlying button element.
 * @component
 */
const ActionMenu = forwardRef<HTMLButtonElement, ActionMenuProps>(
  (props: ActionMenuProps, ref: React.Ref<HTMLButtonElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledActionMenu
                theme={suomifiTheme}
                id={id}
                forwardedRef={ref}
                {...passProps}
              />
            )}
          </AutoId>
        )}
      </SuomifiThemeConsumer>
    );
  },
);

ActionMenu.displayName = 'ActionMenu';
export { ActionMenu };
