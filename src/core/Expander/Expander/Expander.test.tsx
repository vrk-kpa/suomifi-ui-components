import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';
import { Expander, ExpanderProps } from './Expander';
import { ExpanderContent, ExpanderTitle, ExpanderTitleProps } from '../';
import { cssFromBaseStyles } from '../../utils';
import { baseStyles } from './Expander.baseStyles';

describe('Basic expander', () => {
  const TestExpanderWithProps = (titleProps: ExpanderTitleProps) => {
    return (
      <Expander className="expander-test">
        <ExpanderTitle
          {...titleProps}
          {...{ 'data-testid': 'expander-title' }}
        />
        <ExpanderContent>Test expander content</ExpanderContent>
      </Expander>
    );
  };

  const TestExpander = TestExpanderWithProps({
    children: 'Test expander',
  });

  it('render with the same component on the same container does not remount', () => {
    const { getByTestId, rerender } = render(TestExpander);
    expect(getByTestId('expander-title').textContent).toBe('Test expander');

    // re-render the same component with different props
    rerender(
      TestExpanderWithProps({
        children: 'Test expander two',
      }),
    );
    expect(getByTestId('expander-title').textContent).toBe('Test expander two');
  });

  it('shoud match snapshot', () => {
    const expanderRenderer = render(TestExpander);
    const { container } = expanderRenderer;
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', axeTest(TestExpander));
});

describe('Custom id', () => {
  const ExpanderWithCustomId = (
    <Expander id="test-id" {...{ 'data-testid': 'expander-custom-id' }}>
      <ExpanderTitle
        toggleButtonProps={{ 'data-testid': 'expander-custom-id-title' }}
      >
        Test expander with custom id
      </ExpanderTitle>
      <ExpanderContent {...{ 'data-testid': 'expander-custom-id-content' }}>
        Test expander with custom id content
      </ExpanderContent>
    </Expander>
  );

  it('is passed on to expander', () => {
    const { getByTestId } = render(ExpanderWithCustomId);
    const div = getByTestId('expander-custom-id');
    expect(div).toHaveAttribute('id', 'test-id');
  });

  it('is passed on to title', () => {
    const { getByTestId } = render(ExpanderWithCustomId);
    const div = getByTestId('expander-custom-id-title');
    expect(div).toHaveAttribute('id', 'test-id_title');
  });

  it('is passed on to content', () => {
    const { getByTestId } = render(ExpanderWithCustomId);
    const div = getByTestId('expander-custom-id-content');
    expect(div).toHaveAttribute('id', 'test-id_content');
  });
});

describe('defaultOpen', () => {
  const DefaultOpenExpander = (props?: Omit<ExpanderProps, 'children'>) => (
    <Expander {...props} defaultOpen={true}>
      <ExpanderTitle {...{ 'data-testid': 'expander-open-by-default-title' }}>
        Test expander open by default
      </ExpanderTitle>
      <ExpanderContent>Test expander open by default content</ExpanderContent>
    </Expander>
  );

  it('gives the classname to expander title and icon', () => {
    const { getByTestId } = render(DefaultOpenExpander());
    const div = getByTestId('expander-open-by-default-title');
    expect(div).toHaveClass('fi-expander_title--open');
    expect(div.querySelector('svg')).toHaveClass(
      'fi-expander_title-icon--open',
    );
  });

  it('classnames will be removed when clicked', () => {
    const mockClickHandler = jest.fn();
    const { getByTestId, getByRole } = render(
      DefaultOpenExpander({ onOpenChange: mockClickHandler }),
    );
    const buttonToClick = getByRole('button');
    const titleDiv = getByTestId('expander-open-by-default-title');
    fireEvent.click(buttonToClick);
    expect(titleDiv).toHaveClass('fi-expander_title');
    expect(titleDiv).not.toHaveClass('fi-expander_title--open');
    expect(buttonToClick.querySelector('svg')).not.toHaveClass(
      'fi-expander_title-icon--open',
    );
  });
});

describe('onOpenChange', () => {
  it('is called', async () => {
    const mockClickHandler = jest.fn();
    const { getByRole } = render(
      <Expander onOpenChange={mockClickHandler}>
        <ExpanderTitle>Test expander open by default</ExpanderTitle>
        <ExpanderContent>Test expander open by default content</ExpanderContent>
      </Expander>,
    );
    const button = getByRole('button');
    fireEvent.click(button);
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
    expect(div).toHaveClass('fi-expander_title--open');

    expect(div.querySelector('svg')).toHaveClass(
      'fi-expander_title-icon--open',
    );
  });

  it('is clicked. Should not change as it is controlled outside', async () => {
    const mockClickHandler = jest.fn();
    const { getByRole, getByTestId } = render(
      ControlledExpander({ onOpenChange: mockClickHandler }),
    );
    const button = getByRole('button');
    fireEvent.click(button);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    const div = getByTestId('expander-title-id');
    expect(div).toHaveClass('fi-expander_title--open');

    expect(button.querySelector('svg')).toHaveClass(
      'fi-expander_title-icon--open',
    );
  });
});

test('CSS export', () => {
  const css = cssFromBaseStyles(baseStyles);
  expect(css).toEqual(expect.stringContaining('background-color'));
});
