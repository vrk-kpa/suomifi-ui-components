import React, { ReactNode, useState } from 'react';
import { HtmlButton, HtmlDiv, HtmlNav, HtmlUl } from '../../../../reset';
import styled from 'styled-components';
import { SuomifiThemeConsumer } from '../../../theme';
import { baseStyles } from './WizardNavigation.baseStyles';
import classnames from 'classnames';
import { Icon } from '../../../Icon/Icon';

export interface WizardNavigationProps {
  children: ReactNode | ReactNode[];
  /**
   * Normal or small screen variant
   * @default normal
   */
  variant?: 'default' | 'smallScreen';
  /**
   * Whether the menu is initially expanded. Only applies to smallScreen variant.
   * @default true
   */
  initiallyExpanded?: boolean;
  /** Navigation component heading text */
  heading: string;
  /** Custom classname to extend or customize */
  className?: string;
}

const baseClassName = 'fi-wizard-navigation';
const smallScreenClassName = `${baseClassName}--small-screen`;
const dividerClassName = `${baseClassName}_divider`;
const listClassName = `${baseClassName}_list`;
const headingClassName = `${baseClassName}_heading`;

const BaseWizardNavigation = ({
  children,
  variant,
  initiallyExpanded,
  heading,
  className,
}: WizardNavigationProps) => {
  const initiallyExpandedValue =
    initiallyExpanded !== undefined ? initiallyExpanded : true;
  const [smallScreenNavOpen, setSmallScreenNavOpen] = useState(
    initiallyExpandedValue,
  );
  return (
    <HtmlDiv
      className={classnames(baseClassName, className, {
        [smallScreenClassName]: variant === 'smallScreen',
      })}
    >
      {variant === 'smallScreen' ? (
        <HtmlButton
          className={headingClassName}
          onClick={() => setSmallScreenNavOpen(!smallScreenNavOpen)}
          aria-expanded={smallScreenNavOpen}
        >
          {heading}
          <Icon icon={smallScreenNavOpen ? 'chevronDown' : 'chevronRight'} />
        </HtmlButton>
      ) : (
        <HtmlDiv className={headingClassName}>{heading}</HtmlDiv>
      )}
      {((variant === 'smallScreen' && smallScreenNavOpen) ||
        variant !== 'smallScreen') && (
        <HtmlNav>
          <HtmlDiv className={dividerClassName} />
          <HtmlUl className={listClassName}>{children}</HtmlUl>
        </HtmlNav>
      )}
    </HtmlDiv>
  );
};

const StyledWizardNavigation = styled(BaseWizardNavigation)`
  ${({ theme }) => baseStyles(theme)}
`;

const WizardNavigation = (props: WizardNavigationProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledWizardNavigation theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

WizardNavigation.displayName = 'WizardNavigation';
export { WizardNavigation };
