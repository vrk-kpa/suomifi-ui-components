import React, { Component } from 'react';
import styled from '@emotion/styled';
import Svg, { ISvgProps } from '../Svg/Svg';

export interface IIconProps extends ISvgProps {
  /** data-testid attribute
   *  @default icon
   */
  testId?: string;
}

const StyledSvg = styled((props: ISvgProps) => <Svg {...props} />)`
  display: inline-block;
  width: 24px;
  height: 24px;
`;

export default class Icon extends Component<IIconProps> {
  static defaultProps = {
    testId: 'icon',
    labelName: 'icon',
  };

  render() {
    return <StyledSvg {...this.props} />;
  }
}
