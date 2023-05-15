import React from 'react';
import classnames from 'classnames';
import { HtmlDiv } from '../../../reset';
import { SuomifiThemeConsumer, SuomifiThemeProp } from '../../theme';
import { baseStyles } from './ActionMenuDivider.baseStyles';
import styled from 'styled-components';

export interface ActionMenuDividerProps {
  /** Custom class */
  className?: string;
}

const baseClassName = 'fi-action-menu-divider';
const dividerClassName = `${baseClassName}_line`;

const BaseActionMenuDivider = ({
  className,
  ...passProps
}: ActionMenuDividerProps) => (
  <HtmlDiv
    aria-hidden="true"
    className={classnames(className, baseClassName)}
    {...passProps}
  >
    <HtmlDiv className={classnames(dividerClassName)} />
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
