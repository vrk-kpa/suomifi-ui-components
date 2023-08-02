import React, { forwardRef, ReactNode, useState, ReactElement } from 'react';
import {
  HtmlButton,
  HtmlDiv,
  HtmlNav,
  HtmlSpan,
  HtmlUl,
} from '../../../../reset';
import styled from 'styled-components';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../theme';
import { baseStyles } from './SideNavigation.baseStyles';
import classnames from 'classnames';
import { getConditionalAriaProp } from '../../../../utils/aria';
import { IconChevronDown, IconChevronUp } from 'suomifi-icons';

export interface SideNavigationProps {
  /** Use `<SideNavigationItem>` components as children */
  children: ReactNode;
  /** Name for the navigation element. Don't use the word "navigation" since it will be read by screen readers regardless */
  'aria-label': string;
  /** HTML id attribute for the `<nav>` element. Typically used together with a `<SkipLink>` to quickly move to the nav */
  id?: string;
  /**
   * Component variant. `'smallScreen'` allows the navigation to be collapsed/expanded with a toggle button
   * @default normal
   */
  variant?: 'default' | 'smallScreen';
  /**
   * Initial expand status of the menu. Only applies to the smallScreen variant
   * @default true
   */
  initiallyExpanded?: boolean;
  /** Heading text */
  heading: string;
  /** Icon in the nav heading */
  icon?: ReactElement;
  /* Custom classname to extend or customize */
  className?: string;
  /** Ref is forwarded to the nav element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLElement>;
}

const baseClassName = 'fi-side-navigation';
const smallScreenClassName = `${baseClassName}--small-screen`;
const listClassName = `${baseClassName}_list`;
const headingClassName = `${baseClassName}_heading`;
const headingInnerWrapperClassName = `${baseClassName}_heading_inner`;
const dividerClassName = `${baseClassName}_divider`;

const BaseSideNavigation = ({
  children,
  'aria-label': ariaLabel,
  id,
  variant,
  initiallyExpanded,
  heading,
  icon,
  className,
  forwardedRef,
}: SideNavigationProps) => {
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
          <HtmlSpan className={headingInnerWrapperClassName}>
            {icon}
            {heading}
          </HtmlSpan>
          {smallScreenNavOpen ? <IconChevronUp /> : <IconChevronDown />}
        </HtmlButton>
      ) : (
        <HtmlDiv className={headingClassName}>
          <HtmlSpan className={headingInnerWrapperClassName}>
            {icon}
            {heading}
          </HtmlSpan>
        </HtmlDiv>
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

const StyledSideNavigation = styled(
  (props: SideNavigationProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseSideNavigation {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const SideNavigation = forwardRef(
  (props: SideNavigationProps, ref: React.Ref<HTMLElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledSideNavigation
          theme={suomifiTheme}
          forwardedRef={ref}
          {...props}
        />
      )}
    </SuomifiThemeConsumer>
  ),
);

SideNavigation.displayName = 'SideNavigation';
export { SideNavigation };
