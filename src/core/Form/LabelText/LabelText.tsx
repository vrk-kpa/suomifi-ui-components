import React, { Component, ReactNode } from 'react';
import classnames from 'classnames';
import { default as styled } from 'styled-components';
import { baseStyles } from './LabelText.baseStyles';
import { VisuallyHidden } from '../../../components/Visually-hidden/Visually-hidden';
import {
  Paragraph,
  ParagraphProps,
} from '../../../components/Paragraph/Paragraph';
import { TokensProp, InternalTokensProp } from 'core/theme';
import { withSuomifiDefaultProps } from '../../theme/utils';

const baseClassName = 'fi-label-text';

type LabelMode = 'hidden' | 'visible';

interface InternalLabelTextProps extends ParagraphProps {
  /** id */
  id?: string;
  /** Chip element content */
  children?: ReactNode;
  /** Custom class name for styling and customizing  */
  className?: string;
  /** Hide or show label. Label element is always present, but can be visually hidden.
   * @default visible
   */
  labelMode?: LabelMode;
}

export interface LabelTextProps extends InternalLabelTextProps, TokensProp {}

const StyledLabelText = styled(
  ({
    className,
    labelMode,
    children,
    tokens,
    ...passProps
  }: LabelTextProps & InternalTokensProp) => (
    <>
      {labelMode === 'hidden' ? (
        <VisuallyHidden>{children}</VisuallyHidden>
      ) : (
        <Paragraph
          {...passProps}
          className={classnames(className, baseClassName)}
        >
          {children}
        </Paragraph>
      )}
    </>
  ),
)`
  ${(tokens) => baseStyles(withSuomifiDefaultProps(tokens))}
`;

export class LabelText extends Component<LabelTextProps> {
  render() {
    const { children, ...passProps } = withSuomifiDefaultProps(this.props);

    return <StyledLabelText {...passProps}>{children}</StyledLabelText>;
  }
}
