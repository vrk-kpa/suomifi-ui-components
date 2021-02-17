import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './LabelText.baseStyles';
import { asPropType } from '../../../utils/typescript';
import { VisuallyHidden } from '../../../components/Visually-hidden/Visually-hidden';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { HtmlSpan, HtmlSpanProps, HtmlDiv, HtmlDivProps } from '../../../reset';

export type LabelMode = 'hidden' | 'visible';

export interface LabelTextProps extends HtmlDivProps {
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
    labelMode = 'visible',
    labelSpanProps = { className: undefined },
    children,
    asProp,
    optionalText,
    ...passProps
  }: LabelTextProps) => (
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
  ${baseStyles}
`;

export class LabelText extends Component<LabelTextProps> {
  render() {
    const { ...passProps } = withSuomifiDefaultProps(this.props);
    return <StyledLabelText {...passProps} />;
  }
}
