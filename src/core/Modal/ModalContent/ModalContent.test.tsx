import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import { ModalContent, ModalContentProps } from './ModalContent';
import { ModalTitle, Modal } from '../';

let appRoot: HTMLDivElement | null = null;

beforeEach(() => {
  appRoot = document.createElement('div');
  appRoot.setAttribute('id', 'root');
  document.body.appendChild(appRoot);
});

afterEach(() => {
  if (!!appRoot) {
    unmountComponentAtNode(appRoot);
    appRoot.remove();
    appRoot = null;
  }
});

describe('Basic ModalContent', () => {
  const text = 'Modal Content';

  const BasicModal = (props?: Partial<ModalContentProps>) => (
    <Modal appElementId="root" visible={true}>
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
    const { baseElement } = render(BasicModal());
    expect(baseElement).toMatchSnapshot();
  });
});

describe('ModalContent variant', () => {
  const SmallScreenModal = (
    <Modal appElementId="root" visible={true} variant="smallScreen">
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
