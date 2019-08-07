import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent } from '../theme';
import {
  PanelExpansionGroup as CompPanelExpansionGroup,
  PanelExpansionGroupProps as CompPanelExpansionGroupProps,
} from '../../components/Panel/PanelExpansionGroup';
import { Button, ButtonProps } from '../Button/Button';
import { baseStyles } from './PanelExpansionGroup.baseStyles';

const openAllButtonClassName = 'fi-panel-expansion-group_all-button';

export interface PanelExpansionGroupProps
  extends CompPanelExpansionGroupProps,
    ThemeComponent {}

interface PanelExpansionOpenAllButtonProps
  extends ButtonProps,
    ThemeComponent {}

const StyledPanelExpansionGroup = styled(
  ({ theme, ...passProps }: PanelExpansionGroupProps) => (
    <CompPanelExpansionGroup {...passProps} />
  ),
)`
  ${props => baseStyles(props)};
`;

const OpenAllButton = ({
  children,
  theme,
  ...passProps
}: PanelExpansionOpenAllButtonProps) => (
  <Button.unstyled
    {...passProps}
    theme={theme}
    className={openAllButtonClassName}
  >
    {children}
  </Button.unstyled>
);

/**
 * <i class="semantics" />
 * Used for grouping expansion panels
 */
export class PanelExpansionGroup extends Component<PanelExpansionGroupProps> {
  render() {
    const { OpenAll, CloseAll, ...passProps } = withDefaultTheme(this.props);
    return (
      <StyledPanelExpansionGroup
        {...passProps}
        OpenAll={
          <OpenAllButton theme={passProps.theme}>{OpenAll}</OpenAllButton>
        }
        CloseAll={
          <OpenAllButton theme={passProps.theme}>{CloseAll}</OpenAllButton>
        }
      />
    );
  }
}
