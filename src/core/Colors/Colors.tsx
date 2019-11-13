import React, { Component, ReactNode } from 'react';
import { withSuomifiDefaultProps } from '../theme/utils';
import { hslaToHex } from '../../utils/css';
import { default as styled } from 'styled-components';
import { TokensProp, InternalTokensProp } from '../theme';
import { baseStyles, containerStyles } from './Colors.baseStyles';
import clipboardCopy from 'clipboard-copy';

export interface ColorsProps extends TokensProp {
  colors?: {
    [key: string]: string;
  };
}

export interface ColorProps extends TokensProp {
  keyName: string;
  color: string;
  children?: ReactNode;
}

const Color = styled.div`
  ${(props: ColorProps & InternalTokensProp) => baseStyles(props)};
`;

const ColorsContainer = styled.div`
  ${containerStyles};
`;

const copyKey = (key: string) => () => clipboardCopy(key);

export class Colors extends Component<ColorsProps> {
  render() {
    const { colors } = this.props;
    const props = withSuomifiDefaultProps(this.props);
    const useColors = !!colors ? colors : props.tokens.colors;
    return (
      <ColorsContainer>
        {Object.entries(useColors).reduce<JSX.Element[]>(
          (arr, [key, value]) => {
            const color = value.hsl;
            const hslaAsHex = hslaToHex(color);
            const item = (
              <Color
                keyName={key.toString()}
                color={color}
                key={key.toString()}
                onClick={copyKey(key.toString())}
                {...props}
              >
                <div className="fi-color__name">{color}</div>
                {!!hslaAsHex && (
                  <div className="fi-color__name fi-color__name--hex">
                    {hslaAsHex}
                  </div>
                )}
                <div className="fi-color__name fi-color__name--key">
                  {key.toString()}
                </div>
              </Color>
            );
            return [...arr, item];
          },
          [],
        )}
      </ColorsContainer>
    );
  }
}
