import React from 'react';
import { render } from '@testing-library/react';
import { ModalContent, ModalContentProps } from './ModalContent';
import { ModalTitle, Modal } from '../';

describe('Basic modal', () => {
  const text = 'Modal Content';

  const BasicModal = (props?: Partial<ModalContentProps>) => (
    <Modal visible={true} usePortal={false}>
      <ModalContent {...props} data-testid="modal-content-id">
        <ModalTitle>Test modal</ModalTitle>
        <p>{text}</p>
        <button>x</button>
      </ModalContent>
    </Modal>
  );

  it('should have given title', () => {
    const { getByText } = render(BasicModal());
    expect(getByText('Test modal')).toBeTruthy();
  });

  it('should have given children', () => {
    const { getByText } = render(BasicModal());
    expect(getByText(text)).toBeTruthy();
  });

  it('should have given className', () => {
    const { getByTestId } = render(
      BasicModal({ className: 'test-class-name' }),
    );
    expect(getByTestId('modal-content-id')).toHaveClass('test-class-name');
  });

  it('should match snapshot', () => {
    const { container } = render(BasicModal());
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Modal variant', () => {
  const SmallScreenModal = (
    <Modal visible={true} usePortal={false} variant="smallScreen">
      <ModalContent data-testid="modal-content-id">
        <ModalTitle>Test modal</ModalTitle>
        <p>Modal Content</p>
        <button>x</button>
      </ModalContent>
    </Modal>
  );

  it('smallScreen should have correct classname', () => {
    const { getByTestId } = render(SmallScreenModal);
    expect(getByTestId('modal-content-id')).toHaveClass(
      'fi-modal_content--small-screen',
    );
  });
});
