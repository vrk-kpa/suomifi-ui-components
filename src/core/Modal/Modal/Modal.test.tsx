import React, { ReactNode, useRef, useState } from 'react';
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { axeTest } from '../../../utils/test';

import { Modal, ModalProps } from './Modal';
import { ModalContent, ModalFooter, ModalTitle } from '../';
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

describe('Basic modal', () => {
  const text = 'Modal Content';
  const BasicModal = (props?: Partial<ModalProps>) => (
    <Modal
      appElementId="root"
      visible={true}
      {...props}
      ariaLabelledBy="test12"
    >
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
    const { baseElement } = render(BasicModal({ visible: false }));
    expect(baseElement.querySelector('[class~="fi-modal"]')).toBe(null);
  });

  it('should have given className', () => {
    const { getByRole } = render(BasicModal({ className: 'test-class-name' }));
    expect(getByRole('dialog')).toHaveClass('test-class-name');
  });

  it('should match snapshot', () => {
    const { baseElement } = render(BasicModal());
    expect(baseElement).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', () => {
    const { baseElement } = render(BasicModal());
    axeTest(baseElement as any);
  });

  it('should have given aria-labelledby', () => {
    const { getByRole } = render(BasicModal());
    expect(getByRole('dialog')).toHaveAttribute('aria-labelledby', 'test12');
  });
});

describe('Modal sibling DOM nodes', () => {
  const ModalWithSiblings = () => {
    const [open, setOpen] = useState(true);
    return (
      <Modal appElementId="root" visible={open}>
        <ModalContent>
          <ModalTitle>Test modal</ModalTitle>
          <p>Some test text</p>
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>OK</Button>
        </ModalFooter>
      </Modal>
    );
  };

  it('containing the modal should not be aria-hidden', () => {
    const { baseElement } = render(<ModalWithSiblings />);
    const modalRoot = baseElement.querySelector('[class~="fi-modal_base"]');
    expect(modalRoot).not.toHaveAttribute('aria-hidden');
  });

  it('not containing the modal should be aria-hidden', () => {
    const { baseElement } = render(<ModalWithSiblings />);
    const appRootNode = baseElement.querySelector('#root');
    expect(appRootNode).toHaveAttribute('aria-hidden', 'true');
  });

  it('should preserve aria-hidden and role state after closing modal', () => {
    const { getByRole, baseElement } = render(<ModalWithSiblings />);
    fireEvent.click(getByRole('button'));
    const appRootNode = baseElement.querySelector('#root');
    expect(appRootNode).not.toHaveAttribute('aria-hidden');
  });
});

describe('Modal variant', () => {
  const ModalWithProps = (props?: Partial<ModalProps>) => (
    <Modal appElementId="root" visible={true} {...props}>
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

describe('Modal style', () => {
  it('should have given inline styles', () => {
    const { getByRole } = render(
      <Modal appElementId="root" visible={true} style={{ width: '1000px' }}>
        <ModalContent>
          <ModalTitle>Test modal</ModalTitle>
          <p>Modal Content</p>
        </ModalContent>
        <ModalFooter>
          <Button>OK</Button>
          <Button variant="secondary">Cancel</Button>
        </ModalFooter>
      </Modal>,
    );
    expect(getByRole('dialog')).toHaveStyle('width: 1000px');
  });
});

describe('Modal focus', () => {
  const ModalWithProps = (children: ReactNode, props?: Partial<ModalProps>) => (
    <Modal appElementId="root" visible={true} {...props}>
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
    const ModalWithFocusOnOpenRef = (props?: Partial<ModalProps>) => {
      const buttonRef = React.createRef<HTMLButtonElement>();
      return (
        <Modal
          appElementId="root"
          visible={true}
          focusOnOpenRef={buttonRef}
          {...props}
        >
          <ModalContent>
            <ModalTitle>Test modal</ModalTitle>
            <button>Test button 1</button>
            <button ref={buttonRef}>Test button 2</button>
          </ModalContent>
          <ModalFooter>
            <Button>OK</Button>
            <Button variant="secondary">Cancel</Button>
          </ModalFooter>
        </Modal>
      );
    };
    const { getByText } = render(<ModalWithFocusOnOpenRef />);
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
          appElementId="root"
          visible={open}
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
      <RefTest
        focusOnCloseRef={undefined}
        onEscKeyDown={() => {
          mockEsc();
        }}
      />,
    );
    const openButton = getByText('Toggle modal');
    fireEvent.click(openButton);
    const content = getByText('Test Content');
    expect(content).toBeTruthy();

    fireEvent.keyDown(content, {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
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
