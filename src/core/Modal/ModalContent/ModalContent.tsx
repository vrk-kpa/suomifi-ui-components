import React, { Component, ReactNode } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivProps } from '../../../reset';
import { ModalConsumer, ModalVariant, baseClassName } from '../Modal/Modal';
import { baseStyles } from './ModalContent.baseStyles';

export interface ModalContentProps
  extends Omit<HtmlDivProps, 'children' | 'className'> {
  /** Modal container div class name for custom styling. */
  className?: string;
  /** Children */
  children: ReactNode;
  /**
   * Show vertical scroll bar if needed and show horizontal divider before buttons.
   * @default true
   */
  scrollable?: boolean;
}

interface InternalModalContentProps extends ModalContentProps {
  id?: string;
  variant: ModalVariant;
}

const contentClassName = `${baseClassName}_content`;
const modalContentClassNames = {
  smallScreen: `${contentClassName}--small-screen`,
  noScroll: `${contentClassName}--no-scroll`,
  heading: `${contentClassName}_heading`,
};

class BaseModalContent extends Component<InternalModalContentProps> {
  render() {
    const {
      className,
      title,
      children,
      scrollable,
      variant,
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        className={classnames(className, contentClassName, {
          [modalContentClassNames.noScroll]: scrollable === false,
          [modalContentClassNames.smallScreen]: variant === 'smallScreen',
        })}
        {...passProps}
      >
        {children}
      </HtmlDiv>
    );
  }
}

const StyledModalContent = styled(BaseModalContent)`
  ${baseStyles}
`;

/**
 * <i class="semantics" />
 * Use for showing modal content.
 * Props other than specified explicitly are passed on to outermost content div.
 */
export class ModalContent extends Component<ModalContentProps> {
  render() {
    return (
      <ModalConsumer>
        {(consumer) => (
          <StyledModalContent variant={consumer.variant} {...this.props} />
        )}
      </ModalConsumer>
    );
  }
}
