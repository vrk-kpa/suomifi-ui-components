import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlDiv, HtmlLi, HtmlSpan } from '../../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../theme';
import { baseStyles } from './WizardNavigationItem.baseStyles';
import { styled } from 'styled-components';
import { IconCheckCircleFilled, IconErrorFilled } from 'suomifi-icons';

export interface WizardNavigationItemProps {
  /** CSS class for custom styles */
  className?: string;
  /** Use the polymorphic `<RouterLink>` component as child to get intended CSS styling */
  children: ReactNode;
  /** Status of the item. Affects styling and element reachability. Note: 'current' and 'current-completed'
   * are deprecated in favor of the 'active' prop */
  status:
    | 'default'
    | 'current'
    | 'current-completed'
    | 'completed'
    | 'error'
    | 'coming'
    | 'disabled';
  /** Whether the item is the active step. Replaces status 'current': use status 'default' + active.
   * Replaces status 'current-completed': use status 'completed' + active */
  active?: boolean;
}

const baseClassName = 'fi-wizard-navigation-item';
const defaultClassName = `${baseClassName}--default`;
const currentClassName = `${baseClassName}--current`;
const currentCompletedClassName = `${baseClassName}--current-completed`;
const completedClassName = `${baseClassName}--completed`;
const errorClassName = `${baseClassName}--error`;
const comingClassName = `${baseClassName}--coming`;
const disabledClassName = `${baseClassName}--disabled`;
const activeClassName = `${baseClassName}--active`;
const innerWrapperClassName = `${baseClassName}_inner-wrapper`;
const leftIconClassName = `${baseClassName}_left-icon`;

const BaseWizardNavigationItem = ({
  className,
  children,
  status,
  active,
  ...passProps
}: WizardNavigationItemProps) => (
  <HtmlLi
    className={classnames(className, baseClassName, {
      [defaultClassName]: status === 'default',
      [currentClassName]: status === 'current',
      [currentCompletedClassName]: status === 'current-completed',
      [completedClassName]: status === 'completed',
      [errorClassName]: status === 'error',
      [comingClassName]: status === 'coming',
      [disabledClassName]: status === 'disabled',
      [activeClassName]: active,
    })}
    aria-disabled={status === 'disabled' ? true : undefined}
    {...passProps}
  >
    <HtmlDiv className={innerWrapperClassName}>
      <HtmlSpan className={leftIconClassName}>
        {(status === 'completed' || status === 'current-completed') && (
          <IconCheckCircleFilled />
        )}
        {status === 'error' && <IconErrorFilled />}
      </HtmlSpan>
      {children}
    </HtmlDiv>
  </HtmlLi>
);

const StyledWizardNavigationItem = styled(
  (props: WizardNavigationItemProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseWizardNavigationItem {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const WizardNavigationItem = (props: WizardNavigationItemProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledWizardNavigationItem theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

WizardNavigationItem.displayName = 'WizardNavigationItem';
export { WizardNavigationItem };
