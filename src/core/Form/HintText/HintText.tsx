import React, { forwardRef, ReactNode } from 'react';
import classnames from 'classnames';
import { styled } from 'styled-components';
import { HtmlSpan, HtmlSpanProps } from '../../../reset';
import {
  SuomifiThemeProp,
  SuomifiThemeConsumer,
  SpacingConsumer,
} from '../../theme';
import {
  separateMarginProps,
  MarginProps,
  GlobalMarginProps,
} from '../../theme/utils/spacing';
import { baseStyles } from './HintText.baseStyles';
import { filterDuplicateKeys } from '../../../utils/common/common';

const baseClassName = 'fi-hint-text';

export interface HintTextProps extends HtmlSpanProps, MarginProps {
  /** HTML id attribute */
  id?: string;
  /** HintText element content */
  children?: ReactNode;
  /** Custom class name to extend or customize  */
  className?: string;
  /** Ref is forwarded to the span element. Alternative for React `ref` attribute. */
  forwardedRef?: React.Ref<HTMLSpanElement>;
}

const StyledHintText = styled(
  ({
    className,
    globalMargins,
    theme,
    children,
    ...rest
  }: HintTextProps & SuomifiThemeProp & GlobalMarginProps) => {
    const [_marginProps, passProps] = separateMarginProps(rest);

    return (
      <HtmlSpan
        {...passProps}
        className={classnames(className, baseClassName, {})}
        style={{ ...passProps?.style }}
      >
        {children}
      </HtmlSpan>
    );
  },
)`
  ${({ theme, globalMargins, ...rest }) => {
    const [marginProps, _passProps] = separateMarginProps(rest);
    const cleanedGlobalMargins = filterDuplicateKeys(
      globalMargins.hintText,
      marginProps,
    );
    return baseStyles(theme, cleanedGlobalMargins, marginProps);
  }}
`;

const HintText = forwardRef(
  (props: HintTextProps, ref: React.Ref<HTMLSpanElement>) => {
    const { children, ...passProps } = props;
    if (!children) {
      return null;
    }
    return (
      <SpacingConsumer>
        {({ margins }) => (
          <SuomifiThemeConsumer>
            {({ suomifiTheme }) => (
              <StyledHintText
                forwardedRef={ref}
                theme={suomifiTheme}
                globalMargins={margins}
                {...passProps}
              >
                {children}
              </StyledHintText>
            )}
          </SuomifiThemeConsumer>
        )}
      </SpacingConsumer>
    );
  },
);

HintText.displayName = 'HintText';
export { HintText };
