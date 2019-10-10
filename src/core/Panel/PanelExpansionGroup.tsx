import React from 'react';
import { default as styled } from 'styled-components';
import { Omit } from '../../utils/typescript';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, DefinedTokensProp } from '../theme';
import {
  PanelExpansionGroup as CompPanelExpansionGroup,
  PanelExpansionGroupProps as CompPanelExpansionGroupProps,
} from '../../components/Panel/PanelExpansionGroup';
import { Button, ButtonProps } from '../Button/Button';
import { baseStyles } from './PanelExpansionGroup.baseStyles';

const openAllButtonClassName = 'fi-panel-expansion-group_all-button';

type ButtonOrText = React.ReactElement<ButtonProps> | string;
interface OpenCloseAll {
  /** 'Open all'-component (Button) */
  OpenAll: ButtonOrText;
  /** 'Close all'-component (Button) */
  CloseAll: ButtonOrText;
}
export interface PanelExpansionGroupProps
  extends Omit<CompPanelExpansionGroupProps, 'OpenAll' | 'CloseAll'>,
    TokensProp,
    OpenCloseAll {}

interface PanelExpansionOpenAllButtonProps extends ButtonProps, TokensProp {
  children: ButtonOrText;
}

const StyledPanelExpansionGroup = styled(
  ({
    tokens,
    ...passProps
  }: CompPanelExpansionGroupProps & DefinedTokensProp) => (
    <CompPanelExpansionGroup {...passProps} />
  ),
)`
  ${props => baseStyles(props)};
`;

const OpenAllButton = ({
  children,
  ...passProps
}: PanelExpansionOpenAllButtonProps) => {
  const Component = React.Children.toArray(children)[0];
  if (typeof Component === 'string' || Component.type !== Button) {
    return (
      <Button.unstyled {...passProps} className={openAllButtonClassName}>
        {children}
      </Button.unstyled>
    );
  }
  return Component;
};

/**
 * <i class="semantics" />
 * Used for grouping expansion panels
 */
export class PanelExpansionGroup extends React.Component<
  PanelExpansionGroupProps
> {
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
