import React, { ReactNode, useRef, useState } from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';

import { Modal, ModalProps } from './Modal';
import { ModalContent, ModalFooter, ModalTitle } from '../';
import { Button } from '../../../';

describe('Basic modal', () => {
  const text = 'Modal Content';

  const BasicModal = (props?: Partial<ModalProps>) => (
    <Modal visible={true} usePortal={false} {...props}>
      <ModalContent>
        <ModalTitle>Test modal</ModalTitle>
        <p>{text}</p>
      </ModalContent>
      <ModalFooter>
        <Button>OK</Button>
      </ModalFooter>
    </Modal>
  );

  it('should be hidden when visible is set to false', () => {
    const { container } = render(BasicModal({ visible: false }));
    expect(container.firstChild).toBe(null);
  });

  it('should have given className', () => {
    const { getByRole } = render(BasicModal({ className: 'test-class-name' }));
    expect(getByRole('dialog')).toHaveClass('test-class-name');
  });

  it('should match snapshot', () => {
    const { container } = render(BasicModal());
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', axeTest(BasicModal()));
});

describe('Modal sibling DOM nodes', () => {
  const ModalWithSiblings = () => {
    const [open, setOpen] = useState(true);
    return (
      <>
        <div data-testid="test-sibling">Test content</div>
        <div
          data-testid="test-sibling-with-aria-hidden-true"
          aria-hidden="true"
          role="presentation"
        >
          Test content with Aria-hidden true
        </div>
        <div
          data-testid="test-sibling-with-aria-hidden-false"
          aria-hidden="false"
          role="presentation"
        >
          Test content with Aria-hidden false
        </div>
        <div
          data-testid="portal-containing-node"
          aria-hidden="false"
          role="button"
        >
          <Modal
            data-testid="modal"
            visible={open}
            usePortal={false}
            onEscKeyDown={() => setOpen(false)}
          >
            <ModalContent>
              <ModalTitle>Test modal</ModalTitle>
              <p>Some test text</p>
            </ModalContent>
            <ModalFooter>
              <Button>OK</Button>
            </ModalFooter>
          </Modal>
          <div data-testid="test-sibling-inside-portal-node">
            Test siblign inside portal node
          </div>
          <div
            data-testid="test-sibling-inside-portal-node-aria-hidden-true"
            aria-hidden="true"
            role="button"
          >
            Test siblign inside portal node aria hidden true
          </div>
          <div
            data-testid="test-sibling-inside-portal-node-aria-hidden-false"
            aria-hidden="false"
            role="button"
          >
            Test siblign inside portal node aria-hidden false
          </div>
        </div>
      </>
    );
  };

  it('containing the modal should not be aria-hidden', () => {
    const { getByTestId, baseElement } = render(<ModalWithSiblings />);
    expect(baseElement).not.toHaveAttribute('aria-hidden');
    expect(getByTestId('portal-containing-node')).toHaveAttribute(
      'aria-hidden',
      'false',
    );
    expect(getByTestId('modal')).not.toHaveAttribute('aria-hidden');
  });

  it('not containing the modal should be aria-hidden', () => {
    const { getByTestId } = render(<ModalWithSiblings />);
    expect(getByTestId('test-sibling')).toHaveAttribute('aria-hidden', 'true');
    expect(getByTestId('test-sibling-with-aria-hidden-true')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(getByTestId('test-sibling-with-aria-hidden-false')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(getByTestId('test-sibling-inside-portal-node')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(
      getByTestId('test-sibling-inside-portal-node-aria-hidden-true'),
    ).toHaveAttribute('aria-hidden', 'true');
    expect(
      getByTestId('test-sibling-inside-portal-node-aria-hidden-false'),
    ).toHaveAttribute('aria-hidden', 'true');
  });

  it('should preserve aria-hidden and role state after closing modal', () => {
    const { getByTestId } = render(<ModalWithSiblings />);
    fireEvent.keyDown(getByTestId('modal'), {
      key: 'Esc',
      code: 27,
      charCode: 27,
    });
    expect(getByTestId('test-sibling')).not.toHaveAttribute('aria-hidden');
    expect(getByTestId('test-sibling-with-aria-hidden-true')).toHaveAttribute(
      'aria-hidden',
      'true',
    );
    expect(getByTestId('test-sibling-with-aria-hidden-true')).toHaveAttribute(
      'role',
      'presentation',
    );
    expect(getByTestId('test-sibling-with-aria-hidden-false')).toHaveAttribute(
      'aria-hidden',
      'false',
    );
    expect(getByTestId('test-sibling-with-aria-hidden-false')).toHaveAttribute(
      'role',
      'presentation',
    );
    expect(getByTestId('portal-containing-node')).toHaveAttribute(
      'aria-hidden',
      'false',
    );
    expect(getByTestId('portal-containing-node')).toHaveAttribute(
      'role',
      'button',
    );
    expect(getByTestId('test-sibling-inside-portal-node')).not.toHaveAttribute(
      'aria-hidden',
    );
    expect(
      getByTestId('test-sibling-inside-portal-node-aria-hidden-true'),
    ).toHaveAttribute('aria-hidden', 'true');
    expect(
      getByTestId('test-sibling-inside-portal-node-aria-hidden-true'),
    ).toHaveAttribute('role', 'button');
    expect(
      getByTestId('test-sibling-inside-portal-node-aria-hidden-false'),
    ).toHaveAttribute('aria-hidden', 'false');
    expect(
      getByTestId('test-sibling-inside-portal-node-aria-hidden-false'),
    ).toHaveAttribute('role', 'button');
  });
});

describe('Modal variant', () => {
  const ModalWithProps = (props?: Partial<ModalProps>) => (
    <Modal visible={true} usePortal={false} {...props}>
      <ModalContent>
        <ModalTitle>Test modal</ModalTitle>
        <p>Modal Content</p>
      </ModalContent>
      <ModalFooter>
        <Button>OK</Button>
        <Button variant="secondary">Cancel</Button>
      </ModalFooter>
    </Modal>
  );

  it('smallScreen should have correct classname', () => {
    const { getByRole } = render(ModalWithProps({ variant: 'smallScreen' }));
    expect(getByRole('dialog')).toHaveClass('fi-modal--small-screen');
  });
});

describe('Modal focus', () => {
  const ModalWithProps = (children: ReactNode, props?: Partial<ModalProps>) => (
    <Modal visible={true} usePortal={false} {...props}>
      <ModalContent>
        <ModalTitle>Test modal</ModalTitle>
        {children}
      </ModalContent>
      <ModalFooter>
        <Button>OK</Button>
        <Button variant="secondary">Cancel</Button>
      </ModalFooter>
    </Modal>
  );

  it('should be on heading by default', async () => {
    const { getAllByRole } = render(ModalWithProps(<p>Modal Content</p>));
    await waitFor(() => expect(getAllByRole('heading')[0]).toHaveFocus());
  });

  it('should be on element provided in props', async () => {
    const RefTest1 = () => {
      const ref = useRef(null);
      return (
        <Modal visible={true} usePortal={false} focusOnOpenRef={ref}>
          <ModalContent>
            <ModalTitle>Test modal</ModalTitle>
            <button>Test button 1</button>
            <button ref={ref}>Test button 2</button>
          </ModalContent>
          <ModalFooter>
            <Button>OK</Button>
            <Button variant="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
      );
    };
    const { getByText } = render(<RefTest1 />);
    await waitFor(() => expect(getByText('Test button 2')).toHaveFocus());
  });
});

describe('Closing Modal', () => {
  const RefTest = (props?: Partial<ModalProps>) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    return (
      <>
        <button onClick={() => setOpen(!open)}>Toggle modal</button>
        <input ref={ref} type="text" />
        <Modal
          visible={open}
          usePortal={false}
          focusOnCloseRef={ref}
          {...props}
        >
          <ModalContent>
            <ModalTitle>Test modal</ModalTitle>
            Test Content
            <button onClick={() => setOpen(false)}>Close modal</button>
          </ModalContent>
          <ModalFooter>
            <Button>OK</Button>
            <Button variant="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
      </>
    );
  };

  it('should be possible with ESC key', () => {
    const mockEsc = jest.fn();
    const { getByText } = render(
      <RefTest focusOnCloseRef={undefined} onEscKeyDown={mockEsc} />,
    );
    const openButton = getByText('Toggle modal');
    fireEvent.click(openButton);
    const content = getByText('Test Content');
    expect(content).toBeTruthy();
    fireEvent.keyDown(content, {
      key: 'Esc',
      code: 27,
      charCode: 27,
    });
    expect(mockEsc).toHaveBeenCalledTimes(1);
  });

  it('should return focus to original element', async () => {
    const { getByText } = render(<RefTest focusOnCloseRef={undefined} />);
    const openButton = getByText('Toggle modal');
    openButton.focus();
    fireEvent.click(openButton);
    const closeButton = getByText('Close modal');
    expect(closeButton).toBeTruthy();
    fireEvent.click(closeButton);
    await waitFor(() => expect(openButton).toHaveFocus());
  });

  it('should return focus to given element', async () => {
    const { getByText, getByRole } = render(<RefTest />);
    const openButton = getByText('Toggle modal');
    fireEvent.click(openButton);
    const closeButton = getByText('Close modal');
    expect(closeButton).toBeTruthy();
    fireEvent.click(closeButton);
    const input = getByRole('textbox');
    await waitFor(() => expect(input).toHaveFocus());
  });
});
