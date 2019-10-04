import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensComponent } from '../theme';
import {
  PanelExpansionGroup as CompPanelExpansionGroup,
  PanelExpansionGroupProps as CompPanelExpansionGroupProps,
} from '../../components/Panel/PanelExpansionGroup';
import { Button, ButtonProps } from '../Button/Button';
import { baseStyles } from './PanelExpansionGroup.baseStyles';

const openAllButtonClassName = 'fi-panel-expansion-group_all-button';

export interface PanelExpansionGroupProps
  extends CompPanelExpansionGroupProps,
    TokensComponent {}

interface PanelExpansionOpenAllButtonProps
  extends ButtonProps,
    TokensComponent {}

const StyledPanelExpansionGroup = styled(
  ({ tokens, ...passProps }: PanelExpansionGroupProps) => (
    <CompPanelExpansionGroup {...passProps} />
  ),
)`
  ${props => baseStyles(props)};
`;

const OpenAllButton = ({
  children,
  ...passProps
}: PanelExpansionOpenAllButtonProps) => (
  <Button.unstyled {...passProps} className={openAllButtonClassName}>
    {children}
  </Button.unstyled>
);

/**
 * <i class="semantics" />
 * Used for grouping expansion panels
 */
export class PanelExpansionGroup extends Component<PanelExpansionGroupProps> {
  render() {
    const { OpenAll, CloseAll, ...passProps } = withSuomifiDefaultProps(
      this.props,
    );
    return (
      <StyledPanelExpansionGroup
        {...passProps}
        OpenAll={
          <OpenAllButton tokens={passProps.tokens}>{OpenAll}</OpenAllButton>
        }
        CloseAll={
          <OpenAllButton tokens={passProps.tokens}>{CloseAll}</OpenAllButton>
        }
      />
    );
  }
}
