import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { ColorProp, SuomifiThemeConsumer, SuomifiThemeProp } from '../theme';
import { baseStyles } from './Text.baseStyles';
import { HtmlSpan, HtmlSpanProps } from '../../reset';

const baseClassName = 'fi-text';
const smallScreenClassName = `${baseClassName}--small-screen`;

interface InternalTextProps extends HtmlSpanProps {
  /** Change font to smaller screen size and style */
  smallScreen?: boolean;
  /** Change color for text from theme colors */
  color?: ColorProp;
  /**
   * Type of text-style
   * @default body
   */
  variant?: 'body' | 'lead' | 'bold';
}

interface InnerRef {
  forwardedRef: React.RefObject<HTMLSpanElement>;
}

export interface TextProps extends InternalTextProps {
  /** Ref object to be passed to the element */
  ref?: React.RefObject<HTMLSpanElement>;
}

const StyledText = styled(
  ({
    variant = 'body',
    smallScreen,
    className,
    theme,
    color,
    ...passProps
  }: InternalTextProps & InnerRef & SuomifiThemeProp) => (
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

/**
 * Used for displaying text with correct fonts
 */
const Text = forwardRef<HTMLSpanElement, TextProps>(
  (props: TextProps, ref: React.Ref<HTMLSpanElement>) => {
    const { id: propId, ...passProps } = props;
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
