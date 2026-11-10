import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type AnimationEvent,
  type FocusEvent,
  type RefObject,
} from 'react';

export type ToastState = 'hidden' | 'open' | 'closing';

export const TOAST_CLOSING_CLASS_NAME = 'toast--closing';

export interface UseToastOptions {
  /**
   * Time in ms before the toast closes automatically.
   * @default 10000
   */
  duration?: number | null;
  /**
   * Element that receives focus if the toast is closed while focus is inside it.
   */
  returnFocusRef?: RefObject<HTMLElement | null>;
  /**
   * Backup timer for unmounting toast in case animation doesn't finish
   * @default 1000
   */
  exitTimeout?: number;
  /** Called once the toast has been fully removed. */
  onClosed?: () => void;
}

export const useToast = ({
  duration = 10000,
  returnFocusRef,
  exitTimeout = 1000,
  onClosed,
}: UseToastOptions = {}) => {
  const [state, setState] = useState<ToastState>('hidden');
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [openId, setOpenId] = useState(0);

  const onClosedRef = useRef(onClosed);
  useEffect(() => {
    onClosedRef.current = onClosed;
  });

  const paused = hovered || focused;

  const open = useCallback(() => {
    setState('open');
    setOpenId((id) => id + 1);
  }, []);

  const close = useCallback(() => {
    if (focused) returnFocusRef?.current?.focus();
    setState((current) => (current === 'open' ? 'closing' : current));
  }, [focused, returnFocusRef]);

  const finishClosing = useCallback(() => {
    setState('hidden');
    setHovered(false);
    setFocused(false);
    onClosedRef.current?.();
  }, []);

  useEffect(() => {
    if (state !== 'open' || paused || duration === null) return;
    const timer = window.setTimeout(close, duration);
    return () => window.clearTimeout(timer);
  }, [state, paused, duration, openId, close]);

  useEffect(() => {
    if (state !== 'closing') return;
    const timer = window.setTimeout(finishClosing, exitTimeout);
    return () => window.clearTimeout(timer);
  }, [state, exitTimeout, finishClosing]);

  const toastProps = {
    className: state === 'closing' ? TOAST_CLOSING_CLASS_NAME : undefined,
    onMouseEnter: () => setHovered(true),
    onMouseLeave: () => setHovered(false),
    onFocus: () => setFocused(true),
    onBlur: (e: FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
        setFocused(false);
      }
    },
    onAnimationEnd: (e: AnimationEvent<HTMLElement>) => {
      if (e.target === e.currentTarget && state === 'closing') {
        finishClosing();
      }
    },
  };

  return {
    state,
    isVisible: state !== 'hidden',
    isPaused: paused,
    open,
    close,
    toastProps,
  };
};
