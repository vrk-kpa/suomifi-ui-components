import { ReactNode } from 'react';
import { HtmlDivWithRefProps } from '../../../reset';

export const baseClassName = 'fi-notification';

export const notificationClassNames = {
  styleWrapper: `${baseClassName}_style-wrapper`,
  content: `${baseClassName}_content`,
  label: `${baseClassName}_label`,
  textContentWrapper: `${baseClassName}_text-content-wrapper`,
  icon: `${baseClassName}_icon`,
  iconWrapper: `${baseClassName}_icon-wrapper`,
  closeButton: `${baseClassName}_close-button`,
  closeButtonWrapper: `${baseClassName}_close-button-wrapper`,
  smallScreen: `${baseClassName}--small-screen`,
  inline: `${baseClassName}--inline`,
  actionElementsWrapper: `${baseClassName}_actions-elements-wrapper`,
};

export interface BaseNotificationProps extends HtmlDivWithRefProps {
  /** Style variant. Affects color and icon used.
   * @default 'neutral'
   */
  status?: 'neutral' | 'success' | 'error';
  /** Set aria-live mode for the Notification text content and label.
   * @default 'assertive'
   */
  ariaLiveMode?: 'polite' | 'assertive' | 'off';
  /** Label for the Notification */
  labelText?: string;
  /** Main content of the Notification */
  children?: ReactNode;
  /** Developer can add for example buttons to botton of notification */
  actionElements?: ReactNode;
  /** Header variant for Notification */
  headingVariant?: 'h2' | 'h3' | 'h4' | 'h5';
}
