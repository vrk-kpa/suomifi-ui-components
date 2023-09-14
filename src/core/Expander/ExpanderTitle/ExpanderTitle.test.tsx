import React, { ReactNode } from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ExpanderProviderState, ExpanderProvider } from '../Expander/Expander';
import { ExpanderTitle, ExpanderTitleProps } from './ExpanderTitle';

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

describe('Basic ExpanderTitle', () => {
  const TestExpanderWithProps = (props?: Partial<ExpanderTitleProps>) => (
    <ExpanderTitle
      {...{ 'data-testid': 'expander-title' }}
      {...props}
      toggleButtonAriaText="toggle"
      toggleButtonAriaDescribedBy="title-id"
    >
      {props?.children ? (
        props.children
      ) : (
        <span id="title-id">Expander title button</span>
      )}
    </ExpanderTitle>
  );

  it('render with the same component on the same container does not remount', () => {
    const { rerender, getByTestId } = customRender(TestExpanderWithProps(), {
      providerProps,
    });
    expect(getByTestId('expander-title').textContent).toBe(
      'Expander title buttontoggle',
    );
    // re-render the same component with different props
    rerender(TestExpanderWithProps({ children: 'Expander title button two' }), {
      providerProps: { ...providerProps },
    });
    expect(getByTestId('expander-title').textContent).toBe(
      'Expander title button twotoggle',
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
  const TestExpanderWithProps = (props?: ExpanderTitleProps) => (
    <ExpanderTitle
      toggleButtonAriaText="toggle"
      toggleButtonAriaDescribedBy="title-id"
      {...{ 'data-testid': 'expander-title' }}
      {...props}
    >
      {props?.children ? (
        props.children
      ) : (
        <span id="title-id">Expander title button</span>
      )}
    </ExpanderTitle>
  );

  it('should be passed to title button', () => {
    const { getByText, getByRole, rerender } = customRender(
      TestExpanderWithProps(),
      {
        providerProps,
      },
    );
    expect(getByRole('button')).toHaveAttribute('aria-describedby', 'title-id');
    expect(getByText('toggle')).toBeTruthy();
    const adjustedProviderProps = {
      ...providerProps,
      open: true,
    };
    rerender(TestExpanderWithProps(), {
      providerProps: adjustedProviderProps,
    });
    expect(getByText('toggle')).toBeTruthy();
  });
});

describe('Custom id', () => {
  const TestExpanderWithProps = (props?: ExpanderTitleProps) => (
    <ExpanderTitle
      {...props}
      toggleButtonAriaText="toggle"
      toggleButtonAriaDescribedBy="title-id"
    >
      {props?.children ? (
        props.children
      ) : (
        <span id="title-id">Expander title button</span>
      )}
    </ExpanderTitle>
  );

  it('is passed on to content and set to button aria-controls', () => {
    const { getByRole, getByText } = customRender(TestExpanderWithProps(), {
      providerProps: {
        ...providerProps,
        titleId: 'test-id_title',
        contentId: 'test-id_content',
      },
    });
    const span = getByText('Expander title button');
    expect(span.parentElement).toHaveAttribute('id', 'test-id_title');
    const button = getByRole('button');
    expect(button).toHaveAttribute('aria-controls', 'test-id_content');
  });
});

describe('Provider open property', () => {
  const TestExpanderWithProps = (props?: ExpanderTitleProps) => (
    <ExpanderTitle
      {...{ 'data-testid': 'expander-open-by-default-title' }}
      toggleButtonAriaText="toggle"
      toggleButtonAriaDescribedBy="title-id"
      {...props}
    >
      {props?.children ? (
        props.children
      ) : (
        <span id="title-id">Test expander open by default</span>
      )}
    </ExpanderTitle>
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
    expect(div).toHaveClass('fi-expander_title--open');
    expect(div.querySelector('svg')).toHaveClass(
      'fi-expander_title-icon--open',
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
    expect(titleDiv).toHaveClass('fi-expander_title');
    expect(titleDiv).not.toHaveClass('fi-expander_title--open');
    expect(buttonToClick.querySelector('svg')).not.toHaveClass(
      'fi-expander_title-icon--open',
    );
  });
});
