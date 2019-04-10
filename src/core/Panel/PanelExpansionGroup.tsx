import React, { Component, ReactElement } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils/defaultTheme';
import { ThemeComponent } from '../theme';
import {
  PanelExpansionGroup as CompPanelExpansionGroup,
  PanelExpansionGroupProps as CompPanelExpansionGroupProps,
} from '../../components/Panel/PanelExpansionGroup';
import { Button, ButtonProps } from '../Button/Button';
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

const OpenAllButton = (children: ReactElement<ButtonProps>) => (
  <Button.unstyled>{children}</Button.unstyled>
);

/**
 * Used for panel style and defined actions
 */
export class PanelExpansionGroup extends Component<PanelExpansionGroupProps> {
  render() {
    const { OpenAll, CloseAll, ...passProps } = withDefaultTheme(this.props);
    return (
      <StyledPanelExpansionGroup
        {...passProps}
        OpenAll={OpenAllButton(OpenAll)}
        CloseAll={OpenAllButton(CloseAll)}
      />
    );
  }
}
