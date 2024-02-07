import React, {
  forwardRef,
  FocusEvent,
  useState,
  useRef,
  ReactElement,
  ReactNode,
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
  spacingStyles,
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../theme/utils/spacing';
import {
  LanguageMenuPopover,
  InitialActiveDescendant,
} from './LanguageMenuPopover/LanguageMenuPopover';
import { HtmlButton, HtmlButtonProps, HtmlDiv } from '../../reset';
import { getConditionalAriaProp } from '../../utils/aria';
import { baseStyles } from './LanguageMenu.baseStyles';
import { LanguageMenuItemProps } from './LanguageMenuItem/LanguageMenuItem';
import { IconChevronUp, IconChevronDown } from 'suomifi-icons';

const baseClassName = 'fi-language-menu';
export const languageMenuClassNames = {
  baseClassName,
  button: `${baseClassName}_button`,
  icon: `${baseClassName}_button_icon`,
  menuOpen: `${baseClassName}_button--open`,
};

export type MenuContent =
  | Array<
      | ReactElement<LanguageMenuItemProps>
      | Array<ReactElement<LanguageMenuItemProps>>
    >
  | Array<ReactElement<LanguageMenuItemProps>>
  | ReactElement<LanguageMenuItemProps>;

export interface LanguageMenuProps
  extends MarginProps,
    Omit<HtmlButtonProps, 'onBlur'> {
  /** Content for the menu button. Should indicate the currently selected language */
  buttonText: ReactNode;
  /**
   * LanguageMenu should have a descriptive aria-label. Aria-label should also inform what language is selected.
   * For example "Select language, selected language: English". Aria-label is for assistive technologies and overrides buttonText for
   * screen readers.
   */
  'aria-label': string;
  /** Menu items. Use `<LanguageMenuItem>` components as children */
  children?: MenuContent;
  /** CSS class for custom styles */
  className?: string;
  /** Menu container div class name for custom styling. Can be used to modify menu "popover" z-index. */
  menuClassName?: string;
  /** Ref is forwarded to the menu button element. Alternative for React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLButtonElement>;
  /** HTML id attribute. If no id is specified, one will be generated automatically. */
  id?: string;
  /** Callback fired on button onBlur
   * @param {FocusEvent<HTMLButtonElement>} event FocusEvent
   */
  onBlur?: (event: FocusEvent<HTMLButtonElement>) => void;
  /** Callback fired when menu opens */
  onClose?: () => void;
  /** Callback fired when menu closes */
  onOpen?: () => void;
}

const BaseLanguageMenu = (props: LanguageMenuProps) => {
  const {
    className,
    menuClassName,
    style,
    id,
    forwardedRef,
    buttonText,
    children,
    onOpen,
    onClose,
    onBlur,
    'aria-label': ariaLabel,
    ...rest
  } = props;
  const [marginProps, passProps] = separateMarginProps(rest);
  const marginStyle = spacingStyles(marginProps);
  const openButtonRef = forwardedRef || useRef<HTMLButtonElement>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [ariaExpanded, setAriaExpanded] = useState<boolean>(false);
  const [selectFirstItem, setSelectFirstItem] =
    useState<InitialActiveDescendant>('none');

  const menuId = `${id}-menu`;
  const buttonId = `${id}`;

  const openMenu = () => {
    if (onOpen) {
      onOpen();
    }
    // Highlighting the first item is a compromise to keep NVDA smooth
    setSelectFirstItem('first');
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
      className={classnames(baseClassName, className)}
      style={{ ...marginStyle, ...style }}
    >
      <HtmlButton
        id={buttonId}
        aria-expanded={ariaExpanded}
        aria-controls={menuId}
        aria-haspopup="menu"
        {...getConditionalAriaProp('aria-label', [ariaLabel])}
        forwardedRef={openButtonRef}
        className={classnames(languageMenuClassNames.button, {
          [languageMenuClassNames.menuOpen]: menuVisible,
        })}
        onClick={handleButtonClick}
        onKeyDown={handleKeyDown}
        onBlur={(event: React.FocusEvent<HTMLButtonElement>) => {
          if (onBlur) {
            onBlur(event);
          }
        }}
        {...passProps}
      >
        {buttonText}
        {menuVisible ? (
          <IconChevronUp className={languageMenuClassNames.icon} />
        ) : (
          <IconChevronDown className={languageMenuClassNames.icon} />
        )}
      </HtmlButton>
      <LanguageMenuPopover
        isOpen={menuVisible}
        menuId={menuId}
        parentId={id}
        openButtonRef={openButtonRef}
        onClose={(moveFocus: boolean) => closeMenu(moveFocus)}
        children={children}
        initialActiveDescendant={selectFirstItem}
        className={menuClassName}
      />
    </HtmlDiv>
  );
};

const StyledLanguageMenu = styled(
  ({
    theme,
    globalMargins,
    ...passProps
  }: LanguageMenuProps & SuomifiThemeProp & GlobalMarginProps) => (
    <BaseLanguageMenu {...passProps} />
  ),
)`
  ${({ theme, globalMargins }) =>
    baseStyles(theme, globalMargins?.languageMenu)}
`;

const LanguageMenu = forwardRef<HTMLButtonElement, LanguageMenuProps>(
  (props: LanguageMenuProps, ref: React.RefObject<HTMLButtonElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <AutoId id={propId}>
                {(id) => (
                  <StyledLanguageMenu
                    theme={suomifiTheme}
                    globalMargins={margins}
                    id={id}
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

LanguageMenu.displayName = 'LanguageMenu';
export { LanguageMenu };
