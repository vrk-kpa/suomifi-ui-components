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

export interface ServiceNavigationProps {
  /** Use the `<ServiceNavigationItem>` components as children */
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
  /** When using smallScreen variant, this is the text showed in the expander button.
   * Intended to be the same text as the currently selected nav item.  */
  smallScreenExpandButtonText?: string | ReactNode;
  /** Custom classname to extend or customize */
  className?: string;
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLDivElement>;
}

const baseClassName = 'fi-service-navigation';
const smallScreenClassName = `${baseClassName}--small-screen`;
const listClassName = `${baseClassName}_list`;
const smallScreenExpandButtonClassName = `${baseClassName}_expand-button`;

const BaseServiceNavigation = ({
  children,
  variant,
  initiallyExpanded,
  smallScreenExpandButtonText,
  className,
  forwardedRef,
}: ServiceNavigationProps & InnerRef) => {
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
        <HtmlNav forwardedRef={forwardedRef}>
          <HtmlUl className={listClassName}>{children}</HtmlUl>
        </HtmlNav>
      )}
    </HtmlDiv>
  );
};

const StyledServiceNavigation = styled(
  (props: ServiceNavigationProps & InnerRef & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseServiceNavigation {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ServiceNavigation = forwardRef(
  (props: ServiceNavigationProps, ref: React.RefObject<HTMLDivElement>) => (
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
