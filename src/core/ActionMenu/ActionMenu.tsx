import React, {
  forwardRef,
  FocusEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';

import { ActionMenuPopover, InitialFocus } from './ActionMenuPopover';

import { AriaDesc } from './AriaDesc';

import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { Button } from '../Button/Button';

import {
  HtmlDiv,
  HtmlDivProps,
  HtmlDivWithRef,
  HtmlButton,
  HtmlButtonProps,
  HtmlInput,
  HtmlDivWithRefProps,
} from '../../reset';

import { baseStyles } from './ActionMenu.baseStyles';

const baseClassName = 'fi-action-menu';
export const actionMenuClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
  disabled: `${baseClassName}--disabled`,
  button: `${baseClassName}_button`,
  buttonDisabled: `${baseClassName}_button--disabled`,
  icon: `${baseClassName}_icon`,
  iconOnly: `${baseClassName}_button--icon-only`,
  menuClosed: `${baseClassName}_button--menu--closed`,
};

export interface ActionMenuProps
  extends Omit<HtmlInputProps, 'type' | 'onChange'> {
  /** TextInput container div class name for custom styling. */
  className?: string;
  /** TextInput wrapping div element props */
  wrapperProps?: Omit<HtmlDivProps, 'className'>;
  /** Disable input usage */
  disabled?: boolean;
  /** Callback fired when input is clicked. */
  onClick?: () => void;
  /** Callback fired when input value changes. If value can't be parsed to date, Invalid Date is returned.
   * Invalid Date is a Date, whose time value is NaN.´
   * @param {string} change.value Input value
   * @param {Date} change.date Input value parsed to Date */

  onChange?: (change: { date: Date }) => void;
  /** Callback fired on input text onBlur
   * @param {FocusEvent<HTMLInputElement>} event FocusEvent
   */
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  /** Controlled value */
  value?: string;
  /** Set components width to 100% */
  fullWidth?: boolean;
  /** Label text for the button. */
  openButtonLabel: string;
  /** Label text for the button. */
  buttonText?: string;

  onClose?: () => void;

  onOpen?: () => void;

  /** Custom props passed to the menu button */
  closeButtonProps?: Omit<HtmlButtonProps, 'onClick' | 'aria-label'>;
}

const BaseActionMenu = (props: ActionMenuProps) => {
  const {
    className,
    onChange: propOnChange,
    wrapperProps,
    id,
    fullWidth,
    forwardedRef,
    'aria-describedby': ariaDescribedBy,
    defaultValue,
    value,
    buttonText,
    openButtonLabel,
    children,
    onOpen,
    onClose,
    ...passProps
  } = props;

  const openButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [selectFirstItem, setSelectFirstItem] = useState<InitialFocus>('none');

  const menuId = `${id}-menu`;
  const buttonId = `${id}-button`;

  useEffect(() => {
    if (menuVisible) {
      console.log('menu was changed to visible');
      console.log('nyt? menuu', menuRef.current);
    }
  }, [menuVisible]);

  const toggleMenu = (open: boolean) => {
    if (open && onOpen) {
      onOpen();
      /* if (openButtonRef.current) {
        openButtonRef.current.focus();
      } */
    }

    if (!open && onClose) {
      onClose();
    }

    if (!open) {
      openButtonRef.current?.focus();
    }

    setMenuVisible(open);

    /*
    if (open) {
      setTimeout(() => {
        console.log('avataan menuu', menuRef.current);
        if (menuRef.current) {
          menuRef.current.focus();
        }
      }, 100);
    } */
  };

  const handleClick = (event: React.MouseEvent) => {
    setSelectFirstItem('none');

    toggleMenu(!menuVisible);

    if (event.clientX === 0 && event.clientY === 0) {
      console.log('KEY ??');
      // setSelectFirstItem('first');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    console.log('handleKeyDown');
    if (event.key === 'ArrowDown' && !menuVisible) {
      event.preventDefault();
      toggleMenu(!menuVisible);
      setSelectFirstItem('first');
    }

    if (event.key === 'ArrowUp' && !menuVisible) {
      event.preventDefault();
      toggleMenu(!menuVisible);
      setSelectFirstItem('last');
    }

    if ((event.key === 'Enter' || event.key === ' ') && !menuVisible) {
      console.log('Enter or space');
      event.preventDefault();
      toggleMenu(!menuVisible);
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
          // aria-haspopup="true"
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
          onClick={handleClick}
          onKeyPress={(event) => {
            console.log('key press');
          }}
          onKeyDown={handleKeyDown}
          disabled={passProps.disabled}
        >
          {buttonText}
          <VisuallyHidden>{openButtonLabel}</VisuallyHidden>
        </Button>

        <ActionMenuPopover
          menuId={menuId}
          buttonId={buttonId}
          openButtonRef={openButtonRef}
          onClose={() => toggleMenu(false)}
          children={children}
          initialFocus={selectFirstItem}
          forwardedRef={menuRef}
          isOpen={menuVisible}
        />
      </>

      <AriaDesc />
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
 * Props other than specified explicitly are passed on to underlying ?? TODO element.
 * @component
 */
const ActionMenu = forwardRef<HTMLInputElement, ActionMenuProps>(
  (props: ActionMenuProps, ref: React.Ref<HTMLInputElement>) => {
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
