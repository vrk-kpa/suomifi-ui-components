import React, { MutableRefObject, Ref } from 'react';
import { getLogger } from '../../utils/log';

export function windowAvailable() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export const useEnhancedEffect = windowAvailable()
  ? React.useLayoutEffect
  : React.useEffect;

export const getOwnerDocument = (elementRef: React.RefObject<any>) => {
  if (elementRef !== null && elementRef.current !== null) {
    const elem = elementRef.current;
    const ownerDocument = windowAvailable()
      ? elem
        ? elem.ownerDocument
        : document
      : null;
    return ownerDocument;
  }
  return null;
};

export const escapeStringRegexp = (string: String) =>
  string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/-/g, '\\x2d');

/** Idea for implementation more or less from react-fork-ref and @reach compose refs */
export const forkRefs =
  <T>(...refs: Ref<T>[]) =>
  (element: T | null) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (!!ref) {
        try {
          /* eslint-disable no-param-reassign */
          (ref as MutableRefObject<T | null>).current = element;
        } catch {
          getLogger().error(`Cannot assign element ${element} to ref ${ref}`);
        }
      }
    });
  };

/**
 * The following interface allows data-* attributes.
 * The basic React.HTMLAttributes interface throws errors when trying to do something like
 * <Component wrapperProps={{ 'data-testid': 'something' }}
 * Solution inspired by: https://github.com/microsoft/TypeScript/issues/28960
 */
type DataAttributeKey = `data-${string}`;
export interface HTMLAttributesIncludingDataAttributes<T>
  extends React.HTMLAttributes<T> {
  [dataAttribute: DataAttributeKey]: any;
}
