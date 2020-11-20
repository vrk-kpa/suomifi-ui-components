import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';
import { Expander, ExpanderProps } from './Expander';
import {
  ExpanderContent,
  ExpanderContentProps,
  ExpanderTitle,
  ExpanderTitleProps,
} from '../';
import { cssFromBaseStyles } from '../../utils';
import { baseStyles } from './Expander.baseStyles';

const TestExpanderWithProps = (
  props: Omit<ExpanderProps, 'children'>,
  titleProps: ExpanderTitleProps,
  contentProps: ExpanderContentProps,
  testId?: string,
) => {
  const { id = 'test-id', ...passProps } = props;
  return (
    <Expander id={id} {...passProps}>
      <ExpanderTitle
        {...titleProps}
        {...(testId ? { 'data-testid': testId } : {})}
      />
      <ExpanderContent {...contentProps} />
    </Expander>
  );
};

const TestExpander = TestExpanderWithProps(
  {
    className: 'expander-test',
  },
  {
    children: 'Test expander',
  },
  {
    children: 'Test expander content',
  },
  'expander-title',
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
          className: 'expander-test',
        },
        {
          children: 'Test expander two',
        },
        {
          children: 'Test expander content',
        },
        'expander-title-2',
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
      <Expander className="expander-open-by-default-test" defaultOpen={true}>
        <ExpanderTitle {...{ 'data-testid': 'expander-open-by-default-title' }}>
          Test expander open by default
        </ExpanderTitle>
        <ExpanderContent>Test expander open by default content</ExpanderContent>
      </Expander>,
    );

    const div = getByTestId('expander-open-by-default-title');
    expect(div.classList.contains('fi-expander_title--open')).toBe(true);
    expect(
      div
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(true);
  });

  it('classnames will be removed when clicked', () => {
    const mockClickHandler = jest.fn();
    const { getByTestId } = render(
      <Expander onClick={mockClickHandler}>
        <ExpanderTitle {...{ 'data-testid': 'expander-open-by-default-title' }}>
          Test expander open by default
        </ExpanderTitle>
        <ExpanderContent>Test expander open by default content</ExpanderContent>
      </Expander>,
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
    const { getByRole } = render(
      <Expander onClick={mockClickHandler}>
        <ExpanderTitle>Test expander open by default</ExpanderTitle>
        <ExpanderContent>Test expander open by default content</ExpanderContent>
      </Expander>,
    );
    const button = getByRole('button');
    fireEvent.mouseDown(button);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});

describe('open', () => {
  const ControlledExpander = (props?: Partial<ExpanderProps>) => (
    <Expander className="expander-onclick-test" open={true} {...props}>
      <ExpanderTitle {...{ 'data-testid': 'expander-title-id' }}>
        Test expander onClick testing
      </ExpanderTitle>
      <ExpanderContent>Test expander click testing content</ExpanderContent>
    </Expander>
  );

  it('open-classnames should be found ', async () => {
    const { getByTestId } = render(ControlledExpander());
    const div = getByTestId('expander-title-id');
    expect(div.classList.contains('fi-expander_title--open')).toBe(true);

    expect(
      div
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(true);
  });

  it('is clicked. Should not change as it is controlled outside', async () => {
    const mockClickHandler = jest.fn();
    const { getByRole, getByTestId } = render(
      ControlledExpander({ onClick: mockClickHandler }),
    );
    const button = getByRole('button');
    fireEvent.mouseDown(button);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    const div = getByTestId('expander-title-id');
    expect(div.classList.contains('fi-expander_title--open')).toBe(true);

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
