import React, { Component } from 'react';
import styled from '@emotion/styled';
import { defaultPropsTheme } from '../utils';
import { ThemeComponent } from '../theme';
import { baseStyles } from './Panel.baseStyles';
import {
  Panel as CompPanel,
  PanelProps as CompPanelProps,
} from '../../components/Panel/Panel';
import { PanelExpansion, PanelExpansionProps } from './PanelExpansion';

type PanelVariant = 'default' | 'expansion';

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
  label: panel;
  ${props => baseStyles(props)};
`;

/**
 * Used for panel style and defined actions
 */
export class Panel extends Component<PanelProps> {
  static defaultProps = defaultPropsTheme(CompPanel);

  static expansion = (props: PanelExpansionProps) => {
    return <PanelExpansion {...props} />;
  };

  render() {
    const { variant, ...passProps } = this.props;
    return variant === 'expansion' ? (
      <PanelExpansion {...passProps} />
    ) : (
      <StyledPanel {...passProps} />
    );
  }
}
