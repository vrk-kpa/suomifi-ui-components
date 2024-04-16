import React, { forwardRef } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../theme/utils/spacing';
import {
  ColorProp,
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../theme';
import { baseStyles } from './Paragraph.baseStyles';
import { HtmlP, HtmlPProps } from '../../reset/HtmlP/HtmlP';

const baseClassName = 'fi-paragraph';

export interface ParagraphProps extends HtmlPProps, MarginProps {
  /** Sets a color for the text. Colors from SuomifiTheme are available */
  color?: ColorProp;
  /** Ref object is forwarded to the paragraph element. Alternative to React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLParagraphElement>;
}

const StyledParagraph = styled(
  ({
    className,
    theme,
    style,
    globalMargins,
    ...rest
  }: ParagraphProps & SuomifiThemeProp & GlobalMarginProps) => {
    const [_marginProps, passProps] = separateMarginProps(rest);

    return (
      <HtmlP
        className={classnames(baseClassName, className)}
        {...passProps}
        style={style}
      />
    );
  },
)`
  ${({ theme, globalMargins }) => baseStyles(theme, globalMargins?.paragraph)}
`;

const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  (props, ref) => (
    <SpacingConsumer>
      {({ margins }) => (
        <SuomifiThemeConsumer>
          {({ suomifiTheme }) => (
            <StyledParagraph
              theme={suomifiTheme}
              globalMargins={margins}
              forwardedRef={ref}
              {...props}
            />
          )}
        </SuomifiThemeConsumer>
      )}
    </SpacingConsumer>
  ),
);

Paragraph.displayName = 'Paragraph';
export { Paragraph };
