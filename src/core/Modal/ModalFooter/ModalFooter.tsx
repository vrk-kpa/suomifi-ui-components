import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { HtmlDiv, HtmlDivProps } from '../../../reset';
import { ModalConsumer, ModalVariant, baseClassName } from '../Modal/Modal';
import { baseStyles } from './ModalFooter.baseStyles';

export interface ModalFooterProps extends HtmlDivProps {}

interface InternalModalFooterProps extends ModalFooterProps {
  modalVariant: ModalVariant;
}

export const footerClassName = `${baseClassName}_footer`;
const footerClassNames = {
  smallScreen: `${footerClassName}--small-screen`,
  button: `${footerClassName}_button`,
};

class BaseModalFooter extends Component<InternalModalFooterProps> {
  render() {
    const {
      children,
      className,
      modalVariant = 'default',
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        className={classnames(footerClassName, className, {
          [footerClassNames.smallScreen]: modalVariant === 'smallScreen',
        })}
        {...passProps}
      >
        {children}
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
        {({ variant }) => (
          <StyledModalFooter modalVariant={variant} {...this.props} />
        )}
      </ModalConsumer>
    );
  }
}
