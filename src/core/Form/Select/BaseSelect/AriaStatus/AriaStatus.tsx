import React, { ReactNode, useState, useEffect } from 'react';
import { HtmlSpan, HtmlSpanProps } from '../../../../../reset';
import { AriaLiveMode } from '../../../../Form/types';
import { VisuallyHidden } from '../../../../VisuallyHidden/VisuallyHidden';

export interface SelectAriaStatusProps extends HtmlSpanProps {
  status: string;
  debounce?: number;
  ariaLiveMode?: AriaLiveMode;
}

export const SelectAriaStatus = (props: SelectAriaStatusProps) => {
  const [effectiveStatus, setEffectiveStatus] = useState<ReactNode>('');
  const [timeoutId, setTimeOutId] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const {
    status = '',
    debounce = 150,
    ariaLiveMode = 'polite',
    ...passProps
  } = props;

  useEffect(() => {
    console.log('useEffect');
    clearTimeout(timeoutId as any);
    setEffectiveStatus('');
    setTimeOutId(
      setTimeout(() => {
        console.log('setEffectiveStatus', status);
        setEffectiveStatus(status);
      }, debounce),
    );

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [status]);

  return (
    <VisuallyHidden>
      <HtmlSpan
        aria-atomic="true"
        aria-relevant="all"
        aria-live={ariaLiveMode}
        {...passProps}
      >
        {effectiveStatus}
      </HtmlSpan>
    </VisuallyHidden>
  );
};
