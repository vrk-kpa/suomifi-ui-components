import React, { Component, ReactNode, Fragment, forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuPopover,
  MenuPopoverProps,
} from '@reach/menu-button';
import { positionDefault } from '@reach/popover';
import { PRect } from '@reach/rect';
import { SuomifiThemeProp, SuomifiThemeConsumer } from '../../theme';
import { classnamesValue } from '../../../utils/typescript';
import { getLogger } from '../../../utils/log';
import { HtmlSpan } from '../../../reset/HtmlSpan/HtmlSpan';
import { Icon } from '../../Icon/Icon';
import {
  baseStyles,
  languageMenuPopoverStyles,
} from './LanguageMenu.baseStyles';
import { LanguageMenuItemProps, LanguageMenuLinkProps } from '../index';

const baseClassName = 'fi-language-menu';
const languageMenuClassNames = {
  item: `${baseClassName}_item`,
  itemLang: `${baseClassName}-language_item`,
  button: `${baseClassName}_button`,
  buttonOpen: `${baseClassName}-language_button_open`,
  buttonLang: `${baseClassName}-language_button`,
  iconLang: `${baseClassName}-language_icon`,
};

export type LanguageMenuPopoverItemsProps =
  | LanguageMenuItemProps
  | LanguageMenuLinkProps;

export interface LanguageMenuProps {
  /** Name or content of menubutton */
  name: React.ReactNode | ((props: { isOpen: boolean }) => React.ReactNode);
  /** Custom classname to extend or customize */
  className?: string;
  /** Custom classname to extend or customize */
  languageMenuButtonClassName?: string;
  /** Custom classname to apply when menu is open */
  languageMenuOpenButtonClassName?: string;
  /** Menu items: MenuItem or MenuLink */
  children?:
    | Array<React.ReactElement<LanguageMenuPopoverItemsProps>>
    | null
    | undefined;
}

interface InnerRef {
  forwardedRef: React.Ref<HTMLButtonElement>;
}

class BaseLanguageMenu extends Component<
  LanguageMenuProps & SuomifiThemeProp & InnerRef
> {
  render() {
    const {
      children,
      name,
      className,
      theme,
      forwardedRef,
      languageMenuButtonClassName: menuButtonClassName,
      languageMenuOpenButtonClassName: menuButtonOpenClassName,
      ...passProps
    } = this.props;

    if (React.Children.count(children) < 1) {
      getLogger().warn(`Menu '${name}' does not contain items`);
      return null;
    }
    return (
      <HtmlSpan className={classnames(className, baseClassName)}>
        <Menu>
          {({ isOpen }: { isOpen: boolean }) => (
            <Fragment>
              <MenuButton
                ref={forwardedRef}
                {...passProps}
                className={classnames(
                  menuButtonClassName,
                  isOpen && menuButtonOpenClassName,
                )}
              >
                {name}
              </MenuButton>
              <StyledMenuPopover theme={theme} position={positionDefault}>
                {children}
              </StyledMenuPopover>
            </Fragment>
          )}
        </Menu>
      </HtmlSpan>
    );
  }
}
const StyledLanguageMenu = styled(
  (props: LanguageMenuProps & SuomifiThemeProp & InnerRef) => (
    <BaseLanguageMenu {...props} />
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

const LanguageMenuPopoverWithProps = (
  children: ReactNode,
  addClass?: classnamesValue,
) =>
  React.Children.map(
    children,
    (child: React.ReactElement<LanguageMenuPopoverItemsProps>) => {
      // Set defaul component-prop/type to be 'a' needed for links
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          className: classnames(languageMenuClassNames.item, addClass),
        });
      }
      return child;
    },
  );

const languageName = (name: ReactNode) => (
  <Fragment>
    {name}
    <Icon icon="chevronDown" className={languageMenuClassNames.iconLang} />
  </Fragment>
);

const LanguageMenuPopoverPosition = (
  targetRect: PRect | null,
  popoverRect: PRect | null,
): React.CSSProperties => {
  if (!targetRect || !popoverRect) {
    return {};
  }
  return {
    left: `${targetRect.left - popoverRect.width + targetRect.width}px`,
    // eslint-disable-next-line no-undef
    top: `${targetRect.top + targetRect.height + window.pageYOffset}px`,
    maxWidth: `${Math.max(
      targetRect.width,
      targetRect.width + targetRect.left - 30,
    )}px`,
    minWidth: `${targetRect.width - 2}px`,
  };
};

const StyledMenuPopover = styled(
  ({ theme, children, ...passProps }: MenuPopoverProps & SuomifiThemeProp) => (
    <MenuPopover
      {...passProps}
      position={LanguageMenuPopoverPosition}
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.stopPropagation();
        }
      }}
    >
      <MenuItems>{children}</MenuItems>
    </MenuPopover>
  ),
)`
  ${({ theme }) => languageMenuPopoverStyles(theme)}
`;

/**
 * <i class="semantics" />
 * Use for dropdown menu.
 */

const LanguageMenu = forwardRef(
  (props: LanguageMenuProps, ref: React.Ref<HTMLButtonElement>) => {
    const { children, name, className, ...passProps } = props;
    const languageMenuButtonClassName = classnames(
      languageMenuClassNames.button,
      languageMenuClassNames.buttonLang,
      className,
    );

    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledLanguageMenu
            theme={suomifiTheme}
            forwardedRef={ref}
            {...passProps}
            name={languageName(name)}
            languageMenuButtonClassName={languageMenuButtonClassName}
            languageMenuOpenButtonClassName={languageMenuClassNames.buttonOpen}
          >
            {LanguageMenuPopoverWithProps(
              children,
              languageMenuClassNames.itemLang,
            )}
          </StyledLanguageMenu>
        )}
      </SuomifiThemeConsumer>
    );
  },
);

LanguageMenu.displayName = 'LanguageMenu';
export { LanguageMenu };
