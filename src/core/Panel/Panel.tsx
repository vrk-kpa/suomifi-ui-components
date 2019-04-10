import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils/defaultTheme';
import { ThemeComponent } from '../theme';
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

export interface PanelProps extends CompPanelProps, ThemeComponent {
  /**
   * 'default' | 'expansion'
   * @default default
   */
  variant?: PanelVariant;
}

const StyledPanel = styled(({ theme, ...passProps }: PanelProps) => (
  <CompPanel {...passProps} />
))`
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
    return <PanelExpansion {...props} />;
  };

  static expansionGroup = (props: PanelExpansionGroupProps) => {
    return <PanelExpansionGroup {...props} />;
  };

  render() {
    const { variant, ...passProps } = withDefaultTheme(this.props);
    if (variant === 'expansion') {
      return <PanelExpansion {...passProps as PanelExpansionProps} />;
    }
    if (variant === 'expansionGroup') {
      return <PanelExpansionGroup {...passProps as PanelExpansionGroupProps} />;
    }
    return <StyledPanel {...passProps} />;
  }
}
