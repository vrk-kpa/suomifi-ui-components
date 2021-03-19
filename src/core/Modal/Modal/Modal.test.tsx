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
    const { container } = render(BasicModal({ className: 'test-class-name' }));
    expect(container.firstChild).toHaveClass('test-class-name');
  });

  it('should match snapshot', () => {
    const { container } = render(BasicModal());
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', axeTest(BasicModal()));
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
    const { container } = render(ModalWithProps({ variant: 'smallScreen' }));
    expect(container.firstChild).toHaveClass('fi-modal--small-screen');
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

  it('should be on primary button if there is no other focusable content', async () => {
    const { getAllByRole } = render(ModalWithProps(<p>Modal Content</p>));
    await waitFor(() => expect(getAllByRole('button')[0]).toHaveFocus());
  });

  it('should be on the first element by default', async () => {
    const { getByRole } = render(ModalWithProps(<input type="text" />));
    await waitFor(() => expect(getByRole('textbox')).toHaveFocus());
  });

  it('should be on given element by default', async () => {
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
