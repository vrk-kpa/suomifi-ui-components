import React, { Component, ReactNode } from 'react';
import { withSuomifiDefaultProps } from '../theme/utils';
import { hslaToHex } from '../../utils/css/colors';
import { default as styled } from 'styled-components';
import { TokensComponent, SuomifiThemeProp } from '../theme';
import { baseStyles, containerStyles } from './Colors.baseStyles';
import clipboardCopy from 'clipboard-copy';

export interface ColorsProps extends TokensComponent {
  colors?: {
    [key: string]: string;
  };
}

export interface ColorProps extends TokensComponent {
  keyName: string;
  color: string;
  children?: ReactNode;
}

const Color = styled.div`
  ${(props: ColorProps & SuomifiThemeProp) => baseStyles(props)};
`;

const ColorsContainer = styled.div`
  ${containerStyles};
`;

const copyKey = (key: string) => () => clipboardCopy(key);

export class Colors extends Component<ColorsProps> {
  render() {
    const { colors } = this.props;
    const props = withSuomifiDefaultProps(this.props);
    return (
      <ColorsContainer>
        {Object.entries(!!colors ? colors : props.tokens.colors).reduce<
          JSX.Element[]
        >((arr, [key, value]) => {
          const hslaAsHex = hslaToHex(value.toString());
          const item = (
            <Color
              keyName={key.toString()}
              color={value.toString()}
              key={key.toString()}
              onClick={copyKey(key.toString())}
              {...props}
            >
              <div className="fi-color__name">{value.toString()}</div>
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
        }, [])}
      </ColorsContainer>
    );
  }
}
