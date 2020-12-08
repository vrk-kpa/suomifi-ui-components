import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../utils/test/axe';
import { Expander, ExpanderProps } from './Expander';
import {
  ExpanderContent,
  ExpanderTitleButton,
  ExpanderTitleButtonProps,
} from '../';

describe('Basic expander', () => {
  const TestExpanderWithProps = (titleProps: ExpanderTitleButtonProps) => {
    return (
      <Expander className="expander-test">
        <ExpanderTitleButton
          {...titleProps}
          {...{ 'data-testid': 'expander-title' }}
        />
        <ExpanderContent>Test expander content</ExpanderContent>
      </Expander>
    );
  };

  const TestExpander = TestExpanderWithProps({
    ariaCloseText: 'click to close expander',
    ariaOpenText: 'click to open expander',
    children: 'Test expander',
  });

  it('render with the same component on the same container does not remount', () => {
    const { getByTestId, rerender } = render(TestExpander);
    expect(getByTestId('expander-title').textContent).toBe(
      'Test expanderclick to open expander',
    );

    // re-render the same component with different props
    rerender(
      TestExpanderWithProps({
        ariaCloseText: 'click to close expander',
        ariaOpenText: 'click to open expander',
        children: 'Test expander two',
      }),
    );
    expect(getByTestId('expander-title').textContent).toBe(
      'Test expander twoclick to open expander',
    );
  });

  it('shoud match snapshot', () => {
    const expanderRenderer = render(TestExpander);
    const { container } = expanderRenderer;
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should not have basic accessibility issues', axeTest(TestExpander));
});

describe('ExpanderTitleButton Aria attributes', () => {
  const TestExpanderWithProps = (titleProps: ExpanderTitleButtonProps) => {
    return (
      <Expander className="expander-test">
        <ExpanderTitleButton
          {...titleProps}
          {...{ 'data-testid': 'expander-title' }}
        />
        <ExpanderContent>Test expander content</ExpanderContent>
      </Expander>
    );
  };

  it('should be passed to title button', () => {
    const TestExpander = TestExpanderWithProps({
      ariaCloseText: 'click to close expander',
      ariaOpenText: 'click to open expander',
      children: 'Test expander',
    });
    const { getByText, getByRole } = render(TestExpander);
    const button = getByRole('button');
    expect(getByText('click to open expander')).toBeTruthy();
    fireEvent.click(button);
    expect(getByText('click to close expander')).toBeTruthy();
  });
});

describe('Custom id', () => {
  const ExpanderWithCustomId = (
    <Expander id="test-id" {...{ 'data-testid': 'expander-custom-id' }}>
      <ExpanderTitleButton
        toggleButtonProps={{ 'data-testid': 'expander-custom-id-title' }}
      >
        Test expander with custom id
      </ExpanderTitleButton>
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
      <ExpanderTitleButton
        {...{ 'data-testid': 'expander-open-by-default-title' }}
      >
        Test expander open by default
      </ExpanderTitleButton>
      <ExpanderContent>Test expander open by default content</ExpanderContent>
    </Expander>
  );

  it('gives the classname to expander title and icon', () => {
    const { getByTestId } = render(DefaultOpenExpander());
    const div = getByTestId('expander-open-by-default-title');
    expect(div).toHaveClass('fi-expander_title-button--open');
    expect(div.querySelector('svg')).toHaveClass(
      'fi-expander_title-button-icon--open',
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
    expect(titleDiv).toHaveClass('fi-expander_title-button');
    expect(titleDiv).not.toHaveClass('fi-expander_title-button--open');
    expect(buttonToClick.querySelector('svg')).not.toHaveClass(
      'fi-expander_title-button-icon--open',
    );
  });
});

describe('onOpenChange', () => {
  it('is called', async () => {
    const mockClickHandler = jest.fn();
    const { getByRole } = render(
      <Expander onOpenChange={mockClickHandler}>
        <ExpanderTitleButton>Test expander open by default</ExpanderTitleButton>
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
      <ExpanderTitleButton {...{ 'data-testid': 'expander-title-id' }}>
        Test expander onClick testing
      </ExpanderTitleButton>
      <ExpanderContent>Test expander click testing content</ExpanderContent>
    </Expander>
  );

  it('open-classnames should be found ', async () => {
    const { getByTestId } = render(ControlledExpander());
    const div = getByTestId('expander-title-id');
    expect(div).toHaveClass('fi-expander_title-button--open');

    expect(div.querySelector('svg')).toHaveClass(
      'fi-expander_title-button-icon--open',
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
    expect(div).toHaveClass('fi-expander_title-button--open');

    expect(button.querySelector('svg')).toHaveClass(
      'fi-expander_title-button-icon--open',
    );
  });
});
