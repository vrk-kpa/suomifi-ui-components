import React, { Component, ReactNode, Fragment } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { classnamesValue } from '../../utils/typescript';
import {
  LanguageMenu as CompLanguageMenu,
  LanguageMenuProps as CompLanguageMenuProps,
  LanguageMenuPopoverItemsProps,
  MenuItems as CompMenuItems,
  MenuPopover as CompMenuPopover,
  MenuPopoverProps as CompMenuPopoverProps,
  PRect,
} from '../../components/LanguageMenu/LanguageMenu';
import {
  LanguageMenuItemLanguage,
  LanguageMenuItemLanguageProps,
  LanguageMenuLinkLanguage,
  LanguageMenuLinkLanguageProps,
} from './LanguageMenuItem';
import {
  baseStyles,
  languageMenuPopoverStyles,
} from './LanguageMenu.baseStyles';

import { Icon } from '../Icon/Icon';

const itemClassName = 'fi-language-menu_item';
const itemLangClassName = 'fi-language-menu-language_item';
const buttonClassName = 'fi-language-menu_button';
const buttonOpenClassName = 'fi-language-menu-language_button_open';
const buttonLangClassName = 'fi-language-menu-language_button';

const popoverClassName = 'fi-language-menu_popover';
const popoverLangClassName = 'fi-language-menu-language_popover';
const iconLangClassName = 'fi-language-menu-language_icon';

export interface LanguageMenuProps extends CompLanguageMenuProps {}

const StyledLanguageMenu = styled((props: LanguageMenuProps) => (
  <CompLanguageMenu {...props} />
))`
  ${baseStyles}
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
          as: 'a',
          className: classnames(itemClassName, addClass),
        });
      }
      return child;
    },
  );

const languageName = (name: ReactNode) => (
  <Fragment>
    {name}
    <Icon icon="chevronDown" className={iconLangClassName} />
  </Fragment>
);

interface LanguageMenuPopoverProps extends CompMenuPopoverProps {}

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
  ({ children, ...passProps }: LanguageMenuPopoverProps) => (
    <CompMenuPopover {...passProps} position={LanguageMenuPopoverPosition}>
      <CompMenuItems>{children}</CompMenuItems>
    </CompMenuPopover>
  ),
)`
  ${languageMenuPopoverStyles}
`;

class LanguageMenuVariation extends Component<LanguageMenuProps> {
  render() {
    const {
      children,
      name,
      className,
      languageMenuPopoverComponent: MenuPopoverComponentProp,
      ...passProps
    } = this.props;
    const languageMenuButtonClassName = classnames(
      buttonClassName,
      buttonLangClassName,
      className,
    );
    const menuPopoverProps = {
      className: classnames(popoverClassName, popoverLangClassName),
    };

    return (
      <Fragment>
        <StyledLanguageMenu
          {...passProps}
          name={languageName(name)}
          languageMenuButtonClassName={languageMenuButtonClassName}
          languageMenuOpenButtonClassName={buttonOpenClassName}
          languageMenuPopoverProps={menuPopoverProps}
          languageMenuPopoverComponent={
            !!MenuPopoverComponentProp
              ? MenuPopoverComponentProp
              : StyledMenuPopover
          }
        >
          {LanguageMenuPopoverWithProps(children, itemLangClassName)}
        </StyledLanguageMenu>
      </Fragment>
    );
  }
}

/**
 * <i class="semantics" />
 * Use for dropdown menu.
 */
export class LanguageMenu extends Component<LanguageMenuProps> {
  static languageItem = (props: LanguageMenuItemLanguageProps) => (
    <LanguageMenuItemLanguage {...props} />
  );

  static LinkLanguage = (props: LanguageMenuLinkLanguageProps) => (
    <LanguageMenuLinkLanguage {...props} />
  );

  render() {
    return <LanguageMenuVariation {...this.props} />;
  }
}
