import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { TokensProp, InternalTokensProp } from '../../theme';
import { HtmlDiv, HtmlDivProps } from '../../../reset';
import { getConditionalAriaProp } from '../../../utils/aria';
import { baseStyles } from './ExpanderContent.baseStyles';
import {
  ExpanderConsumer,
  ExpanderContentBaseProps,
} from '../Expander/Expander';

const baseClassName = 'fi-expander';
const contentBaseClassName = `${baseClassName}_content`;
const contentOpenClassName = `${contentBaseClassName}--open`;
const noPaddingClassName = `${contentBaseClassName}--no-padding`;

export interface ExpanderContentProps extends Omit<HtmlDivProps, 'id'> {
  /** Content for expander */
  children: ReactNode;
  /**
   * Remove padding from expandable content area (for background usage with padding in given container etc.)
   * @default false
   */
  noPadding?: boolean;
}

interface InternalExpanderContentProps
  extends ExpanderContentBaseProps,
    ExpanderContentProps {}

class BaseExpanderContent extends Component<InternalExpanderContentProps> {
  render() {
    const {
      children,
      title,
      className,
      noPadding,
      consumer,
      'aria-labelledby': ariaLabelledBy,
      ...passProps
    } = this.props;
    return (
      <HtmlDiv
        role="region"
        {...passProps}
        id={consumer.contentId}
        {...getConditionalAriaProp('aria-labelledby', [
          consumer.titleId,
          ariaLabelledBy,
        ])}
        className={classnames(className, contentBaseClassName, {
          [contentOpenClassName]: !!consumer.open,
          [noPaddingClassName]: !!noPadding,
        })}
        aria-hidden={!consumer.open}
        key={String(consumer.open)}
      >
        {children}
      </HtmlDiv>
    );
  }
}

const StyledExpanderContent = styled(
  ({
    tokens,
    className,
    ...passProps
  }: ExpanderContentProps & InternalTokensProp) => (
    <ExpanderConsumer>
      {(consumer) => (
        <BaseExpanderContent
          {...passProps}
          consumer={consumer}
          className={className}
        />
      )}
    </ExpanderConsumer>
  ),
)`
  ${(props) => baseStyles(props)};
`;

/**
 * <i class="semantics" />
 * Expander content wrapper, controlled by expander
 */
export class ExpanderContent extends Component<
  ExpanderContentProps & TokensProp
> {
  render() {
    return <StyledExpanderContent {...withSuomifiDefaultProps(this.props)} />;
  }
}
