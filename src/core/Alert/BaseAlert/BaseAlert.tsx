import { ReactNode } from 'react';
import { HtmlDivWithRefProps } from '../../../reset';

export const baseClassName = 'fi-alert';

export const alertClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  content: `${baseClassName}_content`,
  label: `${baseClassName}_label`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  icon: `${baseClassName}_icon`,
  iconWrapper: `${baseClassName}_icon-wrapper`,
  closeButton: `${baseClassName}_close-button`,
  smallScreen: `${baseClassName}--small-screen`,
  inline: `${baseClassName}--inline`,
};

export interface BaseAlertProps extends HtmlDivWithRefProps {
  /** Style variant. Affects color and icon used.
   * @default 'neutral'
   */
  status?: 'neutral' | 'warning' | 'error';
  /** Main content of the alert */
  children?: ReactNode;
}
