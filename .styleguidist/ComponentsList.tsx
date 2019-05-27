import React, { Component, ReactNode } from 'react';
import { default as DefaultComponentsList } from 'react-styleguidist/lib/client/rsg-components/ComponentsList/ComponentsList';

interface ComponentsListProps {
  items?: any[];
  classes?: any;
  hashPath?: string[];
  useRouterLinks?: boolean;
  useHashId?: boolean;
  children?: ReactNode;
}

const hideFromSections = ['Text', 'Breadcrumb', 'Dropdown', 'Menu', 'Panel'];

// tslint:disable-next-line
export default class ComponentsList extends Component<ComponentsListProps> {
  render() {
    const { items = [], ...passProps } = this.props;
    const { hashPath = [] } = this.props;
    const sortItems = (items: any[]) =>
      [...items].sort((a, b) => a.name.localeCompare(b.name));
    const lastPath = hashPath[hashPath.length - 1];
    const hide = !!lastPath && hideFromSections.includes(lastPath);

    if (hide) return null;

    return (
      <DefaultComponentsList
        {...passProps}
        items={hashPath.length === 2 ? sortItems(items) : items}
      />
    );
  }
}
