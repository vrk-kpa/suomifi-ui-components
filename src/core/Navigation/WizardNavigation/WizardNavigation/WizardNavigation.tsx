import React, { forwardRef, ReactNode, useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { IconChevronDown, IconChevronRight } from 'suomifi-icons';
import { HtmlButton, HtmlDiv, HtmlNav, HtmlUl } from '../../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../theme';
import { getConditionalAriaProp } from '../../../../utils/aria';
import { baseStyles } from './WizardNavigation.baseStyles';

export interface WizardNavigationProps {
  /** Use `<WizardNavigationItem>` components as children */
  children: ReactNode;
  /** Name for the navigation element. Don't use the word "navigation" since it will be read by screen readers regardless. */
  'aria-label': string;
  /** HTML id attribute for the `<nav>` element. Typically used together with a `<SkipLink>` to quickly move to the nav */
  id?: string;
  /**
   * Variant of the component
   * @default normal
   */
  variant?: 'default' | 'smallScreen';
  /**
   * Initial expand status for the menu. Only applies to the smallScreen variant
   * @default true
   */
  initiallyExpanded?: boolean;
  /** Heading text */
  heading: string;
  /** CSS class for custom styles */
  className?: string;
  /** Ref is forwarded to the nav element. Alternative for React `ref` attribute. */
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
          {smallScreenNavOpen ? <IconChevronDown /> : <IconChevronRight />}
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
          <HtmlUl className={listClassName} role="list">
            {children}
          </HtmlUl>
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
