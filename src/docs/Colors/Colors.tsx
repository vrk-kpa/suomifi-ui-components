import React, { Component, ReactNode } from 'react';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  defaultSuomifiTheme,
} from '../../core/theme';
import { hslaToHex } from '../../utils/css';
import { styled } from 'styled-components';
import { baseStyles, containerStyles } from './Colors.baseStyles';
import clipboardCopy from 'clipboard-copy';

const {
  whiteBase,
  blackBase,
  blackLight1,
  brandBase,
  depthDark1,
  depthDark2,
  depthDark3,
  depthBase,
  depthLight3,
  depthLight2,
  depthLight1,
  depthSecondaryDark1,
  depthSecondary,
  highlightDark1,
  highlightBase,
  highlightLight1,
  highlightLight2,
  highlightLight3,
  highlightLight4,
  accentBase,
  accentSecondary,
  accentSecondaryLight1,
  accentTertiaryDark1,
  accentTertiary,
  successBase,
  successSecondary,
  warningBase,
  infoBase,
  infoLight1,
  alertBase,
  alertLight1,
  successDark1,
  warningLight1,
} = defaultSuomifiTheme.colors;

export const colorTokens = {
  base: {
    whiteBase,
    blackBase,
    blackLight1,
  },
  brand: {
    brandBase,
  },
  depth: {
    depthDark1,
    depthDark2,
    depthDark3,
    depthBase,
    depthLight3,
    depthLight2,
    depthLight1,
  },
  depthSecondary: {
    depthSecondaryDark1,
    depthSecondary,
  },
  hightlight: {
    highlightDark1,
    highlightBase,
    highlightLight1,
    highlightLight2,
    highlightLight3,
    highlightLight4,
  },
  accent: {
    accentBase,
    accentSecondary,
    accentSecondaryLight1,
    accentTertiaryDark1,
    accentTertiary,
  },
  trafficlights: {
    infoBase,
    infoLight1,
    successBase,
    successSecondary,
    warningBase,
    alertBase,
    alertLight1,
    successDark1,
    warningLight1,
  },
};

export interface ColorsProps {
  colors?: {
    [key: string]: string;
  };
}

export interface ColorProps {
  keyName: string;
  color: string;
  children?: ReactNode;
}

const copyKey = (key: string) => () => clipboardCopy(key);

const onEnterPressed =
  (keyName: string) => (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Enter') {
      clipboardCopy(keyName);
    }
  };

const StyledFigure = styled.figure`
  ${(props: ColorProps & SuomifiThemeProp) => baseStyles(props)}
`;

const ColorFigure = (props: ColorProps & SuomifiThemeProp) => {
  const { color, keyName } = props;
  // Brand color is hardcoded in these docs due to HSL conversion producing
  // a hex which differs slightly from the value DVV defined as
  // their brand color initially. It is reasonable to display the original value
  // #003479 to avoid confusion.
  const hslaAsHex = keyName !== 'brandBase' ? hslaToHex(color) : '#003479';

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
  ${containerStyles}
`;

export class Colors extends Component<ColorsProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => {
          const useColors = !!this.props.colors
            ? this.props.colors
            : suomifiTheme.colors;
          return (
            <ColorsContainer>
              {Object.entries(useColors).reduce<JSX.Element[]>(
                (arr, [key, value]) => {
                  const item = (
                    <ColorFigure
                      theme={suomifiTheme}
                      key={key.toString()}
                      keyName={key.toString()}
                      color={value as string}
                      {...this.props}
                    />
                  );
                  return [...arr, item];
                },
                [],
              )}
            </ColorsContainer>
          );
        }}
      </SuomifiThemeConsumer>
    );
  }
}
