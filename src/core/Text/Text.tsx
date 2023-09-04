import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { ColorProp, SuomifiThemeConsumer, SuomifiThemeProp } from '../theme';
import { baseStyles } from './Text.baseStyles';
import { HtmlSpan, HtmlSpanProps } from '../../reset';

const baseClassName = 'fi-text';
const smallScreenClassName = `${baseClassName}--small-screen`;

export interface TextProps extends HtmlSpanProps {
  /** Toggles a smaller font size */
  smallScreen?: boolean;
  /** Sets a color for the text. Colors from SuomifiTheme are available */
  color?: ColorProp;
  /**
   * Text style
   * @default body
   */
  variant?: 'body' | 'lead' | 'bold';
  /** Ref is forwarded to the span element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLSpanElement>;
}

const StyledText = styled(
  ({
    variant = 'body',
    smallScreen,
    className,
    theme,
    color,
    ...passProps
  }: TextProps & SuomifiThemeProp) => (
    <HtmlSpan
      {...passProps}
      className={classnames(
        baseClassName,
        className,
        [`${baseClassName}--${variant}`],
        {
          [smallScreenClassName]: smallScreen,
        },
      )}
    />
  ),
)`
  ${(props) => baseStyles(props)}
`;

const Text = forwardRef<HTMLSpanElement, TextProps>(
  (props: TextProps, ref: React.Ref<HTMLSpanElement>) => {
    const { ...passProps } = props;
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledText theme={suomifiTheme} forwardedRef={ref} {...passProps} />
        )}
      </SuomifiThemeConsumer>
    );
  },
);

Text.displayName = 'Text';
export { Text };
