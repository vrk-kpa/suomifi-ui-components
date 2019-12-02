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

const copyKey = (key: string) => () => clipboardCopy(key);

const onEnterPressed = (keyName: string) => (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    clipboardCopy(keyName);
  }
};

const StyledFigure = styled.figure`
  ${(props: ColorProps & InternalTokensProp) => baseStyles(props)};
`;

const ColorFigure = (props: ColorProps & InternalTokensProp) => {
  const { color, keyName } = props;
  const hslaAsHex = hslaToHex(color);

  return (
    <StyledFigure
      {...props}
      onClick={copyKey(keyName)}
      tabIndex={0}
      onKeyDown={onEnterPressed(keyName)}
    >
      <figcaption>
        <div className="fi-color__name">{color}</div>
        {!!hslaAsHex && (
          <div className="fi-color__name fi-color__name--hex">{hslaAsHex}</div>
        )}
        <div className="fi-color__name fi-color__name--key">{keyName}</div>
      </figcaption>
      <svg aria-label={color} role="img">
        <rect fill={color}>
          <title>{keyName}</title>
        </rect>
      </svg>
    </StyledFigure>
  );
};

const ColorsContainer = styled.div`
  ${containerStyles};
`;

export class Colors extends Component<ColorsProps> {
  render() {
    const { colors } = this.props;
    const props = withSuomifiDefaultProps(this.props);
    const useColors = !!colors ? colors : props.tokens.colors;
    return (
      <ColorsContainer>
        {Object.entries(useColors).reduce<JSX.Element[]>(
          (arr, [key, value]) => {
            const item = (
              <ColorFigure
                key={key.toString()}
                keyName={key.toString()}
                color={value as string}
                {...props}
              />
            );
            return [...arr, item];
          },
          [],
        )}
      </ColorsContainer>
    );
  }
}
