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

// tslint:disable-next-line
export default class ComponentsList extends Component<ComponentsListProps> {
  render() {
    const { items = [], ...passProps } = this.props;
    const { hashPath = [] } = this.props;
    const sortItems = (items: any[]) =>
      [...items].sort((a, b) => a.name.localeCompare(b.name));
    const hide = hashPath.length > 2;

    if (hide) return null;

    const shouldSortAlphabetically =
      items.length > 0 && items[0].sections?.length === 0;

    return (
      <DefaultComponentsList
        {...passProps}
        items={shouldSortAlphabetically ? sortItems(items) : items}
      />
    );
  }
}
