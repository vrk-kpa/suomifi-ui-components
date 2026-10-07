import React from 'react';
import { HtmlDivProps, HtmlDivWithRef } from '../../../reset';

type InteractionBlockerProps = HtmlDivProps & {
  disableInteraction: boolean;
  children: React.ReactNode;
};

export function InteractionBlocker({
  disableInteraction = true,
  children,
  ...passProps
}: InteractionBlockerProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!ref.current) return;

    const root = ref.current;
    const focusables = root.querySelectorAll<HTMLElement>(
      `
        a[href],
        button,
        input,
        select,
        textarea,
        [tabindex]
        `,
    );

    focusables.forEach((el: HTMLElement) => {
      const element = el;
      if (disableInteraction) {
        element.dataset.prevTabindex = element.getAttribute('tabindex') ?? '';
        element.setAttribute('tabindex', '-1');
        element.setAttribute('aria-disabled', 'true');
      } else {
        const prev = element.dataset.prevTabindex;
        if (prev === '') {
          element.removeAttribute('tabindex');
        } else if (prev != null) {
          element.setAttribute('tabindex', prev);
          element.removeAttribute('aria-disabled');
        }
        delete element.dataset.prevTabindex;
        element.removeAttribute('aria-disabled');
      }
    });
  }, [disableInteraction]);

  return (
    <HtmlDivWithRef
      forwardedRef={ref}
      style={{
        pointerEvents: disableInteraction ? 'none' : undefined,
      }}
      {...passProps}
    >
      {children}
    </HtmlDivWithRef>
  );
}
