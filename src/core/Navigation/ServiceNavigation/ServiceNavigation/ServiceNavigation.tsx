import React, { forwardRef, ReactNode, useState } from 'react';
import {
  HtmlButton,
  HtmlDiv,
  HtmlDivProps,
  HtmlNav,
  HtmlSpan,
  HtmlUl,
} from '../../../../reset';
import { styled } from 'styled-components';
import { IconChevronDown, IconChevronRight } from 'suomifi-icons';
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
import { baseStyles } from './ServiceNavigation.baseStyles';
import classnames from 'classnames';
import { filterDuplicateKeys } from '../../../../utils/common/common';

export interface ServiceNavigationProps extends MarginProps, HtmlDivProps {
  /** Use `<ServiceNavigationItem>` components as children */
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
   * Initial expand status of the menu. Only applies to the smallScreen variant
   * @default true
   */
  initiallyExpanded?: boolean;
  /** When using the smallScreen variant, this is the text showed in the expander button */
  smallScreenExpandButtonText?: string | ReactNode;
  /** CSS class for custom styles */
  className?: string;
  /** Ref is forwarded to the nav element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLElement>;
}

const baseClassName = 'fi-service-navigation';
const smallScreenClassName = `${baseClassName}--small-screen`;
const listClassName = `${baseClassName}_list`;
const smallScreenExpandButtonClassName = `${baseClassName}_expand-button`;
const buttonTextClassName = `${baseClassName}_expand-button_text-wrapper`;

const BaseServiceNavigation = ({
  children,
  'aria-label': ariaLabel,
  id,
  variant,
  initiallyExpanded,
  smallScreenExpandButtonText,
  className,
  forwardedRef,
  style,
  ...rest
}: ServiceNavigationProps) => {
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
      {variant === 'smallScreen' && (
        <HtmlButton
          className={smallScreenExpandButtonClassName}
          onClick={() => setSmallScreenNavOpen(!smallScreenNavOpen)}
          aria-expanded={smallScreenNavOpen}
        >
          <HtmlSpan className={buttonTextClassName}>
            {smallScreenExpandButtonText}
          </HtmlSpan>
          {smallScreenNavOpen ? <IconChevronDown /> : <IconChevronRight />}
        </HtmlButton>
      )}
      {((variant === 'smallScreen' && smallScreenNavOpen) ||
        variant !== 'smallScreen') && (
        <HtmlNav
          forwardedRef={forwardedRef}
          id={id}
          {...getConditionalAriaProp('aria-label', [ariaLabel])}
        >
          <HtmlUl className={listClassName} role="list">
            {children}
          </HtmlUl>
        </HtmlNav>
      )}
    </HtmlDiv>
  );
};

const StyledServiceNavigation = styled(
  (props: ServiceNavigationProps & SuomifiThemeProp & GlobalMarginProps) => {
    const { theme, globalMargins, ...passProps } = props;
    return <BaseServiceNavigation {...passProps} />;
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.serviceNavigation,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const ServiceNavigation = forwardRef(
  (props: ServiceNavigationProps, ref: React.Ref<HTMLElement>) => (
    <SpacingConsumer>
      {({ margins }) => (
        <SuomifiThemeConsumer>
          {({ suomifiTheme }) => (
            <StyledServiceNavigation
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

ServiceNavigation.displayName = 'ServiceNavigation';
export { ServiceNavigation };
