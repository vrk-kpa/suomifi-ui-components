import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './LabelText.baseStyles';
import { asPropType } from '../../../utils/typescript';
import { VisuallyHidden } from '../../../components/Visually-hidden/Visually-hidden';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { HtmlDiv, HtmlDivProps } from '../../../reset';
import { Paragraph, ParagraphProps } from '../../Paragraph/Paragraph';
import { TokensProp, InternalTokensProp } from '../../theme';

export type LabelMode = 'hidden' | 'visible';

interface InternalLabelTextProps extends HtmlDivProps {
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
  /** Label paragraph props */
  labelParagraphProps?: ParagraphProps;
  /** Render the wrapping element as anohter element */
  asProp?: asPropType;
}

export interface LabelTextProps extends InternalLabelTextProps, TokensProp {}

const baseClassName = 'fi-label-text';
const labelTextClassNames = {
  labelP: `${baseClassName}_label-p`,
};

const StyledLabelText = styled(
  ({
    className,
    labelMode = 'visible',
    labelParagraphProps = { className: undefined },
    children,
    tokens,
    asProp,
    ...passProps
  }: LabelTextProps & InternalTokensProp) => (
    <HtmlDiv
      {...(asProp ? { as: asProp } : {})}
      className={classnames(className, baseClassName)}
      {...passProps}
    >
      {labelMode === 'hidden' ? (
        <VisuallyHidden>{children}</VisuallyHidden>
      ) : (
        <Paragraph
          {...labelParagraphProps}
          className={classnames(
            labelTextClassNames.labelP,
            labelParagraphProps.className,
          )}
        >
          {children}
        </Paragraph>
      )}
    </HtmlDiv>
  ),
)`
  ${(tokens) => baseStyles(withSuomifiDefaultProps(tokens))}
`;

export class LabelText extends Component<LabelTextProps> {
  render() {
    const { ...passProps } = withSuomifiDefaultProps(this.props);
    return <StyledLabelText {...passProps} />;
  }
}
