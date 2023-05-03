import React, { forwardRef, FocusEvent, useState, useRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';
import {
  LanguageMenuPopover,
  InitialActiveDescendant,
} from './LanguageMenuPopover/LanguageMenuPopover';
import { HtmlButton, HtmlDiv } from '../../reset';
import { HTMLAttributesIncludingDataAttributes } from '../../utils/common/common';
import { baseStyles } from './LanguageMenu.baseStyles';
import { LanguageMenuItemProps } from './LanguageMenuItem/LanguageMenuItem';
import { Icon } from '../Icon/Icon';

const baseClassName = 'fi-language-menu';
export const languageMenuClassNames = {
  baseClassName,
  button: `${baseClassName}_button`,
  icon: `${baseClassName}_button_icon`,
  menuOpen: `${baseClassName}_button--open`,
};

export interface LanguageMenuProps {
  /** Text content for the button */
  buttonText: string;
  /** Menu items. Use `<LanguageMenuItem>` components as children */
  children?:
    | Array<React.ReactElement<LanguageMenuItemProps>>
    | React.ReactElement<LanguageMenuItemProps>;
  /** Button container div class name for custom styling */
  className?: string;
  /** Ref is forwarded to the button element. Alternative for React `ref` attribute. */
  forwardedRef?: React.RefObject<HTMLButtonElement>;
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

const BaseLanguageMenu = (props: LanguageMenuProps) => {
  const {
    className,
    wrapperProps,
    id,
    forwardedRef,
    buttonText,
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
  const buttonId = `${id}`;

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
    <HtmlDiv {...wrapperProps} className={classnames(baseClassName, className)}>
      <HtmlButton
        id={buttonId}
        aria-expanded={menuVisible}
        aria-controls={menuId}
        aria-haspopup="menu"
        forwardedRef={openButtonRef}
        className={classnames(languageMenuClassNames.button, {
          [languageMenuClassNames.menuOpen]: menuVisible,
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
        <Icon
          icon={menuVisible ? 'chevronUp' : 'chevronDown'}
          className={languageMenuClassNames.icon}
        />
      </HtmlButton>
      {menuVisible && (
        <LanguageMenuPopover
          menuId={menuId}
          buttonId={buttonId}
          openButtonRef={openButtonRef}
          onClose={() => closeMenu()}
          children={children}
          initialActiveDescendant={selectFirstItem}
        />
      )}
    </HtmlDiv>
  );
};

const StyledLanguageMenu = styled(
  ({ theme, ...passProps }: LanguageMenuProps & SuomifiThemeProp) => (
    <BaseLanguageMenu {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for selecting a language for a website
 *
 * Props other than specified explicitly are passed on to underlying button element.
 * @component
 */
const LanguageMenu = forwardRef<HTMLButtonElement, LanguageMenuProps>(
  (props: LanguageMenuProps, ref: React.RefObject<HTMLButtonElement>) => {
    const { id: propId, ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <AutoId id={propId}>
            {(id) => (
              <StyledLanguageMenu
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

LanguageMenu.displayName = 'LanguageMenu';
export { LanguageMenu };
