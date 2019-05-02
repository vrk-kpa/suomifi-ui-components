import React, { Component, ReactNode } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils/defaultTheme';
import { ThemeComponent, ThemeProp } from '../theme';
import {
  PanelExpansionGroup as CompPanelExpansionGroup,
  PanelExpansionGroupProps as CompPanelExpansionGroupProps,
} from '../../components/Panel/PanelExpansionGroup';
import { Button } from '../Button/Button';
import { baseStyles } from './PanelExpansionGroup.baseStyles';

export interface PanelExpansionGroupProps
  extends CompPanelExpansionGroupProps,
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
}: {
  children: ReactNode;
  theme: ThemeProp;
}) => <Button.unstyled theme={theme}>{children}</Button.unstyled>;

/**
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
