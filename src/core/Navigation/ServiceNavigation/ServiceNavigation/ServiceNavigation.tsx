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
import { baseStyles } from './ServiceNavigation.baseStyles';
import classnames from 'classnames';
import { Icon } from '../../../Icon/Icon';

export interface ServiceNavigationProps {
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
        <HtmlNav>
          <HtmlUl className={listClassName}>{children}</HtmlUl>
        </HtmlNav>
      )}
    </HtmlDiv>
  );
};

const StyledServiceNavigation = styled(BaseServiceNavigation)`
  ${({ theme }) => baseStyles(theme)}
`;

const ServiceNavigation = (props: ServiceNavigationProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledServiceNavigation theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

ServiceNavigation.displayName = 'ServiceNavigation';
export { ServiceNavigation };
