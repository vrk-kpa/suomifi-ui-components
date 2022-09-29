import React, { forwardRef, ReactNode, useState } from 'react';
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
import { Icon } from '../../../Icon/Icon';
import {
  StaticIcon,
  IllustrativeIconKeys,
  DoctypeIconKeys,
} from '../../../StaticIcon/StaticIcon';
import { getConditionalAriaProp } from '../../../../utils/aria';

export interface SideNavigationProps {
  /** Use the `<SideNavigationItem>` components as children */
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
  /** Icon in the nav heading. Options include suomi.fi static icons. */
  icon?: IllustrativeIconKeys | DoctypeIconKeys;
  /* Custom class to extend or customise */
  className?: string;
  /** Ref is forwarded to nav element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLElement>;
}

const baseClassName = 'fi-side-navigation';
const smallScreenClassName = `${baseClassName}--small-screen`;
const listClassName = `${baseClassName}_list`;
const headingClassName = `${baseClassName}_heading`;
const headingInnerWrapperClassName = `${baseClassName}_heading_inner`;

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
            {!!icon && <StaticIcon icon={icon} />}
            {heading}
          </HtmlSpan>
          <Icon icon={smallScreenNavOpen ? 'chevronDown' : 'chevronRight'} />
        </HtmlButton>
      ) : (
        <HtmlDiv className={headingClassName}>
          <HtmlSpan className={headingInnerWrapperClassName}>
            {!!icon && <StaticIcon icon={icon} />}
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
