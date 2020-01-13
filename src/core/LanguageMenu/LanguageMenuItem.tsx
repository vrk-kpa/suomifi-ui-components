import React, { Component } from 'react';
import {
  LanguageMenuItem as CompLanguageMenuItem,
  LanguageMenuLink as CompLanguageMenuLink,
  LanguageMenuItemProps,
  LanguageMenuLinkProps,
} from '../../components/LanguageMenu/LanguageMenu';
import {
  LanguageMenuItemLanguage,
  LanguageMenuItemLanguageProps,
} from './LanguageMenuItemLanguage';
import {
  LanguageMenuLinkLanguage,
  LanguageMenuLinkLanguageProps,
} from './LanguageMenuLinkLanguage';
export {
  LanguageMenuItemProps,
  LanguageMenuLinkProps,
  LanguageMenuItemLanguage,
  LanguageMenuItemLanguageProps,
  LanguageMenuLinkLanguage,
  LanguageMenuLinkLanguageProps,
};

export class LanguageMenuItem extends Component<LanguageMenuItemProps> {
  static language = (props: LanguageMenuItemLanguageProps) => {
    return <LanguageMenuItemLanguage {...props} />;
  };

  render() {
    return CompLanguageMenuItem;
  }
}

export class LanguageMenuLink extends Component<LanguageMenuLinkProps> {
  static language = (props: LanguageMenuLinkLanguageProps) => {
    return <LanguageMenuLinkLanguage {...props} />;
  };

  render() {
    return CompLanguageMenuLink;
  }
}
