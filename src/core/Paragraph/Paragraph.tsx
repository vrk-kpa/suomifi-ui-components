import React, { forwardRef } from 'react';
import { styled } from 'styled-components';
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
import { filterDuplicateKeys } from '../../utils/common/common';

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
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.paragraph,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
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
