/* eslint-disable no-shadow */
import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { ExpanderProviderState, ExpanderProvider } from '../Expander/Expander';
import { ExpanderContent, ExpanderContentProps } from './ExpanderContent';

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
    providerProps,
    ...renderOptions
  }: { providerProps: ExpanderProviderState; [key: string]: any },
) => {
  const rendered = render(
    <ExpanderProvider value={providerProps}>{ui}</ExpanderProvider>,
    renderOptions,
  );
  return {
    ...rendered,
    rerender: (
      ui: ReactNode,
      {
        providerProps,
        ...renderOptions
      }: { providerProps: ExpanderProviderState },
    ) =>
      customRender(ui, {
        providerProps,
        container: rendered.container,
        ...renderOptions,
      }),
  };
};

const providerProps: ExpanderProviderState = {
  onToggleExpander: () => null,
  open: false,
  titleId: 'test-id_title',
  contentId: 'test-id_content',
};

describe('Basic ExpanderContent', () => {
  const TestExpanderContentWithProps = (
    props?: Partial<ExpanderContentProps>,
  ) => (
    <ExpanderContent {...{ 'data-testid': 'expander-content' }} {...props}>
      {props?.children ? props.children : 'Expander content'}
    </ExpanderContent>
  );

  it('render with the same component on the same container does not remount', () => {
    const { rerender, getByTestId } = customRender(
      TestExpanderContentWithProps(),
      {
        providerProps,
      },
    );
    expect(getByTestId('expander-content').textContent).toBe(
      'Expander content',
    );
    // re-render the same component with different props
    rerender(
      TestExpanderContentWithProps({ children: 'Expander content two' }),
      {
        providerProps: { ...providerProps },
      },
    );
    expect(getByTestId('expander-content').textContent).toBe(
      'Expander content two',
    );
  });

  it('shoud match snapshot', () => {
    const expanderRenderer = customRender(TestExpanderContentWithProps(), {
      providerProps,
    });
    const { container } = expanderRenderer;
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('Custom id', () => {
  const TestExpanderContentWithProps = (props?: ExpanderContentProps) => (
    <ExpanderContent {...{ 'data-testid': 'expander-content' }} {...props}>
      {props?.children ? props.children : 'Expander content'}
    </ExpanderContent>
  );

  it('is passed on to content', () => {
    const { getByTestId } = customRender(TestExpanderContentWithProps(), {
      providerProps,
    });
    const div = getByTestId('expander-content');
    expect(div).toHaveAttribute('id', 'test-id_content');
    expect(div).toHaveAttribute('aria-labelledby', 'test-id_title');
  });
});

describe('Provider open property', () => {
  const TestExpanderContentWithProps = (props?: ExpanderContentProps) => (
    <ExpanderContent {...{ 'data-testid': 'expander-content' }} {...props}>
      {props?.children ? props.children : 'Expander content'}
    </ExpanderContent>
  );

  it('sets contents visible when true', () => {
    const { getByTestId } = customRender(TestExpanderContentWithProps(), {
      providerProps: { ...providerProps, open: true },
    });
    const div = getByTestId('expander-content');
    expect(div).toHaveClass('fi-expander_content--open');
  });

  it('hides contents when false', () => {
    const { getByTestId, rerender } = customRender(
      TestExpanderContentWithProps(),
      {
        providerProps: {
          ...providerProps,
          open: false,
        },
      },
    );
    rerender(TestExpanderContentWithProps(), {
      providerProps: {
        ...providerProps,
        open: false,
      },
    });
    const contentDiv = getByTestId('expander-content');
    expect(contentDiv).toHaveClass('fi-expander_content');
    expect(contentDiv).not.toHaveClass('fi-expander_content--open');
  });
});
