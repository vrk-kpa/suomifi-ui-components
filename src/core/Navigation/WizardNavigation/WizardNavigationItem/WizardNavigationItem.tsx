import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlDiv, HtmlLi, HtmlSpan } from '../../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../theme';
import { baseStyles } from './WizardNavigationItem.baseStyles';
import styled from 'styled-components';

export interface WizardNavigationItemProps {
  /** Custom class */
  className?: string;
  /** Use the polymorphic RouterLink component as child to get intended CSS styling */
  children: ReactNode;
  /** Indicates the step's number */
  stepNumber: Number;
  /** Status of the item. Changes styling and availability */
  status: 'visited' | 'current' | 'proceed' | 'not-visited' | 'disabled';
}

const baseClassName = 'fi-wizard-navigation-item';
const visitedClassName = `${baseClassName}--visited`;
const currentClassName = `${baseClassName}--current`;
const proceedClassName = `${baseClassName}--proceed`;
const notVisitedClassName = `${baseClassName}--not-visited`;
const disabledClassName = `${baseClassName}--disabled`;

const innerWrapperClassName = `${baseClassName}_inner-wrapper`;
const stepNumberClassName = `${baseClassName}_step-number`;

const BaseWizardNavigationItem = ({
  className,
  children,
  status,
  stepNumber,
  ...passProps
}: WizardNavigationItemProps) => (
  <HtmlLi
    className={classnames(className, baseClassName, {
      [visitedClassName]: status === 'visited',
      [currentClassName]: status === 'current',
      [proceedClassName]: status === 'proceed',
      [notVisitedClassName]: status === 'not-visited',
      [disabledClassName]: status === 'disabled',
    })}
    aria-disabled={status === 'disabled' ? true : undefined}
    {...passProps}
  >
    <HtmlDiv className={innerWrapperClassName}>
      <HtmlSpan className={stepNumberClassName}>{stepNumber}</HtmlSpan>
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
