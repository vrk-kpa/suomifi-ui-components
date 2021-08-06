import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { SuomifiTheme, SuomifiThemeConsumer } from '../../theme';
import { baseStyles } from './LabelText.baseStyles';
import { asPropType } from '../../../utils/typescript';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import { HtmlSpan, HtmlSpanProps, HtmlDiv, HtmlDivProps } from '../../../reset';

export type LabelMode = 'hidden' | 'visible';

export interface LabelTextProps extends Omit<HtmlDivProps, 'as'> {
  /** id */
  id?: string;
  /** Label element content */
  children: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
  /** Label span props */
  labelSpanProps?: HtmlSpanProps;
  /** Render the wrapping element as another element */
  asProp?: asPropType;
  /** Optional text that is shown after labelText. Will be wrapped in parentheses. */
  optionalText?: string;
}

const baseClassName = 'fi-label-text';
const labelTextClassNames = {
  labelSpan: `${baseClassName}_label-span`,
  optionalText: `${baseClassName}_optionalText`,
};

const StyledLabelText = styled(
  ({
    className,
    theme,
    labelMode = 'visible',
    labelSpanProps = { className: undefined },
    children,
    asProp,
    optionalText,
    ...passProps
  }: LabelTextProps & { theme: SuomifiTheme }) => (
    <HtmlDiv
      {...(asProp ? { as: asProp } : {})}
      className={classnames(className, baseClassName)}
      {...passProps}
    >
      {labelMode === 'hidden' ? (
        <VisuallyHidden>
          {children}
          {optionalText && `(${optionalText})`}
        </VisuallyHidden>
      ) : (
        <HtmlSpan
          {...labelSpanProps}
          className={classnames(
            labelTextClassNames.labelSpan,
            labelSpanProps.className,
          )}
        >
          {children}
          {optionalText && (
            <HtmlSpan className={labelTextClassNames.optionalText}>
              {` (${optionalText})`}
            </HtmlSpan>
          )}
        </HtmlSpan>
      )}
    </HtmlDiv>
  ),
)`
  ${({ theme }) => baseStyles(theme)}
`;

export class LabelText extends Component<LabelTextProps> {
  render() {
    return (
      <SuomifiThemeConsumer>
        {({ suomifiTheme }) => (
          <StyledLabelText theme={suomifiTheme} {...this.props} />
        )}
      </SuomifiThemeConsumer>
    );
  }
}
