import React from 'react';
import { render } from '@testing-library/react';
import { axeTest } from '../../utils/test';
import { AutoId } from '../utils/AutoId/AutoId';

import { Button } from './Button';

describe('Basic Button', () => {
  it('render with the same component on the same container does not remount', () => {
    const { getByRole, rerender } = render(
      <AutoId>{(id) => <Button id={id}>Test</Button>}</AutoId>,
    );
    const button = getByRole('button');
    expect(button.textContent).toBe('Test');
    expect(button).toHaveAttribute('id', '1');
    // re-render the same component with different props
    rerender(<AutoId>{(id) => <Button id={id}>Test two</Button>}</AutoId>);
    const rerendered = getByRole('button');
    expect(rerendered.textContent).toBe('Test two');
    expect(rerendered).toHaveAttribute('id', '1');
  });

  it(
    'should not have basic accessibility issues',
    axeTest(<Button>Test</Button>),
  );
});

describe('Disabled Button', () => {
  it('is disabled and changes to enabled', () => {
    const { getByRole, rerender } = render(
      <Button disabled={true}>Test</Button>,
    );
    expect(getByRole('button')).toBeDisabled();

    rerender(<Button disabled={false}>Test</Button>);
    expect(getByRole('button')).toBeEnabled();
  });

  it('is aria-disabled and changes to enabled', () => {
    const { getByRole, rerender } = render(
      <Button aria-disabled={true}>Aria-disabled button</Button>,
    );
    expect(getByRole('button')).toHaveAttribute('aria-disabled', 'true');
    rerender(<Button aria-disabled={false}>Aria-disabled button</Button>);
    expect(getByRole('button')).toHaveAttribute('aria-disabled', 'false');
  });
});

describe('Button variant', () => {
  it('default should match snapshot', () => {
    const { container } = render(<Button>Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('inverted should match snapshot', () => {
    const { container } = render(
      <Button variant="inverted">Inverted button</Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('secondary should match snapshot', () => {
    const { container } = render(
      <Button variant="secondary">Secondary button</Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('secondaryNoBorder should match snapshot', () => {
    const { container } = render(
      <Button variant="secondaryNoBorder">secondaryNoBorder button</Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('link match snapshot', () => {
    const { container } = render(
      <Button variant="secondaryLight">Secondary light button</Button>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('Margin prop', () => {
    it('should have margin style from margin prop', () => {
      const { container } = render(<Button margin="xs">Test button</Button>);
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('style', 'margin: 10px;');
    });

    it('should have margin prop style overwritten from style', () => {
      const { container } = render(
        <Button margin="xs" style={{ margin: 2 }}>
          Test button
        </Button>,
      );
      const button = container.querySelector('button');
      expect(button).toHaveAttribute('style', 'margin: 2px;');
    });
  });
});
