import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import { withSuomifiDefaultProps } from '../theme/utils';
import { TokensProp, DefinedTokensProp } from '../theme';
import { baseStyles } from './Panel.baseStyles';
import {
  Panel as CompPanel,
  PanelProps as CompPanelProps,
} from '../../components/Panel/Panel';
import { PanelExpansion, PanelExpansionProps } from './PanelExpansion';
import {
  PanelExpansionGroup,
  PanelExpansionGroupProps,
} from './PanelExpansionGroup';

type PanelVariant = 'default' | 'expansion' | 'expansionGroup';

export interface PanelProps extends CompPanelProps, TokensProp {
  /**
   * 'default' | 'expansion'
   * @default default
   */
  variant?: PanelVariant;
}

const StyledPanel = styled(
  ({ tokens, ...passProps }: PanelProps & DefinedTokensProp) => (
    <CompPanel {...passProps} />
  ),
)`
  ${props => baseStyles(props)};
`;

type VariantPanelProps =
  | PanelProps
  | PanelExpansionProps & { variant?: PanelVariant }
  | PanelExpansionGroupProps & { variant?: PanelVariant };

/**
 * Used for panel style and defined actions
 */
export class Panel extends Component<VariantPanelProps> {
  static expansion = (props: PanelExpansionProps) => {
    return <PanelExpansion {...withSuomifiDefaultProps(props)} />;
  };

  static expansionGroup = (props: PanelExpansionGroupProps) => {
    return <PanelExpansionGroup {...withSuomifiDefaultProps(props)} />;
  };

  render() {
    const { variant, ...passProps } = withSuomifiDefaultProps(this.props);
    if (variant === 'expansion' && 'title' in passProps) {
      return <PanelExpansion {...passProps as PanelExpansionProps} />;
    }
    if (variant === 'expansionGroup' && 'openAll' in passProps) {
      return <PanelExpansionGroup {...passProps as PanelExpansionGroupProps} />;
    }
    return <StyledPanel {...passProps} />;
  }
}
