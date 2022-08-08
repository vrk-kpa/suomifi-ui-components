import React, { ReactNode } from 'react';
import { HtmlNav, HtmlUl } from '../../../../reset';
import styled from 'styled-components';
import { SuomifiThemeConsumer } from '../../../theme';
import { baseStyles } from './ServiceNavigation.baseStyles';
import classnames from 'classnames';

export interface ServiceNavigationProps {
  children: ReactNode | ReactNode[];
  /**
   * Normal or small screen variant
   * @default normal
   */
  variant?: 'normal' | 'smallScreen';
  /** Custom classname to extend or customize */
  className?: string;
}

const baseClassName = 'fi-service-navigation';
const listClassName = `${baseClassName}_list`;

const BaseServiceNavigation = ({
  children,
  variant,
  className,
}: ServiceNavigationProps) => (
  // Throws TS error without fragments
  /* eslint-disable react/jsx-no-useless-fragment */
  <>
    {variant === 'smallScreen' ? (
      <div>Nope</div>
    ) : (
      <HtmlNav className={classnames(baseClassName, className)}>
        <HtmlUl className={listClassName}>{children}</HtmlUl>
      </HtmlNav>
    )}
  </>
);

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
