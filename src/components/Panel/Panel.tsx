import React, { Component, ReactNode } from 'react';
import styled from '@emotion/styled';
import { HtmlDiv, HtmlDivProps } from '../../reset';
import classnames from 'classnames';

export const baseClassName = 'fi-panel';

export const StyledPanel = styled((props: HtmlDivProps) => (
  <HtmlDiv {...props} />
))`
  display: block;
  width: 100%;
  max-width: 100%;
`;

export interface PanelProps {
  /** Custom classname to extend or customize */
  className?: string;
  /**
   * Panel element content
   */
  children?: ReactNode;
}

export class Panel extends Component<PanelProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <StyledPanel
        {...passProps}
        className={classnames(className, baseClassName)}
      />
    );
  }
}
