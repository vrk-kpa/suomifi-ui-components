import React, { ReactNode, useState } from 'react';
import {
  HtmlButton,
  HtmlDiv,
  HtmlNav,
  HtmlSpan,
  HtmlUl,
} from '../../../../reset';
import styled from 'styled-components';
import { SuomifiThemeConsumer } from '../../../theme';
import { baseStyles } from './SideNavigation.baseStyles';
import classnames from 'classnames';
import { Icon } from '../../../Icon/Icon';
import {
  StaticIcon,
  IllustrativeIconKeys,
  DoctypeIconKeys,
} from '../../../StaticIcon/StaticIcon';

export interface SideNavigationProps {
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
  /** Icon in the nav heading. Options include suomifi static icons. */
  icon?: IllustrativeIconKeys | DoctypeIconKeys;
  /* Custom class to extend or customise */
  className?: string;
}

const baseClassName = 'fi-side-navigation';
const smallScreenClassName = `${baseClassName}--small-screen`;
const listClassName = `${baseClassName}_list`;
const headingClassName = `${baseClassName}_heading`;
const headingInnerWrapperClassName = `${baseClassName}_heading_inner`;

const BaseSideNavigation = ({
  children,
  variant,
  initiallyExpanded,
  heading,
  icon,
  className,
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
        <HtmlNav>
          <HtmlUl className={listClassName}>{children}</HtmlUl>
        </HtmlNav>
      )}
    </HtmlDiv>
  );
};

const StyledSideNavigation = styled(BaseSideNavigation)`
  ${({ theme }) => baseStyles(theme)}
`;

const SideNavigation = (props: SideNavigationProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledSideNavigation theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

SideNavigation.displayName = 'SideNavigation';
export { SideNavigation };
