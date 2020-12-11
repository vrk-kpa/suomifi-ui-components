import React, { ReactNode } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ExpanderProviderState, ExpanderProvider } from '../Expander/Expander';
import {
  ExpanderTitleButton,
  ExpanderTitleButtonProps,
} from './ExpanderTitleButton';

/**
 * A custom render to setup providers. Extends regular
 * render options with `providerProps` to allow injecting
 * different scenarios to test with.
 *
 * @see https://testing-library.com/docs/react-testing-library/setup#custom-render
 */
const customRender = (
  ui: ReactNode,
  {
    providerProps: origProviderProps,
    ...renderOptions
  }: { providerProps: ExpanderProviderState; [key: string]: any },
) => {
  const rendered = render(
    <ExpanderProvider value={origProviderProps}>{ui}</ExpanderProvider>,
    renderOptions,
  );
  return {
    ...rendered,
    rerender: (
      rerenderUi: ReactNode,
      {
        providerProps,
        ...rerenderOptions
      }: { providerProps: ExpanderProviderState },
    ) =>
      customRender(rerenderUi, {
        providerProps,
        container: rendered.container,
        ...rerenderOptions,
      }),
  };
};

const providerProps: ExpanderProviderState = {
  onToggleExpander: () => null,
  open: false,
  titleId: undefined,
  contentId: undefined,
};

describe('Basic ExpanderTitleButton', () => {
  const TestExpanderWithProps = (props?: ExpanderTitleButtonProps) => (
    <ExpanderTitleButton {...{ 'data-testid': 'expander-title' }} {...props}>
      {props?.children ? props.children : 'Expander title button'}
    </ExpanderTitleButton>
  );

  it('render with the same component on the same container does not remount', () => {
    const { rerender, getByTestId } = customRender(TestExpanderWithProps(), {
      providerProps,
    });
    expect(getByTestId('expander-title').textContent).toBe(
      'Expander title button',
    );
    // re-render the same component with different props
    rerender(TestExpanderWithProps({ children: 'Expander title button two' }), {
      providerProps: { ...providerProps },
    });
    expect(getByTestId('expander-title').textContent).toBe(
      'Expander title button two',
    );
  });

  it('shoud match snapshot', () => {
    const expanderRenderer = customRender(TestExpanderWithProps(), {
      providerProps: {
        ...providerProps,
        titleId: 'test-id_title',
        contentId: 'test-id_content',
      },
    });
    const { container } = expanderRenderer;
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Aria attributes', () => {
  const TestExpanderWithProps = (props?: ExpanderTitleButtonProps) => (
    <ExpanderTitleButton
      ariaCloseText="click to close expander"
      ariaOpenText="click to open expander"
      {...{ 'data-testid': 'expander-title' }}
      {...props}
    >
      {props?.children ? props.children : 'Expander title button'}
    </ExpanderTitleButton>
  );

  it('should be passed to title button', () => {
    const { getByText, rerender } = customRender(TestExpanderWithProps(), {
      providerProps,
    });
    expect(getByText('click to open expander')).toBeTruthy();
    const adjustedProviderProps = {
      ...providerProps,
      open: true,
    };
    rerender(TestExpanderWithProps(), {
      providerProps: adjustedProviderProps,
    });
    expect(getByText('click to close expander')).toBeTruthy();
  });
});

describe('Custom id', () => {
  const TestExpanderWithProps = (props?: ExpanderTitleButtonProps) => (
    <ExpanderTitleButton {...props}>
      {props?.children ? props.children : 'Expander title button'}
    </ExpanderTitleButton>
  );

  it('is passed on to button', () => {
    const { getByRole } = customRender(TestExpanderWithProps(), {
      providerProps: {
        ...providerProps,
        titleId: 'test-id_title',
        contentId: 'test-id_content',
      },
    });
    const button = getByRole('button');
    expect(button).toHaveAttribute('id', 'test-id_title');
    expect(button).toHaveAttribute('aria-controls', 'test-id_content');
  });
});

describe('Provider open property', () => {
  const TestExpanderWithProps = (props?: ExpanderTitleButtonProps) => (
    <ExpanderTitleButton
      {...{ 'data-testid': 'expander-open-by-default-title' }}
      {...props}
    >
      {props?.children ? props.children : 'Test expander open by default'}
    </ExpanderTitleButton>
  );

  it('correlates with aria-expanded attribute', () => {
    const { getByRole, rerender } = customRender(TestExpanderWithProps(), {
      providerProps: { ...providerProps, open: true },
    });
    const button = getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'true');
    rerender(TestExpanderWithProps(), {
      providerProps: {
        ...providerProps,
        open: false,
      },
    });
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('gives the classname to expander title and icon', () => {
    const { getByTestId } = customRender(TestExpanderWithProps(), {
      providerProps: { ...providerProps, open: true },
    });
    const div = getByTestId('expander-open-by-default-title');
    expect(div).toHaveClass('fi-expander_title-button--open');
    expect(div.querySelector('svg')).toHaveClass(
      'fi-expander_title-button-icon--open',
    );
  });

  it('will remove open classnames when false', () => {
    const mockClickHandler = jest.fn();
    const { getByTestId, getByRole, rerender } = customRender(
      TestExpanderWithProps(),
      {
        providerProps: {
          ...providerProps,
          open: true,
          onToggleExpander: mockClickHandler,
        },
      },
    );
    const buttonToClick = getByRole('button');
    fireEvent.click(buttonToClick);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    rerender(TestExpanderWithProps(), {
      providerProps: {
        ...providerProps,
        open: false,
      },
    });
    const titleDiv = getByTestId('expander-open-by-default-title');
    expect(titleDiv).toHaveClass('fi-expander_title-button');
    expect(titleDiv).not.toHaveClass('fi-expander_title-button--open');
    expect(buttonToClick.querySelector('svg')).not.toHaveClass(
      'fi-expander_title-button-icon--open',
    );
  });
});
