import React, { forwardRef, FocusEvent, useState, useRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import {
  ActionMenuPopover,
  InitialActiveDescendant,
} from './ActionMenuPopover';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { Button } from '../Button/Button';
import { HtmlDiv } from '../../reset';
import { HTMLAttributesIncludingDataAttributes } from '../../utils/common/common';
import { baseStyles } from './ActionMenu.baseStyles';
import { ActionMenuItemProps } from './ActionMenuItem/ActionMenuItem';
import { ActionMenuDividerProps } from './ActionMenuDivider/ActionMenuDivider';

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

export interface ActionMenuProps {
  /** Label text for the button */
  buttonText?: string;
  /** Menu items. Use the `<ActionMenuItem>` or  `<ActionMenuDivider>` components as children */
  children?:
    | Array<
        | React.ReactElement<ActionMenuItemProps>
        | React.ReactElement<ActionMenuDividerProps>
      >
    | React.ReactElement<ActionMenuItemProps>
    | React.ReactElement<ActionMenuDividerProps>;
  /** Button container div class name for custom styling */
  className?: string;
  /** Disable button usage */
  disabled?: boolean;
  /** Ref is forwarded to the button element. Alternative for React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLButtonElement>;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /**
   * Unique id
   * If no id is specified, one will be generated
   */
  id?: string;
  /** Callback fired when button is clicked */
  onClick?: () => void;
  /** Callback fired on button onBlur
   * @param {FocusEvent<HTMLButtonElement>} event FocusEvent
   */
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  /** Visually hidden label text for the button */
  openButtonLabel: string;
  /** Callback fired when menu opens */
  onClose?: () => void;
  /** Callback fired when menu closes */
  onOpen?: () => void;
  /**
   * Props which are placed at the outermost div of the component.
   * Can be used, for example, for style
   */
  wrapperProps?: Omit<
    HTMLAttributesIncludingDataAttributes<HTMLDivElement>,
    'className'
  >;
}

const BaseActionMenu = (props: ActionMenuProps) => {
  const {
    className,
    wrapperProps,
    id,
    fullWidth,
    forwardedRef,
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
  const [selectFirstItem, setSelectFirstItem] =
    useState<InitialActiveDescendant>('none');

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
    setMenuVisible(false);
    if (onClose) {
      onClose();
    }

    // Move focus back to the button when menu is closed
    openButtonRef.current?.focus();
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
          {...passProps}
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
            initialActiveDescendant={selectFirstItem}
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
  (props: ActionMenuProps, ref: React.RefObject<HTMLButtonElement>) => {
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
