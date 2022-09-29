import React, { forwardRef, ReactNode, useState } from 'react';
import { HtmlButton, HtmlDiv, HtmlNav, HtmlUl } from '../../../../reset';
import styled from 'styled-components';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../theme';
import { baseStyles } from './WizardNavigation.baseStyles';
import classnames from 'classnames';
import { Icon } from '../../../Icon/Icon';
import { getConditionalAriaProp } from '../../../../utils/aria';

export interface WizardNavigationProps {
  /** Use the `<WizardNavigationItem>` components as children */
  children: ReactNode;
  /** Name for the navigation element. Don't use the word "navigation" since it will be read by screen reader regardless. */
  'aria-label': string;
  /** ID for the HTML nav element */
  id?: string;
  /**
   * Normal or small screen variant
   * @default normal
   */
  variant?: 'default' | 'smallScreen';
  /**
   * Initial expand status for the menu. Only applies to smallScreen variant
   * @default true
   */
  initiallyExpanded?: boolean;
  /** Navigation component heading text */
  heading: string;
  /** Custom classname to extend or customize */
  className?: string;
  /** Ref is forwarded to nav element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLElement>;
}

const baseClassName = 'fi-wizard-navigation';
const smallScreenClassName = `${baseClassName}--small-screen`;
const dividerClassName = `${baseClassName}_divider`;
const listClassName = `${baseClassName}_list`;
const headingClassName = `${baseClassName}_heading`;

const BaseWizardNavigation = ({
  children,
  'aria-label': ariaLabel,
  id,
  variant,
  initiallyExpanded,
  heading,
  className,
  forwardedRef,
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
        <HtmlNav
          forwardedRef={forwardedRef}
          id={id}
          {...getConditionalAriaProp('aria-label', [ariaLabel])}
        >
          <HtmlDiv className={dividerClassName} />
          <HtmlUl className={listClassName}>{children}</HtmlUl>
        </HtmlNav>
      )}
    </HtmlDiv>
  );
};

const StyledWizardNavigation = styled(
  (props: WizardNavigationProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseWizardNavigation {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const WizardNavigation = forwardRef(
  (props: WizardNavigationProps, ref: React.Ref<HTMLElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledWizardNavigation
          theme={suomifiTheme}
          forwardedRef={ref}
          {...props}
        />
      )}
    </SuomifiThemeConsumer>
  ),
);

WizardNavigation.displayName = 'WizardNavigation';
export { WizardNavigation };
