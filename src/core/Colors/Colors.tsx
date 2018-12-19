import React, { Component, ReactNode } from 'react';
import { defaultPropsTheme } from '../utils';
import styled from '@emotion/styled';
import { IThemeComponent } from '../theme';
import { baseStyles } from './Colors.baseStyles';

interface IColor {
  keyName: string;
  color: string;
  children?: ReactNode;
}

const Color = styled.div`
  label: ${(p: IColor) => `fi-color-${p.keyName}`};
  ${(p: IColor) => baseStyles(p.color)};
`;

export default class Colors extends Component<IThemeComponent> {
  static defaultProps = defaultPropsTheme();

  render() {
    const { theme: { colors: themeColors = {} } = {} } = this.props;
    return Object.entries(themeColors).reduce<JSX.Element[]>(
      (arr, [key, value]) => {
        const test = (
          <Color
            keyName={key.toString()}
            color={value.toString()}
            key={key.toString()}
          >
            <span className="fi-color__name">{key.toString()}</span>
          </Color>
        );
        return [...arr, test];
      },
      [],
    );
  }
}
