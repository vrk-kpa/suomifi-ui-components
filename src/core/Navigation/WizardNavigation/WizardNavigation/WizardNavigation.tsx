import React, { forwardRef, ReactNode, useState } from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { IconChevronDown, IconChevronRight } from 'suomifi-icons';
import {
  HtmlButton,
  HtmlDiv,
  HtmlDivProps,
  HtmlNav,
  HtmlUl,
} from '../../../../reset';
import {
  SpacingConsumer,
  SuomifiThemeConsumer,
  SuomifiThemeProp,
} from '../../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../../theme/utils/spacing';
import { getConditionalAriaProp } from '../../../../utils/aria';
import { baseStyles } from './WizardNavigation.baseStyles';
import { filterDuplicateKeys } from '../../../../utils/common/common';

export interface WizardNavigationProps extends MarginProps, HtmlDivProps {
  /** Use `<WizardNavigationItem>` components as children */
  children: ReactNode;
  /** Name for the navigation element. Don't use the word "navigation" since it will be read by screen readers regardless. */
  'aria-label': string;
  /** HTML id attribute for the `<nav>` element. Typically used together with a `<SkipLink>` to quickly move to the nav */
  id?: string;
  /**
   * Component variant. `'smallScreen'` allows the navigation to be collapsed/expanded with a toggle button
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
  style,
  ...rest
}: WizardNavigationProps) => {
  const [_marginProps, passProps] = separateMarginProps(rest);

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
      style={style}
      {...passProps}
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
  (props: WizardNavigationProps & SuomifiThemeProp & GlobalMarginProps) => {
    const { theme, globalMargins, ...passProps } = props;
    return <BaseWizardNavigation {...passProps} />;
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.wizardNavigation,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const WizardNavigation = forwardRef(
  (props: WizardNavigationProps, ref: React.Ref<HTMLElement>) => (
    <SpacingConsumer>
      {({ margins }) => (
        <SuomifiThemeConsumer>
          {({ suomifiTheme }) => (
            <StyledWizardNavigation
              theme={suomifiTheme}
              globalMargins={margins}
              forwardedRef={ref}
              {...props}
            />
          )}
        </SuomifiThemeConsumer>
      )}
    </SpacingConsumer>
  ),
);

WizardNavigation.displayName = 'WizardNavigation';
export { WizardNavigation };
