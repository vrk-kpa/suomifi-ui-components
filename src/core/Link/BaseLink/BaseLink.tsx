import { ReactNode } from 'react';
import { HtmlAProps } from '../../../reset';
import { asPropType } from '../../../utils/typescript';

export const baseClassName = 'fi-link';

export const linkClassNames = {
  linkUnderline: `${baseClassName}--initial-underline`,
};

export type UnderlineVariant = 'initial' | 'hover';
export interface BaseLinkProps extends HtmlAProps {
  /** Link url. Link is not focusable without the href */
  href: string;
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Link element displayed content
   */
  children: ReactNode;
  /**
   * 'initial' | 'hover'
   *
   * Option 'initial' shows underline in link's normal state, and no underline on hover.
   * Option 'hover' shows underline on hover, and no underline in link's normal state.
   *
   * Note: default will be changed from 'hover' to 'initial', so set 'hover' explicitly when necessary.
   *
   * @default hover
   */
  underline?: UnderlineVariant;
  asProp?: asPropType;
}
