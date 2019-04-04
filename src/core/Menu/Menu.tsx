import React, { Component, ReactNode, Fragment } from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import { classnamesValue } from '../../utils/typescript';
import { withDefaultTheme } from '../theme/utils/defaultTheme';
import { ThemeComponent } from '../theme';
import { Global } from '@emotion/core';
import { baseStyles, globalStyles, iconBaseStyles } from './Menu.baseStyles';
import {
  Menu as CompMenu,
  MenuProps as CompMenuProps,
  MenuListItemsProps,
} from '../../components/Menu/Menu';
import {
  MenuLanguageItem,
  MenuLanguageItemProps,
  MenuLanguageLink,
  MenuLanguageLinkProps,
} from './MenuItem';

import { Icon, IconProps } from '../Icon/Icon';

type ButtonVariant = 'default' | 'language';

export interface MenuProps extends CompMenuProps, ThemeComponent {
  /**
   * 'default' | 'language'
   * @default default
   */
  variant?: ButtonVariant;
}

const baseClassName = 'fi-menu';

const StyledMenu = styled(({ theme, className, ...passProps }: MenuProps) => (
  <CompMenu {...passProps} className={classnames(className, baseClassName)} />
))`
  label: ${baseClassName};
  ${props => baseStyles(props)}
`;

const MenuListWithProps = (children: ReactNode, addClass?: classnamesValue) =>
  React.Children.map(
    children,
    (child: React.ReactElement<MenuListItemsProps>) => {
      // Set defaul component-prop/type to be 'a' needed for links
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          component: 'a',
          className: classnames('fi-menu-item', addClass),
        });
      }
      return child;
    },
  );

const StyledIcon = styled((props: IconProps) => (
  <Icon icon="chevronDown" {...props} />
))`
  ${iconBaseStyles}
`;

const languageName = (name: ReactNode) => (
  <Fragment>
    {name}
    <StyledIcon />
  </Fragment>
);

class MenuVariation extends Component<MenuProps> {
  render() {
    const {
      children,
      variant,
      name,
      className,
      ...passProps
    } = withDefaultTheme(this.props);
    const ifMenuLanguage = variant === 'language';
    const menuButtonClassName = classnames(
      'fi-menu-button',
      {
        'fi-menu-language-button': ifMenuLanguage,
      },
      className,
    );
    const menuListProps = {
      className: classnames('fi-menu-list', {
        'fi-menu-language-list': ifMenuLanguage,
      }),
    };

    return (
      <Fragment>
        <Global styles={globalStyles(this.props)} />
        <StyledMenu
          {...passProps}
          name={!!ifMenuLanguage ? languageName(name) : name}
          menuButtonClassName={menuButtonClassName}
          menuListProps={menuListProps}
        >
          {MenuListWithProps(children, {
            'fi-menu-language-item': ifMenuLanguage,
          })}
        </StyledMenu>
      </Fragment>
    );
  }
}

/**
 * Use for dropdown menu.
 */
export class Menu extends Component<MenuProps> {
  static language = (props: MenuProps) => {
    return <MenuVariation {...props} variant="language" />;
  };

  static languageItem = (props: MenuLanguageItemProps) => {
    return <MenuLanguageItem {...props} />;
  };

  static languageLink = (props: MenuLanguageLinkProps) => {
    return <MenuLanguageLink {...props} />;
  };

  render() {
    return <MenuVariation {...this.props} />;
  }
}
