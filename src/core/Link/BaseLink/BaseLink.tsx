import { ReactNode } from 'react';
import { HtmlAProps } from '../../../reset';
import { asPropType } from '../../../utils/typescript';

export const baseClassName = 'fi-link';

export const linkClassNames = {
  linkUnderline: `${baseClassName}--initial-underline`,
  accent: `${baseClassName}--accent`,
  accentIcon: `${baseClassName}--accent_icon`,
  small: `${baseClassName}--small`,
};

export type UnderlineVariant = 'initial' | 'hover';
export interface BaseLinkProps extends HtmlAProps {
  /** Link url. The component is not focusable without the href */
  href: string;
  /** CSS class for custom styles */
  className?: string;
  /**
   * Text content of the link
   */
  children: ReactNode;
  /**
   * `'initial'` | `'hover'`
   *
   * Option `'initial'` shows underline in link's normal state, and no underline on hover.
   * Option `'hover'` shows underline on hover, and no underline in link's normal state.
   *
   * Note: default will be changed from `'hover'` to `'initial'`, so set `'hover'` explicitly when necessary.
   *
   * @default hover
   */
  underline?: UnderlineVariant;
  /** Style variant for the link */
  variant?: 'default' | 'accent';
  asProp?: asPropType;
  smallScreen?: boolean;
}
