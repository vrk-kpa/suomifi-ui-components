import React, { ReactNode, useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import {
  HtmlDivWithRef,
  HtmlLi,
  HtmlUl,
  HtmlDiv,
  HtmlButton,
} from '../../../reset';
import { baseStyles } from './AriaDesc.baseStyles';
import { default as styled } from 'styled-components';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';

export interface AriaDescProps {
  /** Url to direct to */
  href: string;
  /** Item content */
  children: ReactNode;
  /** Show item as selected one */
  selected?: boolean;
  className?: string;
}

/*
this.domNode = domNode;
this.performMenuAction = performMenuAction;
this.buttonNode = domNode.querySelector('button');
this.menuNode = domNode.querySelector('[role="menu"]');
this.currentMenuitem = {};
this.menuitemNodes = [];
this.firstMenuitem = false;
this.lastMenuitem = false;
this.firstChars = [];
*/

const baseClassName = 'menu-button-actions';
const dividerClassName = `${baseClassName}_line`;

export const menuClassNames = {
  baseClassName,
  button: `${baseClassName}_button`,
  menu: `${baseClassName}_menu`,
  item: `${baseClassName}_menu-item`,
  itemFocused: `${baseClassName}_menu-item--focus`,
  menuHidden: `${baseClassName}_menu--hidden`,
  buttonDisabled: `${baseClassName}_button--disabled`,
  icon: `${baseClassName}_icon`,
  iconOnly: `${baseClassName}_button--icon-only`,
  menuClosed: `${baseClassName}_button--menu--closed`,
};

const BaseAriaDesc = ({ selected, className, ...passProps }: AriaDescProps) => {
  const [currentMenuitem, setCurrentMenuitem] = useState<any>({});
  const [menuitemNodes, setMenuitemNodes] = useState<any>([]);
  const [firstMenuitem, setFirstMenuitem] = useState<any>(false);
  const [lastMenuitem, setLastMenuitem] = useState<any>(false);
  const [firstChars, setFirstChars] = useState<any>([]);

  const [isOpen, setIsOpen] = useState<any>(false);

  const [lastAction, setLastAction] = useState<string>('');

  const [activeDescendant, setActiveDescendant] = useState<string>('');

  const [descendants, setDescendants] = useState(['mi1', 'mi2', 'mi3', 'mi4']);

  const ulRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  /*
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen]);

  */

  const onMenuitemMouseover = (event: React.MouseEvent) => {
    console.log('KEY ??');
    // setSelectFirstItem('first');
  };
  const onMenuitemClick = (event: React.MouseEvent) => {
    console.log('KEY ??');
    // setSelectFirstItem('first');
  };

  const setFocusToFirstMenuitem = () => {
    setFocusedIndex(0);
    setActiveDescendant(descendants[0]);
  };

  const setFocusToLastMenuitem = () => {
    setFocusedIndex(3);
    setActiveDescendant(descendants[3]);
  };

  const setFocusToNextMenuitem = () => {
    if (focusedIndex < 3) {
      setActiveDescendant(descendants[focusedIndex + 1]);
      setFocusedIndex((previous) => previous + 1);
    } else {
      setActiveDescendant(descendants[0]);
      setFocusedIndex(0);
    }
  };

  const setFocusToPreviousMenuitem = () => {
    if (focusedIndex > 0) {
      setActiveDescendant(descendants[focusedIndex - 1]);
      setFocusedIndex((previous) => previous - 1);
    } else {
      setActiveDescendant(descendants[3]);
      setFocusedIndex(3);
    }
  };

  const openPopup = () => {
    // this.menuNode.style.display = 'block'; - handled with class
    // this.buttonNode.setAttribute('aria-expanded', 'true'); - handled with isOpen
    // this.menuNode.focus();

    setIsOpen(true);

    console.log(ulRef.current);
    ulRef.current?.focus();

    setTimeout(() => {
      console.log('avataan menuu', ulRef.current);
      if (ulRef.current) {
        ulRef.current.focus();
      }
      setFocusToFirstMenuitem();
    }, 100);
  };

  const closePopup = () => {
    if (isOpen) {
      setIsOpen(false);
      setActiveDescendant('');
      buttonRef.current?.focus();
      /* this.buttonNode.removeAttribute('aria-expanded');
      this.menuNode.setAttribute('aria-activedescendant', '');
      for (var i = 0; i < this.menuitemNodes.length; i++) {
        this.menuitemNodes[i].classList.remove('focus');
      }
      this.menuNode.style.display = 'none';
      this.buttonNode.focus();
      */
    }
  };

  const menuItems = (childs: ReactNode) =>
    React.Children.map(childs, (child: React.ReactElement, index) => {
      // Add onClick prop to clickable items
      if (React.isValidElement(child)) {
        // console.log(child);
        return React.cloneElement(child, {
          // selected: focusedChild === index,
          itemIndex: index,
        });
      }
      return child;
    });

  const onButtonClick = (event) => {
    if (isOpen) {
      closePopup();
    } else {
      openPopup();
    }
    event.stopPropagation();
    event.preventDefault();
  };

  const performMenuAction = (item) => {
    console.log(item);
  };

  const onMenuKeydown = (event: KeyboardEvent) => {
    const key = event.key;
    let flag = false;

    function isPrintableCharacter(str) {
      return str.length === 1 && str.match(/\S/);
    }

    if (event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    if (event.shiftKey) {
      if (isPrintableCharacter(key)) {
        // setFocusByFirstCharacter(key);
        flag = true;
      }

      if (event.key === 'Tab') {
        closePopup();
        flag = true;
      }
    } else {
      switch (key) {
        case ' ':
        case 'Enter':
          closePopup();
          performMenuAction(currentMenuitem);
          flag = true;
          event.preventDefault();
          break;

        case 'Esc':
        case 'Escape':
          closePopup();
          flag = true;
          event.preventDefault();
          break;

        case 'Up':
        case 'ArrowUp':
          setFocusToPreviousMenuitem();
          flag = true;
          event.preventDefault();
          break;

        case 'ArrowDown':
        case 'Down':
          setFocusToNextMenuitem();
          flag = true;
          event.preventDefault();
          break;

        case 'Home':
        case 'PageUp':
          setFocusToFirstMenuitem();
          flag = true;
          event.preventDefault();
          break;

        case 'End':
        case 'PageDown':
          setFocusToLastMenuitem();
          flag = true;
          event.preventDefault();
          break;

        case 'Tab':
          closePopup();
          event.preventDefault();
          break;

        default:
          /* if (isPrintableCharacter(key)) {
            setFocusByFirstCharacter(key);
            flag = true;
          } */
          break;
      }
    }
  };

  return (
    <>
      <HtmlDiv className={classnames(className, baseClassName)}>
        <br />
        activeDescendant: {activeDescendant}
        <br />
        activeIndex: {focusedIndex} <br />
        <button
          type="button"
          id="menubutton1"
          aria-haspopup="true"
          aria-controls="menu1"
          onClick={onButtonClick}
          className={classnames(className, menuClassNames.button)}
          aria-expanded={isOpen}
          ref={buttonRef}
        >
          Actions
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="down"
            width="12"
            height="9"
            viewBox="0 0 12 9"
          >
            <polygon points="1 0, 11 0, 6 8" />
          </svg>
        </button>
        <ul
          id="menu1"
          role="menu"
          ref={ulRef}
          tabIndex={-1}
          aria-labelledby="menubutton1"
          aria-activedescendant={activeDescendant}
          className={classnames(className, menuClassNames.menu, {
            [menuClassNames.menuHidden]: !isOpen,
          })}
          onKeyDown={onMenuKeydown}
        >
          <li
            id="mi1"
            role="menuitem"
            className={classnames(className, menuClassNames.item, {
              [menuClassNames.itemFocused]: activeDescendant === 'mi1',
            })}
          >
            Action 1
          </li>
          <li
            id="mi2"
            role="menuitem"
            className={classnames(className, menuClassNames.item, {
              [menuClassNames.itemFocused]: activeDescendant === 'mi2',
            })}
          >
            Action 2
          </li>
          <li
            id="mi3"
            role="menuitem"
            className={classnames(className, menuClassNames.item, {
              [menuClassNames.itemFocused]: activeDescendant === 'mi3',
            })}
          >
            Action 3
          </li>
          <li
            id="mi4"
            role="menuitem"
            className={classnames(className, menuClassNames.item, {
              [menuClassNames.itemFocused]: activeDescendant === 'mi4',
            })}
          >
            Action 4
          </li>
        </ul>
      </HtmlDiv>
      <p>
        <label>
          Last Action:
          <input
            className="action"
            id="action_output"
            type="text"
            defaultValue={lastAction}
          />
        </label>
      </p>
    </>
  );
};

const StyledAriaDesc = styled(
  ({
    theme,
    ...passProps
  }: InternalActionMenuPopoverProps & SuomifiThemeProp) => (
    <BaseAriaDesc {...passProps} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const AriaDesc = (props) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => <StyledAriaDesc theme={suomifiTheme} {...props} />}
  </SuomifiThemeConsumer>
);

AriaDesc.displayName = 'AriaDesc';
export { AriaDesc };
