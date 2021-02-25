import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import {
  HtmlDiv,
  HtmlButton,
  HtmlButtonProps,
  HtmlDivProps,
  HtmlSpan,
} from '../../../reset';
import { expanderTitleBaseStyles } from './ExpanderTitle.baseStyles';
import { Icon } from '../../Icon/Icon';
import { ExpanderConsumer, ExpanderTitleBaseProps } from '../Expander/Expander';
import { VisuallyHidden } from '../../../components';

const baseClassName = 'fi-expander_title';
const titleOpenClassName = `${baseClassName}--open`;
const titleButtonClassName = `${baseClassName}-button`;
const iconClassName = `${baseClassName}-icon`;
const iconOpenClassName = `${iconClassName}--open`;

export interface ExpanderTitleProps extends Omit<HtmlDivProps, 'className'> {
  /** Custom classname to extend or customize */
  className?: string;
  /** Title for Expander */
  children?: ReactNode;
  /** Additional text for closed expanders toggle button. E.g."open expander". */
  ariaOpenText: string;
  /** Additional text for open expanders toggle button. E.g."close expander". */
  ariaCloseText: string;
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

interface InternalExpanderTitleProps
  extends ExpanderTitleProps,
    ExpanderTitleBaseProps {}

class BaseExpanderTitle extends Component<InternalExpanderTitleProps> {
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
        className={classnames(className, baseClassName, {
          [titleOpenClassName]: !!consumer.open,
        })}
      >
        <HtmlSpan id={consumer.titleId}>{children}</HtmlSpan>
        <HtmlButton
          {...toggleButtonProps}
          onClick={consumer.onToggleExpander}
          aria-expanded={!!consumer.open}
          className={titleButtonClassName}
          aria-controls={consumer.contentId}
        >
          <VisuallyHidden>
            {!!consumer.open ? ariaCloseText : ariaOpenText}
          </VisuallyHidden>
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

const StyledExpanderTitle = styled(BaseExpanderTitle)`
  ${expanderTitleBaseStyles}
`;

/**
 * <i class="semantics" />
 * Expander title for focusable content and toggle button for content visiblity
 */
export class ExpanderTitle extends Component<ExpanderTitleProps> {
  render() {
    return (
      <ExpanderConsumer>
        {(consumer) => (
          <StyledExpanderTitle consumer={consumer} {...this.props} />
        )}
      </ExpanderConsumer>
    );
  }
}
