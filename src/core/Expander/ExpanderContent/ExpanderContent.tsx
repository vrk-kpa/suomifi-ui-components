import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { TokensProp, InternalTokensProp } from '../../theme';
import { HtmlDiv, HtmlDivProps } from '../../../reset';
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
  /** Remove padding from expandable content area (for background usage with padding in given container etc.) */
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
      ...passProps
    } = this.props;
    return (
      <HtmlDiv
        {...passProps}
        id={consumer.contentId}
        {...{ 'aria-labelledby': consumer.titleId }}
        className={classnames(className, contentBaseClassName, {
          [contentOpenClassName]: !!consumer.open,
          [noPaddingClassName]: noPadding,
        })}
        aria-hidden={!consumer.open}
        key={String(consumer.open)}
      >
        {children}
      </HtmlDiv>
    );
  }
}
// display: ${({ openState }) => (!!openState ? 'block' : 'none')};
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

export class ExpanderContent extends Component<
  ExpanderContentProps & TokensProp
> {
  render() {
    return <StyledExpanderContent {...withSuomifiDefaultProps(this.props)} />;
  }
}
