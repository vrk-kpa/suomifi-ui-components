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
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import {
  ActionMenuPopover,
  InitialActiveDescendant,
} from './ActionMenuPopover';
import { Button, ButtonVariant } from '../Button/Button';
import { HtmlDiv } from '../../reset';
import { HTMLAttributesIncludingDataAttributes } from '../../utils/common/common';
import { baseStyles } from './ActionMenu.baseStyles';
import { ActionMenuItemProps } from './ActionMenuItem/ActionMenuItem';
import { ActionMenuDividerProps } from './ActionMenuDivider/ActionMenuDivider';
import { IconOptionsVertical } from 'suomifi-icons';

const baseClassName = 'fi-action-menu';
export const actionMenuClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
  button: `${baseClassName}_button`,
  iconOnly: `${baseClassName}_button--icon-only`,
};

export type MenuContent =
  | Array<
      ReactElement<ActionMenuItemProps> | ReactElement<ActionMenuDividerProps>
    >
  | ReactElement<ActionMenuItemProps>
  | ReactElement<ActionMenuDividerProps>;

export interface ActionMenuProps {
  /** Text content for the menu button */
  buttonText?: string;
  /**
   * Variant for the menu button:
   * 'default' | 'inverted' | 'secondary' | 'secondaryLight'| 'secondaryNoBorder'
   * @default secondary
   */
  buttonVariant?: ButtonVariant;
  /**
   * Define a label if `buttonText` does not indicate the menu button purpose,
   * alternatively you can define aria-labelledby with label-element id
   */
  'aria-label'?: string;
  /** Menu items. Use the `<ActionMenuItem>` or  `<ActionMenuDivider>` components as children */
  children?: MenuContent;
  /** Menu button container div class name for custom styling */
  className?: string;
  /** Menu container div class name for custom styling. Can be used to modify menu "popover" z-index. */
  menuClassName?: string;
  /** Disable the menu button */
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
    buttonVariant = 'secondary',
    children,
    onOpen,
    onClose,
    onBlur,
    menuClassName,
    ...passProps
  } = props;

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

  const closeMenu = () => {
    // For NVDA to work properly aria expanded, focus and setMenuVisible must be in this order
    setAriaExpanded(false);
    setMenuVisible(false);
    openButtonRef.current?.focus();

    if (onClose) {
      onClose();
    }
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
      {...wrapperProps}
      className={classnames(baseClassName, className, {
        [actionMenuClassNames.fullWidth]: fullWidth,
      })}
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
        className={classnames(actionMenuClassNames.button, {
          [actionMenuClassNames.iconOnly]: !buttonText || buttonText.length < 1,
        })}
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
        onClose={() => closeMenu()}
        children={children}
        initialActiveDescendant={initialSelectedItem}
        fullWidth={fullWidth}
        className={menuClassName}
      />
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
