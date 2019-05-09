import React, { Component } from 'react';
import styled from '@emotion/styled';
import { withDefaultTheme } from '../theme/utils';
import { ThemeComponent, ColorProp } from '../theme';
import {
  Text as CompText,
  TextProps as CompTextProps,
} from '../../components/Text/Text';
import { baseStyles } from './Text.baseStyles';
import classnames from 'classnames';

const baseClassName = 'fi-text';
const smallScreenClassName = `${baseClassName}--small-screen`;
type TextVariant = 'body' | 'lead' | 'bold';

export interface TextProps extends CompTextProps, ThemeComponent {
  smallScreen?: boolean;
  color?: ColorProp;
  variant?: TextVariant;
}

const StyledText = styled(
  ({
    theme,
    color,
    variant = 'body',
    smallScreen,
    className,
    ...passProps
  }: TextProps) => (
    <CompText
      {...passProps}
      className={classnames(className, [`${baseClassName}--${variant}`], {
        [smallScreenClassName]: smallScreen,
      })}
    />
  ),
)`
  ${props => baseStyles(props)};
`;

/**
 * Used displaying text with correct fonts
 */
export class Text extends Component<TextProps> {
  static lead = (props: TextProps) => (
    <StyledText {...withDefaultTheme(props)} variant="lead" />
  );

  static bold = (props: TextProps) => (
    <StyledText {...withDefaultTheme(props)} variant="bold" />
  );

  render() {
    const passProps = withDefaultTheme(this.props);
    return <StyledText {...passProps} />;
  }
}
