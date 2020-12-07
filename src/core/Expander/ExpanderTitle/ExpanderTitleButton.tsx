import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { TokensProp, InternalTokensProp } from '../../theme';
import { HtmlDiv, HtmlButton, HtmlButtonProps } from '../../../reset';
import { expanderTitleButtonBaseStyles } from './ExpanderTitle.baseStyles';
import { Icon } from '../../Icon/Icon';
import { ExpanderConsumer, ExpanderTitleBaseProps } from '../Expander/Expander';
import { VisuallyHidden } from '../../../components';

const baseClassName = 'fi-expander';
const titleClassName = `${baseClassName}_title`;
const titleOpenClassName = `${titleClassName}--open`;
const titleButtonClassName = `${titleClassName}-button`;
const iconClassName = `${titleClassName}-icon`;
const iconOpenClassName = `${iconClassName}--open`;

export interface ExpanderTitleButtonProps {
  /** Title for Expander */
  children?: ReactNode;
  /** Additional text for closed expanders toggle button. E.g."open expander". */
  ariaOpenText?: string;
  /** Additional text for open expanders toggle button. E.g."close expander". */
  ariaCloseText?: string;
  /** Properties for title open/close toggle button */
  toggleButtonProps?: Omit<
    HtmlButtonProps,
    | 'onClick'
    | 'onMouseDown'
    | 'onMouseUp'
    | 'onKeyPress'
    | 'onKeyUp'
    | 'onKeyDown'
  >;
}

export interface InternalExpanderTitleButtonProps
  extends ExpanderTitleButtonProps,
    ExpanderTitleBaseProps {}

class BaseExpanderTitleButton extends Component<
  InternalExpanderTitleButtonProps
> {
  render() {
    const {
      ariaCloseText,
      ariaOpenText,
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
          onClick={consumer.onToggleExpander}
          aria-expanded={!!consumer.open}
          className={titleButtonClassName}
          id={consumer.titleId}
          {...{ 'aria-controls': `${consumer.contentId}` }}
        >
          {children}
          {(!!ariaCloseText || !!ariaOpenText) && (
            <VisuallyHidden>
              {!!consumer.open ? ariaCloseText : ariaOpenText}
            </VisuallyHidden>
          )}
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
  ({ tokens, ...passProps }: ExpanderTitleButtonProps & InternalTokensProp) => {
    return (
      <ExpanderConsumer>
        {(consumer) => (
          <BaseExpanderTitleButton consumer={consumer} {...passProps} />
        )}
      </ExpanderConsumer>
    );
  },
)`
  ${(props) => expanderTitleButtonBaseStyles(props)};
`;

/**
 * <i class="semantics" />
 * Expander title for content and toggle for content visiblity
 */
export class ExpanderTitleButton extends Component<
  ExpanderTitleButtonProps & TokensProp
> {
  render() {
    return <StyledExpanderTitle {...withSuomifiDefaultProps(this.props)} />;
  }
}
