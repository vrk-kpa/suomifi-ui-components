import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlDiv, HtmlLi, HtmlSpan } from '../../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../theme';
import { baseStyles } from './WizardNavigationItem.baseStyles';
import styled from 'styled-components';
import { IconCheck } from 'suomifi-icons';

export interface WizardNavigationItemProps {
  /** Custom class */
  className?: string;
  /** Use the polymorphic RouterLink component as child to get intended CSS styling */
  children: ReactNode;
  /** Status of the item. Affects styling and element reachability */
  status:
    | 'default'
    | 'current'
    | 'current-completed'
    | 'completed'
    | 'coming'
    | 'disabled';
}

const baseClassName = 'fi-wizard-navigation-item';
const defaultClassName = `${baseClassName}--default`;
const currentClassName = `${baseClassName}--current`;
const currentCompletedClassName = `${baseClassName}--current-completed`;
const completedClassName = `${baseClassName}--completed`;
const comingClassName = `${baseClassName}--coming`;
const disabledClassName = `${baseClassName}--disabled`;

const innerWrapperClassName = `${baseClassName}_inner-wrapper`;
const leftIconClassName = `${baseClassName}_left-icon`;

const BaseWizardNavigationItem = ({
  className,
  children,
  status,
  ...passProps
}: WizardNavigationItemProps) => (
  <HtmlLi
    className={classnames(className, baseClassName, {
      [defaultClassName]: status === 'default',
      [currentClassName]: status === 'current',
      [currentCompletedClassName]: status === 'current-completed',
      [completedClassName]: status === 'completed',
      [comingClassName]: status === 'coming',
      [disabledClassName]: status === 'disabled',
    })}
    aria-disabled={status === 'disabled' ? true : undefined}
    {...passProps}
  >
    <HtmlDiv className={innerWrapperClassName}>
      <HtmlSpan className={leftIconClassName}>
        {(status === 'completed' || status === 'current-completed') && (
          <IconCheck />
        )}
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
