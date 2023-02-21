import React, { forwardRef, FocusEvent, useState, useRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { AutoId } from '../utils/AutoId/AutoId';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../theme';

import {
  HtmlInputProps,
  HtmlDiv,
  HtmlDivProps,
  HtmlSpan,
  HtmlButton,
} from '../../reset';
import { ActionMenuPopover } from './ActionMenuPopover';

import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import { Icon } from '../Icon/Icon';

import { baseStyles } from './ActionMenu.baseStyles';

const baseClassName = 'fi-action-menu';
export const actionMenuClassNames = {
  baseClassName,
  fullWidth: `${baseClassName}--full-width`,
  disabled: `${baseClassName}--disabled`,
  inputAndPickerWrapper: `${baseClassName}_input-and-picker-wrapper`,
  pickerElementContainer: `${baseClassName}_picker-element-container`,
  pickerButton: `${baseClassName}_picker-button`,
  pickerButtonDisabled: `${baseClassName}_picker-button--disabled`,
  pickerIcon: `${baseClassName}_picker-icon`,
  styleWrapper: `${baseClassName}_wrapper`,
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
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const toggleMenu = (open: boolean, focus: boolean = false) => {
    setMenuVisible(open);

    if (open && onOpen) {
      onOpen();
    }

    if (!open && onClose) {
      onClose();
    }

    if (!open && focus) {
      openButtonRef.current?.focus();
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
      <HtmlSpan className={actionMenuClassNames.styleWrapper}>
        <HtmlDiv className={actionMenuClassNames.inputAndPickerWrapper}>
          <HtmlDiv className={actionMenuClassNames.pickerElementContainer}>
            <>
              <HtmlButton
                forwardedRef={openButtonRef}
                className={classnames(actionMenuClassNames.pickerButton, {
                  [actionMenuClassNames.pickerButtonDisabled]:
                    passProps.disabled,
                })}
                onClick={() => toggleMenu(!menuVisible)}
                disabled={passProps.disabled}
              >
                {buttonText}
                <VisuallyHidden>{openButtonLabel}</VisuallyHidden>
                <Icon
                  className={actionMenuClassNames.pickerIcon}
                  aria-hidden={true}
                  icon="menu"
                />
              </HtmlButton>
              <ActionMenuPopover
                openButtonRef={openButtonRef}
                isOpen={menuVisible}
                onClose={(focus) => toggleMenu(false, focus)}
                children={children}
              />
            </>
          </HtmlDiv>
        </HtmlDiv>
      </HtmlSpan>
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
