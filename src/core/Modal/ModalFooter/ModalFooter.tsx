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
  propClassName?: string;
}

export const footerBaseClassName = `${baseClassName}_footer`;
const footerClassNames = {
  smallScreen: `${footerBaseClassName}--small-screen`,
  content: `${footerBaseClassName}_content`,
  contentGradientOverlay: `${footerBaseClassName}_content-gradient-overlay`,
  contentGradient: `${footerBaseClassName}_content-gradient`,
  button: `${footerBaseClassName}_button`,
};

class BaseModalFooter extends Component<InternalModalFooterProps> {
  render() {
    const {
      children,
      className,
      propClassName,
      modalVariant = 'default',
      scrollable = true,
      ...passProps
    } = this.props;

    return (
      <HtmlDiv
        className={classnames(className, footerBaseClassName, {
          [footerClassNames.smallScreen]: modalVariant === 'smallScreen',
        })}
      >
        <HtmlDiv
          className={classnames(propClassName, footerClassNames.content)}
          {...passProps}
        >
          {children}
        </HtmlDiv>
        {scrollable && (
          <HtmlDiv className={footerClassNames.contentGradientOverlay}>
            <HtmlDiv className={footerClassNames.contentGradient} />
          </HtmlDiv>
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
 * Use for showing modal footer.
 * Applies variant specific spacings to immediate children.
 * Props other than specified explicitly are passed on to the content wrapping div.
 */
export class ModalFooter extends Component<ModalFooterProps> {
  render() {
    const { className, ...passProps } = this.props;
    return (
      <ModalConsumer>
        {({ variant, scrollable }) => (
          <StyledModalFooter
            modalVariant={variant}
            scrollable={scrollable}
            propClassName={className}
            {...passProps}
          />
        )}
      </ModalConsumer>
    );
  }
}
