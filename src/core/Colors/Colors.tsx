import React, { Component, ReactNode } from 'react';
import { defaultPropsTheme } from '../utils';
import styled from '@emotion/styled';
import { ThemeComponent } from '../theme';
import { baseStyles } from './Colors.baseStyles';

interface ColorInterface {
  keyName: string;
  color: string;
  children?: ReactNode;
}

const Color = styled.div`
  label: ${(p: ColorInterface) => `fi-color-${p.keyName}`};
  ${(p: ColorInterface) => baseStyles(p.color)};
`;

export class Colors extends Component<ThemeComponent> {
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
            <div className="fi-color__name">{value.toString()}</div>
            <div className="fi-color__name">{key.toString()}</div>
          </Color>
        );
        return [...arr, test];
      },
      [],
    );
  }
}
