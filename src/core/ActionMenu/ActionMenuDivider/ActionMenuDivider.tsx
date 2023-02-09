import React from 'react';

import { HtmlDiv } from '../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './ActionMenuDivider.baseStyles';
import styled from 'styled-components';

export interface ActionMenuDividerProps {
  /** Custom class */
  className?: string;

  /** Toggle to show item as the selected one */
  selected?: boolean;
  /** Disables the item */
  disabled?: boolean;
}

const baseClassName = 'fi-action-menu_divider';

const BaseActionMenuDivider = ({
  selected,
  className,
  disabled,
  ...passProps
}: ActionMenuDividerProps) => (
  <HtmlDiv className={baseClassName} {...passProps}>
    sdfsdfsdf
  </HtmlDiv>
);

const StyledActionMenuDivider = styled(
  (props: ActionMenuDividerProps & SuomifiThemeProp) => {
    const { theme, ...passProps } = props;
    return <BaseActionMenuDivider {...passProps} />;
  },
)`
  ${({ theme }) => baseStyles(theme)}
`;

const ActionMenuDivider = (props: ActionMenuDividerProps) => (
  <SuomifiThemeConsumer>
    {({ suomifiTheme }) => (
      <StyledActionMenuDivider theme={suomifiTheme} {...props} />
    )}
  </SuomifiThemeConsumer>
);

ActionMenuDivider.displayName = 'ActionMenuDivider';
export { ActionMenuDivider };
