import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';
import {
  ExpanderGroup,
  Expander,
  ExpanderProps,
  ExpanderTitle,
  ExpanderTitleProps,
  ExpanderContent,
} from '../';

const TestExpanderWithProps = (
  props: Omit<ExpanderProps, 'children'>,
  titleProps: ExpanderTitleProps & { 'data-testid': string },
  content: string,
  key: number,
) => {
  const { children: title, ...titlePassProps } = titleProps;
  return (
    <Expander key={key} {...props}>
      <ExpanderTitle {...titlePassProps}>{title}</ExpanderTitle>
      <ExpanderContent>{content}</ExpanderContent>
    </Expander>
  );
};

const TestExpanderGroup = (
  expanderData: {
    expanderProps: Omit<ExpanderProps, 'children'>;
    titleProps: ExpanderTitleProps & { 'data-testid': string };
    content: string;
  }[],
) => (
  <ExpanderGroup OpenAllText="Open all" CloseAllText="Close all">
    {expanderData.map((d, index) =>
      TestExpanderWithProps(d.expanderProps, d.titleProps, d.content, index),
    )}
  </ExpanderGroup>
);

const basicExpanderProps = [
  {
    expanderProps: {
      id: 'id-first',
    },
    titleProps: { 'data-testid': 'expander-title-1', children: 'First' },
    content: 'First content',
  },
  {
    expanderProps: {
      id: 'id-second',
    },
    titleProps: { 'data-testid': 'expander-title-2', children: 'Second' },
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
            id: 'id-first-2',
          },
          titleProps: {
            'data-testid': 'expander-title-1-1',
            children: 'First but not the best',
          },
          content: 'First but not the content',
        },
        {
          expanderProps: {
            id: 'id-second-2',
          },
          titleProps: { 'data-testid': 'expander-title-2', children: 'Second' },
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
            id: 'id-first',
          },
          titleProps: { 'data-testid': 'expander-title-1', children: 'First' },
          content: 'First content',
        },
        {
          expanderProps: {
            id: 'id-second',
          },
          titleProps: { 'data-testid': 'expander-title-2', children: 'Second' },
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
            id: 'id-first',
          },
          titleProps: { 'data-testid': 'expander-title-1', children: 'First' },
          content: 'First content',
        },
        {
          expanderProps: {
            id: 'id-second',

            defaultOpen: true,
          },
          titleProps: { 'data-testid': 'expander-title-2', children: 'Second' },
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
            id: 'id-first',
          },
          titleProps: {
            'data-testid': 'expander-title-1',
            children: 'First',
          },
          content: 'First content',
        },
        {
          expanderProps: {
            id: 'id-second',
            defaultOpen: true,
            onClick: mockClickHandler,
          },
          titleProps: {
            'data-testid': 'expander-title-2',
            children: 'Second',
            toggleButtonProps: {
              'data-testid': 'toggle-button-2',
            },
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('toggle-button-2');
    const wrapperDiv = getByTestId('expander-title-2');
    fireEvent.mouseDown(button);

    expect(wrapperDiv.classList.contains('fi-expander_title--open')).toBe(
      false,
    );

    expect(
      button
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
            id: 'id-first',
          },
          titleProps: { 'data-testid': 'expander-title-1', children: 'First' },
          content: 'First content',
        },
        {
          expanderProps: {
            onClick: mockClickHandler,
          },
          titleProps: {
            'data-testid': 'expander-title-2',
            children: 'Second',
            toggleButtonProps: {
              'data-testid': 'toggle-button-2',
            },
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('toggle-button-2');
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
            id: 'id-first',
            open: true,
          },
          titleProps: { 'data-testid': 'expander-title-1', children: 'First' },
          content: 'First content',
        },
        {
          expanderProps: {
            id: 'id-second',
            open: true,
          },
          titleProps: {
            'data-testid': 'expander-title-2',
            children: 'Second',
          },
          content: 'Second content',
        },
      ]),
    );
    const wrapperDiv = getByTestId('expander-title-2');
    expect(wrapperDiv.classList.contains('fi-expander_title--open')).toBe(true);

    expect(
      wrapperDiv
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
            id: 'id-first',
            open: true,
          },
          titleProps: { 'data-testid': 'expander-title-1', children: 'First' },
          content: 'First content',
        },
        {
          expanderProps: {
            id: 'id-second',
            onClick: mockClickHandler,
            open: true,
          },
          titleProps: {
            'data-testid': 'expander-title-2',
            children: 'Second',
            toggleButtonProps: {
              'data-testid': 'toggle-button-2',
            },
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('toggle-button-2');
    const wrapperDiv = getByTestId('expander-title-2');
    expect(wrapperDiv.classList.contains('fi-expander_title--open')).toBe(true);
    expect(
      wrapperDiv
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(true);

    fireEvent.mouseDown(button);

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(wrapperDiv.classList.contains('fi-expander_title--open')).toBe(true);

    expect(
      wrapperDiv
        .querySelector('svg')
        ?.classList.contains('fi-expander_title-icon--open'),
    ).toBe(true);
  });

  it('open/close all clicked should not force the state to change.', () => {
    const { getByTestId, getByText } = render(
      TestExpanderGroup([
        {
          expanderProps: {
            id: 'id-first',
            open: false,
          },
          titleProps: { 'data-testid': 'expander-title-1', children: 'First' },
          content: 'First content',
        },
        {
          expanderProps: {
            id: 'id-second',
            open: false,
          },
          titleProps: { 'data-testid': 'expander-title-2', children: 'Second' },
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
          id: 'id-first',
        },
        titleProps: { 'data-testid': 'expander-title-1', children: 'First' },
        content: 'First content',
      },
      {
        expanderProps: {
          id: 'id-second',
        },
        titleProps: { 'data-testid': 'expander-title-2', children: 'Second' },
        content: 'Second content',
      },
    ]),
  ),
);
