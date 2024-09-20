import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test';
import {
  ExpanderGroup,
  ExpanderGroupProps,
  Expander,
  ExpanderProps,
  ExpanderTitleButton,
  ExpanderTitleButtonProps,
  ExpanderContent,
} from '../';

const TestExpanderWithProps = (
  props: Omit<ExpanderProps, 'children'>,
  titleProps: ExpanderTitleButtonProps & { 'data-testid': string },
  content: string,
  key: number,
) => {
  const { children: title, ...titlePassProps } = titleProps;
  return (
    <Expander key={key} {...props}>
      <ExpanderTitleButton {...titlePassProps}>{title}</ExpanderTitleButton>
      <ExpanderContent>{content}</ExpanderContent>
    </Expander>
  );
};

const TestExpanderGroup = (
  expanderData: {
    expanderProps: Omit<ExpanderProps, 'children'>;
    titleProps: ExpanderTitleButtonProps & { 'data-testid': string };
    content: string;
  }[],
  expanderGroupProps?: Partial<ExpanderGroupProps>,
) => (
  <ExpanderGroup
    openAllText="Open all"
    closeAllText="Close all"
    ariaOpenAllText="Open all expanders"
    ariaCloseAllText="Close all expanders"
    {...expanderGroupProps}
  >
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
  const DefaultGroup = TestExpanderGroup(
    [
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
        titleProps: {
          'data-testid': 'expander-title-2',
          children: 'Second',
          toggleButtonProps: { 'data-testid': 'expander-title-2-button' },
        },
        content: 'Second content',
      },
    ],
    { toggleAllButtonProps: { 'data-testid': 'open-all-button' } },
  );
  it('open/close all should open/close the Expanders', () => {
    const { getByTestId } = render(DefaultGroup);
    const titleDiv = getByTestId('expander-title-2');
    const button = getByTestId('expander-title-2-button');
    expect(titleDiv).not.toHaveClass('fi-expander_title-button--open');
    expect(button.querySelector('svg')).not.toHaveClass(
      'fi-expander_title-button-icon--open',
    );
    fireEvent.click(button);
    expect(titleDiv).toHaveClass('fi-expander_title-button--open');
    expect(button.querySelector('svg')).toHaveClass(
      'fi-expander_title-button-icon--open',
    );
    fireEvent.click(button);
    expect(titleDiv).not.toHaveClass('fi-expander_title-button--open');
    expect(button.querySelector('svg')).not.toHaveClass(
      'fi-expander_title-button-icon--open',
    );
  });
  it('open/close all should have providedTexts and screen reader texts', async () => {
    const { getByTestId, getByText } = render(DefaultGroup);
    const buttonVisibleText = getByText('Open all');
    expect(buttonVisibleText).toHaveAttribute('aria-hidden', 'true');
    const buttonAriaText = getByText('Open all expanders');
    expect(buttonAriaText).toHaveClass('fi-visually-hidden');
    const openAllbutton = getByTestId('open-all-button');
    fireEvent.click(openAllbutton);
    const buttonVisibleCloseText = getByText('Close all');
    expect(buttonVisibleCloseText).toHaveAttribute('aria-hidden', 'true');
    const buttonAriaCloseText = getByText('Close all expanders');
    expect(buttonAriaCloseText).toHaveClass('fi-visually-hidden');
  });
});

describe('Toggle all button', () => {
  it('should be hidden when showToggleAllButton is false', () => {
    const { queryByTestId } = render(
      TestExpanderGroup(
        [
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
            },
            titleProps: {
              'data-testid': 'expander-title-2',
              children: 'Second',
            },
            content: 'Second content',
          },
        ],
        {
          toggleAllButtonProps: {
            'data-testid': 'toggle-all-button',
          },
          showToggleAllButton: false,
        },
      ),
    );
    const toggleAllButton = queryByTestId('toggle-all-button');
    expect(toggleAllButton).toBeNull();
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
    const titleDiv = getByTestId('expander-title-2');
    expect(titleDiv).toHaveClass('fi-expander_title-button--open');
    expect(titleDiv.querySelector('svg')).toHaveClass(
      'fi-expander_title-button-icon--open',
    );
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
            onOpenChange: mockClickHandler,
          },
          titleProps: {
            'data-testid': 'expander-title-2',
            children: 'Second',
            toggleButtonProps: {
              'data-testid': 'expander-title-2-button',
            },
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('expander-title-2-button');
    const titleDiv = getByTestId('expander-title-2');
    expect(titleDiv).toHaveClass('fi-expander_title-button--open');
    fireEvent.click(button);
    expect(button.querySelector('svg')).not.toHaveClass(
      'fi-expander_title-button-icon--open',
    );
  });
});

describe('onOpenChange', () => {
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
            onOpenChange: mockClickHandler,
          },
          titleProps: {
            'data-testid': 'expander-title-2',
            children: 'Second',
            toggleButtonProps: {
              'data-testid': 'expander-title-2-button',
            },
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('expander-title-2-button');
    fireEvent.click(button);
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
    const titleDiv = getByTestId('expander-title-2');
    expect(titleDiv).toHaveClass('fi-expander_title-button--open');

    expect(titleDiv.querySelector('svg')).toHaveClass(
      'fi-expander_title-button-icon--open',
    );
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
            onOpenChange: mockClickHandler,
            open: true,
          },
          titleProps: {
            'data-testid': 'expander-title-2',
            children: 'Second',
            toggleButtonProps: {
              'data-testid': 'expander-title-2-button',
            },
          },
          content: 'Second content',
        },
      ]),
    );
    const button = getByTestId('expander-title-2-button');
    const titleDiv = getByTestId('expander-title-2');
    expect(titleDiv).toHaveClass('fi-expander_title-button--open');
    expect(titleDiv.querySelector('svg')).toHaveClass(
      'fi-expander_title-button-icon--open',
    );
    fireEvent.click(button);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(titleDiv).toHaveClass('fi-expander_title-button--open');
    expect(titleDiv.querySelector('svg')).toHaveClass(
      'fi-expander_title-button-icon--open',
    );
  });

  it('open/close all clicked should not force the state to change.', () => {
    const { getByTestId } = render(
      TestExpanderGroup(
        [
          {
            expanderProps: {
              id: 'id-first',
              open: false,
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
              open: false,
            },
            titleProps: {
              'data-testid': 'expander-title-2',
              children: 'Second',
              toggleButtonProps: {
                'data-testid': 'expander-title-2-button',
              },
            },
            content: 'Second content',
          },
        ],
        {
          toggleAllButtonProps: {
            'data-testid': 'open-all-button',
          },
        },
      ),
    );
    const titleDiv = getByTestId('expander-title-2');
    const button = getByTestId('expander-title-2-button');
    expect(titleDiv).not.toHaveClass('fi-expander_title-button--open');
    expect(button.querySelector('svg')).not.toHaveClass(
      'fi-expander_title-button-icon--open',
    );
    const openAllButton = getByTestId('open-all-button');

    fireEvent.click(openAllButton);
    expect(titleDiv).not.toHaveClass('fi-expander_title-button--open');
    expect(button.querySelector('svg')).not.toHaveClass(
      'fi-expander_title-button-icon--open',
    );
  });
});

describe('margin prop', () => {
  it('should have margin style from margin prop', () => {
    const { getByTestId } = render(
      <ExpanderGroup
        openAllText="Open all"
        ariaOpenAllText="Open all expanders"
        closeAllText="Close all"
        ariaCloseAllText="Close all expanders"
        data-testid="expander-group"
        margin="xs"
      >
        <Expander>Test</Expander>
      </ExpanderGroup>,
    );
    const div = getByTestId('expander-group');
    expect(div).toHaveStyle('margin: 10px');
  });
});

it('should have margin style overridden by style prop', async () => {
  const { getByTestId } = render(
    <ExpanderGroup
      openAllText="Open all"
      ariaOpenAllText="Open all expanders"
      closeAllText="Close all"
      ariaCloseAllText="Close all expanders"
      data-testid="expander-group"
      margin="xs"
      style={{ margin: 2 }}
    >
      <Expander>Test</Expander>
    </ExpanderGroup>,
  );
  const div = getByTestId('expander-group');
  expect(div).toHaveAttribute('style', 'margin: 2px;');
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
