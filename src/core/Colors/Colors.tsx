import React, { Component, ReactNode } from 'react';
import { withDefaultTheme } from '../theme/utils/defaultTheme';
import styled from '@emotion/styled';
import { ThemeComponent } from '../theme';
import { baseStyles } from './Colors.baseStyles';

export interface ColorsProps extends ThemeComponent {
  colors?: {
    [key: string]: string;
  };
}

interface ColorInterface {
  keyName: string;
  color: string;
  children?: ReactNode;
}

const Color = styled.div`
  ${({ color }: ColorInterface) => baseStyles(color)};
`;

const themeColors = (props: ColorsProps) => {
  const {
    theme: { colors: themeColors },
  } = withDefaultTheme(props);
  return themeColors;
};

export class Colors extends Component<ColorsProps> {
  render() {
    const { colors } = this.props;
    return Object.entries(!!colors ? colors : themeColors(this.props)).reduce<
      JSX.Element[]
    >((arr, [key, value]) => {
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
    }, []);
  }
}
