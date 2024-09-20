import React, {
  forwardRef,
  FocusEvent,
  useState,
  useRef,
  ReactElement,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../utils/AutoId/AutoId';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../theme';
import {
  ActionMenuPopover,
  InitialActiveDescendant,
} from './ActionMenuPopover';
import {
  Button,
  ButtonProps,
  ButtonVariant,
  ForcedAccessibleNameProps,
  LoadingProps,
} from '../Button/Button';
import { HtmlDiv } from '../../reset';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../theme/utils/spacing';
import { baseStyles } from './ActionMenu.baseStyles';
import { ActionMenuItemProps } from './ActionMenuItem/ActionMenuItem';
import { ActionMenuDividerProps } from './ActionMenuDivider/ActionMenuDivider';
import { IconOptionsVertical } from 'suomifi-icons';
import { filterDuplicateKeys } from '../../utils/common/common';

const baseClassName = 'fi-action-menu';
export const actionMenuClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
};

export type MenuContent =
  | Array<
      ReactElement<ActionMenuItemProps> | ReactElement<ActionMenuDividerProps>
    >
  | ReactElement<ActionMenuItemProps>
  | ReactElement<ActionMenuDividerProps>;

export type ActionMenuProps = MarginProps &
  Omit<ButtonProps, keyof ForcedAccessibleNameProps | keyof LoadingProps> & {
    /** Text content for the menu button */
    buttonText?: string;
    /**
     * `'default'` | `'inverted'` | `'secondary'` | `'secondaryLight'`| `'secondaryNoBorder'`
     *
     * Variant for the menu button:
     * @default secondary
     */
    buttonVariant?: ButtonVariant;
    /**
     * Define a label if `buttonText` does not indicate the menu button purpose.
     * In cases where the button has a visible label, make sure the visible text is included in the aria-label.
     * Alternatively you can define `aria-labelledby` with a label element's id.
     */
    'aria-label'?: string;
    /** Menu items. Use the `<ActionMenuItem>` or  `<ActionMenuDivider>` components as children */
    children?: MenuContent;
    /** CSS class for custom styles */
    className?: string;
    /** Menu container div CSS class for custom styles. Can be used to modify menu "popover" z-index. */
    menuClassName?: string;
    /** Disables the menu button */
    disabled?: boolean;
    /** Ref is forwarded to the underlying button element. Alternative for React `ref` attribute. */
    forwardedRef?: React.RefObject<HTMLButtonElement>;
    /** Sets component's width to 100% of its parent */
    fullWidth?: boolean;
    /**
     * HTML id attribute.
     * If no id is specified, one will be generated automatically
     */
    id?: string;
    /** Name used for the menu button */
    name?: string;
    /** Callback fired on button onBlur
     * @param {FocusEvent<HTMLButtonElement>} event FocusEvent
     */
    onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
    /** Callback fired when menu opens */
    onClose?: () => void;
    /** Callback fired when menu closes */
    onOpen?: () => void;
  };

const BaseActionMenu = (props: ActionMenuProps) => {
  const {
    className,
    id,
    fullWidth,
    forwardedRef,
    buttonText,
    buttonVariant = 'secondary',
    children,
    onOpen,
    onClose,
    onBlur,
    menuClassName,
    style,
    ...rest
  } = props;
  const [_marginProps, passProps] = separateMarginProps(rest);

  const openButtonRef = forwardedRef || useRef<HTMLButtonElement>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [ariaExpanded, setAriaExpanded] = useState<boolean>(false);
  const [initialSelectedItem, setInitialSelectedItem] =
    useState<InitialActiveDescendant>('none');

  const menuId = `${id}-menu`;
  const buttonId = `${id}`;

  const openMenu = () => {
    if (onOpen) {
      onOpen();
    }
    // Highlighting the first item is a compromise to keep NVDA smooth
    setInitialSelectedItem('first');
    setMenuVisible(true);
    setAriaExpanded(true);
  };

  const closeMenu = (moveFocus: boolean = false) => {
    // For NVDA to work properly aria expanded, focus and setMenuVisible must be in this order
    setAriaExpanded(false);
    setMenuVisible(false);

    if (moveFocus) openButtonRef.current?.focus();

    if (onClose) onClose();
  };

  const handleButtonClick = () => {
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
      setInitialSelectedItem('last');
    }

    if (
      (event.key === 'ArrowDown' ||
        event.key === 'Enter' ||
        event.key === ' ') &&
      !menuVisible
    ) {
      event.preventDefault();
      openMenu();
      setInitialSelectedItem('first');
    }
  };

  return (
    <HtmlDiv
      className={classnames(baseClassName, className, {
        [actionMenuClassNames.fullWidth]: fullWidth,
      })}
      style={style}
    >
      <Button
        id={buttonId}
        variant={buttonVariant}
        iconRight={<IconOptionsVertical />}
        aria-expanded={ariaExpanded}
        aria-controls={menuId}
        aria-haspopup="menu"
        forwardedRef={openButtonRef}
        fullWidth={fullWidth}
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
      </Button>

      <ActionMenuPopover
        menuId={menuId}
        buttonId={buttonId}
        isOpen={menuVisible}
        openButtonRef={openButtonRef}
        onClose={(moveFocus: boolean) => closeMenu(moveFocus)}
        children={children}
        initialActiveDescendant={initialSelectedItem}
        fullWidth={fullWidth}
        className={menuClassName}
      />
    </HtmlDiv>
  );
};

const StyledActionMenu = styled(
  ({
    theme,
    globalMargins,
    ...passProps
  }: ActionMenuProps & SuomifiThemeProp & GlobalMarginProps) => (
    <BaseActionMenu {...passProps} />
  ),
)`
  ${({ globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.actionMenu,
      marginProps,
    );
    return baseStyles(cleanedGlobalMargins, marginProps);
  }}
`;

const ActionMenu = forwardRef<HTMLButtonElement, ActionMenuProps>(
  (props: ActionMenuProps, ref: React.RefObject<HTMLButtonElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledActionMenu
                    theme={suomifiTheme}
                    id={id}
                    globalMargins={margins}
                    forwardedRef={ref}
                    {...passProps}
                  />
                )}
              </AutoId>
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

ActionMenu.displayName = 'ActionMenu';
export { ActionMenu };
