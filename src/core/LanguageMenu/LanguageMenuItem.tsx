import React, { Component } from 'react';
import { LanguageMenuItemProps, LanguageMenuLinkProps } from './LanguageMenu';
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

export class LanguageMenuItem extends Component<LanguageMenuItemLanguageProps> {
  render() {
    return <LanguageMenuItemLanguage {...this.props} />;
  }
}

export class LanguageMenuLink extends Component<LanguageMenuLinkProps> {
  render() {
    return <LanguageMenuLinkLanguage {...this.props} />;
  }
}
