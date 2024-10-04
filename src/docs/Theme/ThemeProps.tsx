import React, { Component } from 'react';
import { SuomifiTheme, SuomifiThemeConsumer } from '../../core/theme';
import { default as styled } from 'styled-components';
import { baseStyles } from './ThemeProps.baseStyles';

const ThemePropsContainer = styled(
  ({
    children,
    theme,
    ...passProps
  }: {
    children: React.ReactNode;
    theme: SuomifiTheme;
    [key: string]: any;
  }) => <div {...passProps}>{children}</div>,
)`
  ${({ theme }) => baseStyles(theme)}
`;
type ValueType = { [key: string]: any };

interface ThemePropsProps {
  values: ValueType;
}

const ThemeValues = (props: { values: ValueType }) => (
  <div>
    <table>
      <thead>
        <tr>
          <th>Token name</th>
          <th>Token default value</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(props.values).map((element) => {
          const value =
            typeof element[1] === 'string'
              ? element[1]
              : Array.isArray(element[1])
              ? element[1].join(',')
              : typeof element[1] === 'object'
              ? JSON.stringify(element[1])
              : element[1].toString();
          return (
            <tr key={element[0]}>
              <td className="prop-name">{element[0].toString()}</td>
              <td className="prop-value">{value}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export class ThemeProps extends Component<ThemePropsProps> {
  render() {
    const { values } = this.props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <ThemePropsContainer theme={suomifiTheme}>
            <ThemeValues values={values} />
          </ThemePropsContainer>
        )}
      </SuomifiThemeConsumer>
    );
  }
}
