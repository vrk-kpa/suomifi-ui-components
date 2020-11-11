import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../utils/test/axe';

import { Expander, ExpanderProps } from './Expander';
import { cssFromBaseStyles } from '../utils';
import { baseStyles } from './Expander.baseStyles';

const TestExpanderWithProps = (props: ExpanderProps, content: string) => {
  const { title, ...passProps } = props;
  return (
    <Expander title={title} {...passProps}>
      {content}
    </Expander>
  );
};

const TestExpander = TestExpanderWithProps(
  {
    title: 'Test expander',
    titleProps: { 'data-testid': 'expander-title' },
    className: 'expander-test',
  },
  'Test expander content',
);
describe('Basic expander', () => {
  it('render with the same component on the same container does not remount', () => {
    const expanderRenderer = render(TestExpander);
    const { getByTestId, rerender } = expanderRenderer;
    expect(getByTestId('expander-title').textContent).toBe('Test expander');

    // re-render the same component with different props
    rerender(
      TestExpanderWithProps(
        {
          title: 'Test expander two',
          titleProps: { 'data-testid': 'expander-title-2' },
          className: 'expander-test',
        },
        'Test expander content',
      ),
    );
    expect(getByTestId('expander-title-2').textContent).toBe(
      'Test expander two',
    );
  });

  it('shoud match snapshot', () => {
    const expanderRenderer = render(TestExpander);
    const { container } = expanderRenderer;
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('defaultOpen', () => {
  it('gives the classname to expander title and icon', () => {
    const { getByTestId } = render(
      TestExpanderWithProps(
        {
          title: 'Test expander open by default',
          titleProps: { 'data-testid': 'expander-open-by-default-title' },
          className: 'expander-open-by-default-test',
          defaultOpen: true,
        },
        'Test expander open by default content',
      ),
    );

    const button = getByTestId('expander-open-by-default-title');
    expect(button.classList.contains('fi-expander_title--open')).toBe(true);

    expect(
      button
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(true);
  });

  it('classnames will be removed when clicked', () => {
    const mockClickHandler = jest.fn();
    const { getByTestId } = render(
      TestExpanderWithProps(
        {
          title: 'Test expander open by default',
          titleProps: { 'data-testid': 'expander-open-by-default-title' },
          className: 'expander-open-by-default-test',
          defaultOpen: true,
          onClick: mockClickHandler,
        },
        'Test expander open by default content',
      ),
    );

    const buttonToClick = getByTestId('expander-open-by-default-title');
    fireEvent.mouseDown(buttonToClick);

    expect(buttonToClick.classList.contains('fi-expander_title--open')).toBe(
      false,
    );

    expect(
      buttonToClick
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(false);
  });
});

describe('onClick', () => {
  it('is called', async () => {
    const mockClickHandler = jest.fn();
    const { getByTestId } = render(
      TestExpanderWithProps(
        {
          title: 'Test expander onClick testing',
          titleProps: {
            'data-testid': 'expander-onclick-testing-title',
            onClick: mockClickHandler,
          },
          className: 'expander-onclick-test',
        },
        'Test expander click testing content',
      ),
    );
    const button = getByTestId('expander-onclick-testing-title');
    fireEvent.mouseDown(button);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});

describe('open', () => {
  it('open-classnames should be found ', async () => {
    const { getByTestId } = render(
      TestExpanderWithProps(
        {
          title: 'Test expander onClick testing',
          titleProps: {
            'data-testid': 'expander-onclick-testing-title',
          },
          className: 'expander-onclick-test',
          open: true,
        },
        'Test expander click testing content',
      ),
    );
    const button = getByTestId('expander-onclick-testing-title');
    expect(button.classList.contains('fi-expander_title--open')).toBe(true);

    expect(
      button
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(true);
  });

  it('is clicked. Should not change as it is controlled outside', async () => {
    const mockClickHandler = jest.fn();
    const { getByTestId } = render(
      TestExpanderWithProps(
        {
          title: 'Test expander onClick testing',
          titleProps: {
            'data-testid': 'expander-onclick-testing-title',
            onClick: mockClickHandler,
          },
          className: 'expander-onclick-test',
          open: true,
        },
        'Test expander click testing content',
      ),
    );
    const button = getByTestId('expander-onclick-testing-title');
    fireEvent.mouseDown(button);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(button.classList.contains('fi-expander_title--open')).toBe(true);

    expect(
      button
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(true);
  });
});

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('background-color'));
});

test('should not have basic accessibility issues', axeTest(TestExpander));
