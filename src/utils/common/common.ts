import React from 'react';

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
