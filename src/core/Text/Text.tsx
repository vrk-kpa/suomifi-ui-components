import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  ColorProp,
  SpacingConsumer,
  SuomifiThemeConsumer,
  SuomifiThemeProp,
} from '../theme';
import {
  spacingStyles,
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../theme/utils/spacing';
import { baseStyles } from './Text.baseStyles';
import { HtmlSpan, HtmlSpanProps } from '../../reset';

const baseClassName = 'fi-text';
const smallScreenClassName = `${baseClassName}--small-screen`;

export interface TextProps extends HtmlSpanProps, MarginProps {
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
    globalMargins,
    className,
    theme,
    color,
    ...rest
  }: TextProps & SuomifiThemeProp & GlobalMarginProps) => {
    const [marginProps, passProps] = separateMarginProps(rest);
    const marginStyle = spacingStyles(marginProps);

    return (
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
        style={{ ...marginStyle, ...passProps?.style }}
      />
    );
  },
  // Component specific margins extracted within styles to minimize changes to surrounding code
)`
  ${(props) => baseStyles(props)}
`;

const Text = forwardRef<HTMLSpanElement, TextProps>(
  (props: TextProps, ref: React.Ref<HTMLSpanElement>) => {
    const { ...passProps } = props;
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <StyledText
                theme={suomifiTheme}
                globalMargins={margins}
                forwardedRef={ref}
                {...passProps}
              />
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

Text.displayName = 'Text';
export { Text };
