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
import { baseStyles } from './ServiceNavigation.baseStyles';
import classnames from 'classnames';
import { Icon } from '../../../Icon/Icon';
import { getConditionalAriaProp } from '../../../../utils/aria';

export interface ServiceNavigationProps {
  /** Use the `<ServiceNavigationItem>` components as children */
  children: ReactNode;
  /** Name for the navigation element. Don't use the word "navigation" since it will be read by screen reader regardless. */
  'aria-label': string;
  /** HTML nav element will receive this id */
  id?: string;
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
  /** When using smallScreen variant, this is the text showed in the expander button */
  smallScreenExpandButtonText?: string | ReactNode;
  /** Custom classname to extend or customize */
  className?: string;
  /** Ref is forwarded to nav element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLElement>;
}

const baseClassName = 'fi-service-navigation';
const smallScreenClassName = `${baseClassName}--small-screen`;
const listClassName = `${baseClassName}_list`;
const smallScreenExpandButtonClassName = `${baseClassName}_expand-button`;

const BaseServiceNavigation = ({
  children,
  'aria-label': ariaLabel,
  id,
  variant,
  initiallyExpanded,
  smallScreenExpandButtonText,
  className,
  forwardedRef,
}: ServiceNavigationProps) => {
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
      {variant === 'smallScreen' && (
        <HtmlButton
          className={smallScreenExpandButtonClassName}
          onClick={() => setSmallScreenNavOpen(!smallScreenNavOpen)}
          aria-expanded={smallScreenNavOpen}
        >
          <HtmlSpan
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {smallScreenExpandButtonText}
          </HtmlSpan>
          <Icon icon={smallScreenNavOpen ? 'chevronDown' : 'chevronRight'} />
        </HtmlButton>
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

const StyledServiceNavigation = styled(
  (props: ServiceNavigationProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseServiceNavigation {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ServiceNavigation = forwardRef(
  (props: ServiceNavigationProps, ref: React.Ref<HTMLElement>) => (
    <SuomifiThemeConsumer>
      {({ suomifiTheme }) => (
        <StyledServiceNavigation
          theme={suomifiTheme}
          forwardedRef={ref}
          {...props}
        />
      )}
    </SuomifiThemeConsumer>
  ),
);

ServiceNavigation.displayName = 'ServiceNavigation';
export { ServiceNavigation };
