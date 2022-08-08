import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlLi } from '../../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../../theme';
import { baseStyles } from './ServiceNavigationItem.baseStyles';
import styled from 'styled-components';

interface BasicServiceNavigationItemProps {
  /** Custom class */
  className?: string;
  /** Use the polymorphic RouterLink component as child to get intended CSS styling */
  children: ReactNode;
  /** Disable the item */
  disabled?: boolean;
}

type SeletedProps =
  | {
      /** Show item as the selected one */
      selected: boolean;
      /** Selected item information for screen reader. Required when `selected` is true */
      ariaCurrent: 'step' | 'page' | 'location';
    }
  | {
      selected?: never;
      ariaCurrent?: never;
    };

export type ServiceNavigationItemProps = BasicServiceNavigationItemProps &
  SeletedProps;

const baseClassName = 'fi-service-navigation-item';
const selectedClassName = `${baseClassName}--selected`;
const disabledClassName = `${baseClassName}--disabled`;

const BaseServiceNavigationItem = ({
  selected,
  ariaCurrent,
  className,
  children,
  disabled,
  ...passProps
}: ServiceNavigationItemProps) => (
  <HtmlLi
    className={classnames(className, {
      [baseClassName]: !selected,
      [selectedClassName]: selected,
      [disabledClassName]: disabled,
    })}
    aria-current={!!ariaCurrent ? ariaCurrent : undefined}
    aria-disabled={disabled}
    {...passProps}
  >
    {children}
  </HtmlLi>
);

const StyledServiceNavigationItem = styled(
  (props: ServiceNavigationItemProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseServiceNavigationItem {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ServiceNavigationItem = (props: ServiceNavigationItemProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledServiceNavigationItem theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

ServiceNavigationItem.displayName = 'ServiceNavigationItem';
export { ServiceNavigationItem };
