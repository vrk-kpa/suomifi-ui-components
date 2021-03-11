import React, { Component } from 'react';
import { default as styled } from 'styled-components';
import classnames from 'classnames';
import { Button, ButtonProps } from '../../Button/Button';
import { ModalConsumer, ModalVariant, baseClassName } from '../Modal/Modal';
import { baseStyles } from './ModalButton.baseStyles';

export interface ModalButtonProps extends ButtonProps {}

interface InternalModalButtonProps extends ModalButtonProps {
  modalVariant: ModalVariant;
}

export const buttonBaseClassName = `${baseClassName}_button`;
const buttonClassNames = {
  smallScreen: `${buttonBaseClassName}--small-screen`,
};

class BaseModalButton extends Component<InternalModalButtonProps> {
  render() {
    const {
      children,
      className,
      modalVariant = 'default',
      ...passProps
    } = this.props;

    return (
      <Button
        className={classnames(buttonBaseClassName, className, {
          [buttonClassNames.smallScreen]: modalVariant === 'smallScreen',
        })}
        {...passProps}
      >
        {children}
      </Button>
    );
  }
}

const StyledModalButton = styled(BaseModalButton)`
  ${baseStyles}
`;

/**
 * <i class="semantics" />
 * Use for showing modal content.
 * Props other than specified explicitly are passed on to outermost content div.
 */
export class ModalButton extends Component<ModalButtonProps> {
  render() {
    return (
      <ModalConsumer>
        {(consumer) => (
          <StyledModalButton variant={consumer.variant} {...this.props} />
        )}
      </ModalConsumer>
    );
  }
}
