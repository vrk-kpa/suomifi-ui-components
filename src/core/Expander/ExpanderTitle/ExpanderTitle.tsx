import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { TokensProp, InternalTokensProp } from '../../theme';
import { noMouseFocus } from '../../theme/utils/mousefocus';
import { HtmlDiv, HtmlButton, HtmlButtonProps } from '../../../reset';
import { baseStyles } from './ExpanderTitle.baseStyles';
import { Icon } from '../../Icon/Icon';
import { ExpanderConsumer, ExpanderTitleBaseProps } from '../Expander/Expander';

const baseClassName = 'fi-expander';
const titleClassName = `${baseClassName}_title`;
const titleOpenClassName = `${titleClassName}--open`;
const titleButtonClassName = `${titleClassName}-button`;
const iconClassName = `${titleClassName}-icon`;
const iconOpenClassName = `${iconClassName}--open`;

export interface ExpanderTitleProps {
  /** Title for Expander */
  children?: ReactNode;
  /** Properties for title open/close toggle button */
  toggleButtonProps?: Omit<
    HtmlButtonProps,
    'onClick' | 'onKeyUp' | 'onMouseDown'
  >;
}

export interface InternalExpanderTitleProps
  extends ExpanderTitleProps,
    ExpanderTitleBaseProps {}

class BaseExpanderTitle extends Component<InternalExpanderTitleProps> {
  render() {
    const {
      children,
      className,
      toggleButtonProps,
      consumer,
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        {...passProps}
        className={classnames(className, titleClassName, {
          [titleOpenClassName]: !!consumer.open,
        })}
      >
        <HtmlButton
          {...toggleButtonProps}
          {...noMouseFocus({ callback: consumer.onToggleExpander })}
          aria-expanded={!!consumer.open}
          className={titleButtonClassName}
          id={consumer.titleId}
          {...{ 'aria-controls': `${consumer.contentId}` }}
        >
          {children}
          <Icon
            icon="chevronDown"
            className={classnames(iconClassName, {
              [iconOpenClassName]: consumer.open,
            })}
          />
        </HtmlButton>
      </HtmlDiv>
    );
  }
}

const StyledExpanderTitle = styled(
  ({ tokens, ...passProps }: ExpanderTitleProps & InternalTokensProp) => {
    return (
      <ExpanderConsumer>
        {(consumer) => <BaseExpanderTitle consumer={consumer} {...passProps} />}
      </ExpanderConsumer>
    );
  },
)`
  ${(props) => baseStyles(props)};
`;

/**
 * <i class="semantics" />
 * Expander title for content and toggle for content visiblity
 */
export class ExpanderTitle extends Component<ExpanderTitleProps & TokensProp> {
  render() {
    return <StyledExpanderTitle {...withSuomifiDefaultProps(this.props)} />;
  }
}
