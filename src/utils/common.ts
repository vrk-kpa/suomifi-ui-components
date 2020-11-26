import React from 'react';

function windowAvailable() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

export const useEnhancedEffect = windowAvailable()
  ? React.useLayoutEffect
  : React.useEffect;
