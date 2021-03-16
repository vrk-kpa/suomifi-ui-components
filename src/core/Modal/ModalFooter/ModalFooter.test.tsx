import React from 'react';
import { render } from '@testing-library/react';
import { Modal } from '../';
import { ModalFooter, ModalFooterProps } from './ModalFooter';
import { Button } from '../../../';

describe('Basic ModalFooter', () => {
  const BasicModal = (props?: Partial<ModalFooterProps>) => (
    <Modal visible={true} usePortal={false}>
      <ModalFooter {...props} data-testid="modal-footer-id">
        <Button>OK</Button>
        <Button variant="secondary">Cancel</Button>
      </ModalFooter>
    </Modal>
  );

  it('should have given className', () => {
    const { getByTestId } = render(
      BasicModal({ className: 'test-class-name' }),
    );
    expect(getByTestId('modal-footer-id')).toHaveClass('test-class-name');
  });

  it('should match snapshot', () => {
    const { container } = render(BasicModal());
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('ModalFooter variant', () => {
  const SmallScreenModal = (
    <Modal visible={true} usePortal={false} variant="smallScreen">
      <ModalFooter data-testid="modal-footer-id">
        <Button>OK</Button>
        <Button variant="secondary">Cancel</Button>
      </ModalFooter>
    </Modal>
  );

  it('smallScreen should have correct classname', () => {
    const { getByTestId } = render(SmallScreenModal);
    expect(getByTestId('modal-footer-id').parentElement).toHaveClass(
      'fi-modal_footer--small-screen',
    );
  });
});
