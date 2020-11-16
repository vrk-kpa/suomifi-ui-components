import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../utils/test/axe';
import { Expander, ExpanderProps } from './Expander';

const TestExpanderWithProps = (
  props: ExpanderProps,
  content: string,
  key: number,
) => {
  const { title, ...passProps } = props;
  return (
    <Expander key={key} title={title} {...passProps}>
      {content}
    </Expander>
  );
};

const TestExpanderGroup = (
  expanderDatas: { expanderProps: ExpanderProps; content: string }[],
) => (
  <Expander.group OpenAllText="Open all" CloseAllText="Close all">
    {expanderDatas.map((d, index) =>
      TestExpanderWithProps(d.expanderProps, d.content, index),
    )}
  </Expander.group>
);

const basicExpanderProps = [
  {
    expanderProps: {
      title: 'First',
      id: 'id-first',
      titleProps: { 'data-testid': 'expander-title-1' },
    },
    content: 'First content',
  },
  {
    expanderProps: {
      title: 'Second',
      id: 'id-second',
      titleProps: { 'data-testid': 'expander-title-2' },
    },
    content: 'Second content',
  },
];

describe('Basic expander group', () => {
  it('should not remount when calling render with the same component on the same container', () => {
    const { getByTestId, rerender } = render(
      TestExpanderGroup(basicExpanderProps),
    );
    expect(getByTestId('expander-title-1').textContent).toBe('First');
    rerender(
      TestExpanderGroup([
        {
          expanderProps: {
            title: 'First but not the best',
            id: 'id-first-2',
            titleProps: { 'data-testid': 'expander-title-1-1' },
          },
          content: 'First but not the content',
        },
        {
          expanderProps: {
            title: 'Second',
            id: 'id-second-2',
            titleProps: { 'data-testid': 'expander-title-2' },
          },
          content: 'Second content',
        },
      ]),
    );
    expect(getByTestId('expander-title-1-1').textContent).toBe(
      'First but not the best',
    );
  });
  it('should match snapshot', () => {
    const { container } = render(TestExpanderGroup(basicExpanderProps));
    expect(container.firstChild).toMatchSnapshot();
  });
});

describe('default behaviour', () => {
  it('open/close all should open/close the Expanders', () => {
    const { getByTestId, getByText } = render(
      TestExpanderGroup([
        {
          expanderProps: {
            title: 'First',
            id: 'id-first',
            titleProps: { 'data-testid': 'expander-title-1' },
          },
          content: 'First content',
        },
        {
          expanderProps: {
            title: 'Second',
            id: 'id-second',
            titleProps: { 'data-testid': 'expander-title-2' },
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('expander-title-2');
    expect(button.classList.contains('fi-expander_title--open')).toBe(false);
    expect(
      button
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(false);
    const allOpenButton = getByText('Open all');
    fireEvent.mouseDown(allOpenButton);
    expect(button.classList.contains('fi-expander_title--open')).toBe(true);
    expect(
      button
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(true);
    const allCloseButton = getByText('Close all');
    fireEvent.mouseDown(allCloseButton);
    expect(button.classList.contains('fi-expander_title--open')).toBe(false);
    expect(
      button
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(false);
  });
});

describe('defaultOpen', () => {
  it('gives the classname to expander title and icon', () => {
    const { getByTestId } = render(
      TestExpanderGroup([
        {
          expanderProps: {
            title: 'First',
            id: 'id-first',
            titleProps: { 'data-testid': 'expander-title-1' },
          },
          content: 'First content',
        },
        {
          expanderProps: {
            title: 'Second',
            id: 'id-second',
            titleProps: { 'data-testid': 'expander-title-2' },
            defaultOpen: true,
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('expander-title-2');
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
      TestExpanderGroup([
        {
          expanderProps: {
            title: 'First',
            id: 'id-first',
            titleProps: { 'data-testid': 'expander-title-1' },
          },
          content: 'First content',
        },
        {
          expanderProps: {
            title: 'Second',
            id: 'id-second',
            titleProps: { 'data-testid': 'expander-title-2' },
            defaultOpen: true,
            onClick: mockClickHandler,
          },
          content: 'Second content',
        },
      ]),
    );
    const buttonToClick = getByTestId('expander-title-2');
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
  it('is called', () => {
    const mockClickHandler = jest.fn();
    const { getByTestId } = render(
      TestExpanderGroup([
        {
          expanderProps: {
            title: 'First',
            id: 'id-first',
            titleProps: { 'data-testid': 'expander-title-1' },
          },
          content: 'First content',
        },
        {
          expanderProps: {
            title: 'Second',
            titleProps: { 'data-testid': 'expander-title-2' },
            onClick: mockClickHandler,
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('expander-title-2');
    fireEvent.mouseDown(button);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});

describe('open', () => {
  it('open-classnames should be found ', async () => {
    const { getByTestId } = render(
      TestExpanderGroup([
        {
          expanderProps: {
            title: 'First',
            id: 'id-first',
            titleProps: { 'data-testid': 'expander-title-1' },
            open: true,
          },
          content: 'First content',
        },
        {
          expanderProps: {
            title: 'Second',
            id: 'id-second',
            titleProps: { 'data-testid': 'expander-title-2' },
            open: true,
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('expander-title-2');
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
      TestExpanderGroup([
        {
          expanderProps: {
            title: 'First',
            id: 'id-first',
            titleProps: { 'data-testid': 'expander-title-1' },
            open: true,
          },
          content: 'First content',
        },
        {
          expanderProps: {
            title: 'Second',
            id: 'id-second',
            titleProps: {
              'data-testid': 'expander-title-2',
            },
            onClick: mockClickHandler,
            open: true,
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('expander-title-2');
    expect(button.classList.contains('fi-expander_title--open')).toBe(true);
    expect(
      button
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(true);

    fireEvent.mouseDown(button);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(button.classList.contains('fi-expander_title--open')).toBe(true);

    expect(
      button
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(true);
  });

  it('open/close all clicked should not force the state to change.', () => {
    const { getByTestId, getByText } = render(
      TestExpanderGroup([
        {
          expanderProps: {
            title: 'First',
            id: 'id-first',
            titleProps: { 'data-testid': 'expander-title-1' },
            open: false,
          },
          content: 'First content',
        },
        {
          expanderProps: {
            title: 'Second',
            id: 'id-second',
            titleProps: { 'data-testid': 'expander-title-2' },
            open: false,
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('expander-title-2');
    expect(button.classList.contains('fi-expander_title--open')).toBe(false);
    expect(
      button
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(false);
    const allOpenButton = getByText('Open all');
    fireEvent.click(allOpenButton);
    expect(button.classList.contains('fi-expander_title--open')).toBe(false);
    expect(
      button
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(false);
  });
});

test(
  'should not have basic accessibility issues',
  axeTest(
    TestExpanderGroup([
      {
        expanderProps: {
          title: 'First',
          id: 'id-first',
          titleProps: { 'data-testid': 'expander-title-1' },
        },
        content: 'First content',
      },
      {
        expanderProps: {
          title: 'Second',
          id: 'id-second',
          titleProps: { 'data-testid': 'expander-title-2' },
        },
        content: 'Second content',
      },
    ]),
  ),
);
