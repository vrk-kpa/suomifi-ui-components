import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivProps } from '../../../reset';
import { ModalConsumer, ModalVariant, baseClassName } from '../Modal/Modal';
import { baseStyles } from './ModalFooter.baseStyles';

export interface ModalFooterProps extends HtmlDivProps {}

interface InternalModalFooterProps extends ModalFooterProps {
  modalVariant: ModalVariant;
  scrollable: boolean;
}

export const footerBaseClassName = `${baseClassName}_footer`;
const footerClassNames = {
  smallScreen: `${footerBaseClassName}--small-screen`,
  contentGradientOverlay: `${footerBaseClassName}_content-gradient-overlay`,
  button: `${footerBaseClassName}_button`,
};

class BaseModalFooter extends Component<InternalModalFooterProps> {
  render() {
    const {
      children,
      className,
      modalVariant = 'default',
      scrollable = true,
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        className={classnames(footerBaseClassName, className, {
          [footerClassNames.smallScreen]: modalVariant === 'smallScreen',
        })}
        {...passProps}
      >
        {children}
        {scrollable && (
          <HtmlDiv className={footerClassNames.contentGradientOverlay} />
        )}
      </HtmlDiv>
    );
  }
}

const StyledModalFooter = styled(BaseModalFooter)`
  ${baseStyles}
`;

/**
 * <i class="semantics" />
 * Use for showing modal content.
 * Props other than specified explicitly are passed on to outermost content div.
 */
export class ModalFooter extends Component<ModalFooterProps> {
  render() {
    return (
      <ModalConsumer>
        {({ variant, scrollable }) => (
          <StyledModalFooter
            modalVariant={variant}
            scrollable={scrollable}
            {...this.props}
          />
        )}
      </ModalConsumer>
    );
  }
}
