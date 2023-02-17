import React, { useState, useEffect, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { default as styled } from 'styled-components';
import { usePopper } from 'react-popper';
import classnames from 'classnames';
import { useEnhancedEffect } from '../../../utils/common';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { HtmlDiv, HtmlDivWithRef } from '../../../reset';
// import { getLogger } from '../../../utils/log';
import { baseStyles } from './ActionMenuPopover.baseStyles';

const baseClassName = 'fi-action-menu-popover';

export const actionMenuClassNames = {
  baseClassName,
  hidden: `${baseClassName}--hidden`,
  application: `${baseClassName}_application`,
  bottomContainer: `${baseClassName}_bottom-container`,
  bottomButton: `${baseClassName}_bottom-button`,
  popperArrow: `${baseClassName}_popper-arrow`,
};

export interface InternalActionMenuPopoverProps {
  /** Source ref for positioning the popover next to calendar button */
  // sourceRef: React.RefObject<any>;
  /** Button ref for positioning dialog and closing dialog on button click */
  openButtonRef: React.RefObject<any>;
  /** Boolean to open or close calendar dialog */
  isOpen: boolean;
  /** Callback fired when closing popover */
  onClose: (focus?: boolean) => void;
  /** Styled component className */
  className?: string;
  /** Menu items: MenuItem or MenuLink */
  /*
  children?:
    | Array<React.ReactElement<ActionMenuPopoverItemsProps>>
    | null
    | undefined;
*/

  /** Use the `<WizardNavigationItem>` components as children */
  children: ReactNode;
}

export const BaseActionMenuPopover = (
  props: InternalActionMenuPopoverProps,
) => {
  const { openButtonRef, isOpen, onClose, className, children } = props;

  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [dialogElement, setDialogElement] = useState<HTMLElement | null>(null);
  const [hasPopperEventListeners, setHasPopperEventListeners] =
    useState<boolean>(false);

  useEnhancedEffect(() => {
    setMountNode(window.document.body);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setHasPopperEventListeners(true);
      document.addEventListener('click', globalClickHandler, {
        capture: true,
      });
      document.addEventListener('keydown', globalKeyDownHandler, {
        capture: true,
      });

      return () => {
        document.removeEventListener('click', globalClickHandler, {
          capture: true,
        });
        document.removeEventListener('keydown', globalKeyDownHandler, {
          capture: true,
        });
      };
    }
    setHasPopperEventListeners(false);
  }, [isOpen]);

  const globalClickHandler = (nativeEvent: MouseEvent) => {
    console.log((nativeEvent.target as Node).nodeName);

    if (!dialogElement?.contains(nativeEvent.target as Node)) {
      console.log('heps 1');
    }

    if (!openButtonRef.current?.contains(nativeEvent.target as Node)) {
      console.log('heps 2');
    }

    if (
      !dialogElement?.contains(nativeEvent.target as Node) &&
      !openButtonRef.current?.contains(nativeEvent.target as Node)
    ) {
      handleClose();
    }
  };

  const globalKeyDownHandler = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose(true);
    }

    if (event.key === 'Tab') {
      // What should tab do ?
    }
  };

  /*
  const handleButtonKeydown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    let date;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      // date = dateInRange(moveDays(focusableDate, 1));
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      // date = dateInRange(moveDays(focusableDate, -1));
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
    }

    if (event.key === 'Home') {
      event.preventDefault();
    }

    if (event.key === 'End') {
      event.preventDefault();
      // date = dateInRange(lastDayOfWeek(focusableDate));
    }

    if (event.key === 'PageUp' && event.shiftKey) {
      event.preventDefault();
    }

    if (event.key === 'PageDown' && event.shiftKey) {
      event.preventDefault();
    }

    if (event.key === 'PageUp' && !event.shiftKey) {
      event.preventDefault();
    }

    if (event.key === 'PageDown' && !event.shiftKey) {
      event.preventDefault();
    }
  };

  */

  const { styles, attributes } = usePopper(
    openButtonRef.current,
    dialogElement,
    {
      strategy: 'fixed',
      modifiers: [
        { name: 'eventListeners', enabled: hasPopperEventListeners },
        {
          name: 'offset',
          options: {
            offset: [0, 10],
          },
        },
        {
          name: 'flip',
          options: {
            fallbackPlacements: ['top-end'],
          },
        },
        {
          name: 'preventOverflow',
          options: {
            padding: 5,
          },
        },
      ],
      placement: 'bottom-end',
    },
  );

  const handleClose = (focus: boolean = false): void => {
    onClose(focus);
  };
  /*
  if (React.Children.count(children) < 1) {
    getLogger().warn(`Menu '${name}' does not contain items`);
    return null;
  } */

  if (!mountNode) {
    return null;
  }
  return (
    <>
      {ReactDOM.createPortal(
        <HtmlDivWithRef
          role="dialog"
          className={classnames(className, baseClassName, {
            [actionMenuClassNames.hidden]: !isOpen,
          })}
          style={styles.popper}
          forwardedRef={setDialogElement}
        >
          <HtmlDiv
            role="application"
            className={actionMenuClassNames.application}
          >
            {children}
          </HtmlDiv>
          <div
            className={actionMenuClassNames.popperArrow}
            style={styles.arrow}
            data-popper-arrow
            data-popper-placement={attributes.popper?.['data-popper-placement']}
          />
        </HtmlDivWithRef>,
        mountNode,
      )}
    </>
  );
};

const StyledActionMenuPopover = styled(
  ({
    theme,
    ...passProps
  }: InternalActionMenuPopoverProps & SuomifiThemeProp) => (
    <BaseActionMenuPopover {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ActionMenuPopover = (props: InternalActionMenuPopoverProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledActionMenuPopover theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

ActionMenuPopover.displayName = 'ActionMenuPopover';
export { ActionMenuPopover };
