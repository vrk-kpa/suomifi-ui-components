import React, { Component, ReactNode, Fragment } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { classnamesValue } from '../../utils/typescript';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, InternalTokensProp } from '../theme';
import { baseStyles, languageMenuListStyles } from './LanguageMenu.baseStyles';
import {
  LanguageMenu as CompLanguageMenu,
  LanguageMenuProps as CompLanguageMenuProps,
  LanguageMenuListItemsProps,
  MenuList as CompMenuList,
  MenuListProps as CompMenuListProps,
} from '../../components/LanguageMenu/LanguageMenu';
import {
  LanguageMenuItemLanguage,
  LanguageMenuItemLanguageProps,
  LanguageMenuLinkLanguage,
  LanguageMenuLinkLanguageProps,
} from './LanguageMenuItem';

import { Icon } from '../Icon/Icon';

const itemClassName = 'fi-language-menu_item';
const itemLangClassName = 'fi-language-menu-language_item';
const buttonClassName = 'fi-language-menu_button';
const buttonLangClassName = 'fi-language-menu-language_button';

const listClassName = 'fi-language-menu_list';
const listLangClassName = 'fi-language-menu-language_list';
const iconLangClassName = 'fi-language-menu-language_icon';
const iconLangOpenClassName = 'fi-language-menu-language_open_icon';

export interface LanguageMenuProps extends CompLanguageMenuProps, TokensProp {}

const StyledLanguageMenu = styled(
  ({ tokens, ...passProps }: LanguageMenuProps & InternalTokensProp) => (
    <CompLanguageMenu {...passProps} />
  ),
)`
  ${props => baseStyles(props)}
`;

const LanguageMenuListWithProps = (
  children: ReactNode,
  addClass?: classnamesValue,
) =>
  React.Children.map(
    children,
    (child: React.ReactElement<LanguageMenuListItemsProps>) => {
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

const languageName = (name: ReactNode, isMenuOpen: boolean) => (
  <Fragment>
    {name}
    <Icon
      icon="chevronDown"
      className={classnames(
        iconLangClassName,
        isMenuOpen ? iconLangOpenClassName : undefined,
      )}
    />
  </Fragment>
);

interface LanguageMenuListProps extends CompMenuListProps, TokensProp {}

const StyledMenuList = styled(
  ({ tokens, ...passProps }: LanguageMenuListProps) => (
    <CompMenuList {...passProps} />
  ),
)`
  ${props => languageMenuListStyles(props.theme)}
`;

type LanguageMenuState = {
  isMenuOpen: boolean;
};

class LanguageMenuVariation extends Component<
  LanguageMenuProps,
  LanguageMenuState
> {
  constructor(props: LanguageMenuProps) {
    super(props);
    this.state = {
      isMenuOpen: false,
    };
  }

  setIsMenuOpen = (isMenuOpen: boolean) => {
    console.log(isMenuOpen, this.state.isMenuOpen);
    if (isMenuOpen !== this.state.isMenuOpen) {
      this.setState({ isMenuOpen });
    }
  };

  render() {
    const {
      children,
      name,
      className,
      languageMenuListComponent: MenuListComponentProp,
      ...passProps
    } = withSuomifiDefaultProps(this.props);
    const languageMenuButtonClassName = classnames(
      buttonClassName,
      buttonLangClassName,
      className,
    );
    const menuListProps = {
      className: classnames(listClassName, listLangClassName),
    };

    return (
      <Fragment>
        <StyledLanguageMenu
          {...passProps}
          onMenuOpen={this.setIsMenuOpen}
          name={languageName(name, this.state.isMenuOpen)}
          languageMenuButtonClassName={languageMenuButtonClassName}
          languageMenuListProps={menuListProps}
          languageMenuListComponent={
            !!MenuListComponentProp ? MenuListComponentProp : StyledMenuList
          }
        >
          {LanguageMenuListWithProps(children, itemLangClassName)}
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
  static languageItem = (props: LanguageMenuItemLanguageProps) => {
    return <LanguageMenuItemLanguage {...props} />;
  };

  static LinkLanguage = (props: LanguageMenuLinkLanguageProps) => {
    return <LanguageMenuLinkLanguage {...props} />;
  };

  render() {
    return <LanguageMenuVariation {...this.props} />;
  }
}
