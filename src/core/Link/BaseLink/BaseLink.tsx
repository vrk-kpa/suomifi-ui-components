import { ReactNode } from 'react';
import { HtmlAProps } from '../../../reset';
import { asPropType } from '../../../utils/typescript';

export const baseClassName = 'fi-link';

export interface BaseLinkProps extends HtmlAProps {
  /** Link url. Link is not focusable without the href */
  href: string;
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Link element displayed content
   */
  children: ReactNode;
  asProp?: asPropType;
}
