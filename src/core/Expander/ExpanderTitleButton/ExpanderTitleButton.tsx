import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { withSuomifiDefaultProps } from '../../theme/utils';
import { TokensProp, InternalTokensProp } from '../../theme';
import { HtmlDiv, HtmlButton, HtmlButtonProps, HtmlSpan } from '../../../reset';
import { expanderTitleButtonBaseStyles } from './ExpanderTitleButton.baseStyles';
import { Icon } from '../../Icon/Icon';
import { ExpanderConsumer, ExpanderTitleBaseProps } from '../Expander/Expander';
import { VisuallyHidden } from '../../../components';

const baseClassName = 'fi-expander_title-button';
const titleOpenClassName = `${baseClassName}--open`;
const titleButtonClassName = `${baseClassName}_button`;
const iconClassName = `${baseClassName}-icon`;
const iconOpenClassName = `${iconClassName}--open`;

export interface ExpanderTitleButtonProps {
  /** Custom classname to extend or customize */
  className?: string;
  /** Title for Expander */
  children?: ReactNode;
  /** Wrap the title button inside a heading tag */
  asHeading?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
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

interface InternalExpanderTitleButtonProps
  extends ExpanderTitleButtonProps,
    ExpanderTitleBaseProps {}

class BaseExpanderTitleButton extends Component<
  InternalExpanderTitleButtonProps
> {
  render() {
    const {
      ariaCloseText,
      ariaOpenText,
      asHeading,
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
        <HtmlSpan {...(!!asHeading ? { as: asHeading } : {})}>
          <HtmlButton
            {...toggleButtonProps}
            onClick={consumer.onToggleExpander}
            aria-expanded={!!consumer.open}
            className={titleButtonClassName}
            {...{ 'aria-controls': `${consumer.contentId}` }}
          >
            <HtmlSpan id={consumer.titleId}>{children}</HtmlSpan>
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
        </HtmlSpan>
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
 * Expander title button for static title content and toggle for content visiblity
 */
export class ExpanderTitleButton extends Component<
  ExpanderTitleButtonProps & TokensProp
> {
  render() {
    return <StyledExpanderTitle {...withSuomifiDefaultProps(this.props)} />;
  }
}
