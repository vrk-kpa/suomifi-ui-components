import React, { useMemo, useContext, ReactNode } from 'react';
import { GlobalMargins } from '../utils/spacing';

export const SpacingContext = React.createContext({ margins: {} });

export const SpacingConsumer = SpacingContext.Consumer;

export interface SpacingProviderProps {
  margins: GlobalMargins;
  /** Children, returns null if no children are provided */
  children?: ReactNode;
}

export const SpacingProvider = (props: SpacingProviderProps) => {
  const spacingContext = useContext(SpacingContext);

  const contextMargins: GlobalMargins = spacingContext.margins;
  const propMargins: GlobalMargins = props.margins;

  const allMargins = {
    ...(contextMargins.all || {}),
    ...(propMargins.all || {}),
  };

  const mergedMargins: GlobalMargins = {
    ...contextMargins,
    ...propMargins,
  };

  const allGlobalMarginKeys = {
    all: null,
    alert: null,
    actionMenu: null,
    block: null,
    button: null,
    breadcrumb: null,
    checkbox: null,
    checkboxGroup: null,
    chip: null,
    dateInput: null,
    dropdown: null,
    expander: null,
    expanderGroup: null,
    externalLink: null,
    heading: null,
    hintText: null,
    inlineAlert: null,
    label: null,
    languageMenu: null,
    link: null,
    linkList: null,
    loadingSpinner: null,
    multiSelect: null,
    notification: null,
    pagination: null,
    paragraph: null,
    radioButton: null,
    radioButtonGroup: null,
    routerLink: null,
    searchInput: null,
    serviceNavigation: null,
    sideNavigation: null,
    singleSelect: null,
    staticChip: null,
    statusText: null,
    text: null,
    textarea: null,
    textInput: null,
    timeInput: null,
    toast: null,
    toggleInput: null,
    toggleButton: null,
    tooltip: null,
    wizardNavigation: null,
  };

  // Apply the 'all' margins for each component and override with component specific margins if provided
  Object.keys(allGlobalMarginKeys).forEach((key) => {
    mergedMargins[key as keyof GlobalMargins] = {
      ...allMargins,
      ...(contextMargins[key as keyof GlobalMargins] || {}),
      ...(propMargins[key as keyof GlobalMargins] || {}),
    };
  });

  const globalMargins = useMemo(
    () => ({
      margins: mergedMargins,
    }),
    [mergedMargins],
  );

  if (!props.children) {
    return null;
  }
  return (
    <SpacingContext.Provider value={globalMargins}>
      {props.children}
    </SpacingContext.Provider>
  );
};
