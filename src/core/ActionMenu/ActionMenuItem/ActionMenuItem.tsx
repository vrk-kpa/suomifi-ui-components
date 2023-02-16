import React, { ReactNode } from 'react';
import classnames from 'classnames';
import { HtmlLi } from '../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './ActionMenuItem.baseStyles';
import styled from 'styled-components';

export interface ActionMenuItemProps {
  /** Custom class */
  className?: string;
  /** Use the polymorphic `<RouterLink>` component as child to get intended CSS styling */
  children: ReactNode;
  /** Toggle to show item as the selected one */
  selected?: boolean;
  /** Disables the item */
  disabled?: boolean;
}

const baseClassName = 'fi-service-navigation-item';
const selectedClassName = `${baseClassName}--selected`;
const disabledClassName = `${baseClassName}--disabled`;

const BaseActionMenuItem = ({
  selected,
  className,
  children,
  disabled,
  ...passProps
}: ActionMenuItemProps) => (
  <HtmlLi
    className={classnames(className, {
      [baseClassName]: !selected,
      [selectedClassName]: selected,
      [disabledClassName]: disabled,
    })}
    aria-disabled={disabled}
    {...passProps}
  >
    {children}
  </HtmlLi>
);

const StyledActionMenuItem = styled(
  (props: ActionMenuItemProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseActionMenuItem {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ActionMenuItem = (props: ActionMenuItemProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledActionMenuItem theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

ActionMenuItem.displayName = 'ActionMenuItem';
export { ActionMenuItem };
