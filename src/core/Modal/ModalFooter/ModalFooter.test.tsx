import React from 'react';
import { act, render } from '@testing-library/react';
import { Modal } from '../';
import { ModalFooter, ModalFooterProps } from './ModalFooter';
import { Button } from '../../../';
import { createRoot, Root } from 'react-dom/client';

let appRoot: HTMLDivElement | null = null;
let root: Root | null = null;

beforeEach(() => {
  appRoot = document.createElement('div');
  appRoot.setAttribute('id', 'root');
  document.body.appendChild(appRoot);
  root = createRoot(appRoot);
});

afterEach(() => {
  if (root) {
    act(() => {
      root?.unmount();
    });
    root = null;
  }
  if (appRoot) {
    appRoot.remove();
    appRoot = null;
  }
});

describe('Basic ModalFooter', () => {
  const BasicModal = (props?: Partial<ModalFooterProps>) => (
    <Modal appElementId="root" visible={true}>
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
    const { baseElement } = render(BasicModal());
    expect(baseElement).toMatchSnapshot();
  });
});

describe('ModalFooter variant', () => {
  const SmallScreenModal = (
    <Modal appElementId="root" visible={true} variant="smallScreen">
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
