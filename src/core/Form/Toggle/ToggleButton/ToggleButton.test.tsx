import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../../utils/test';

import { ToggleButton } from './ToggleButton';

describe('Basic ToggleButton', () => {
  it('should match snapshot', () => {
    const TestToggle = (children: string) => (
      <ToggleButton>{children}</ToggleButton>
    );
    const { container } = render(TestToggle('TestToggle'));
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calling render with the same component on the same container does not remount', () => {
    const TestToggle = (children: string) => (
      <ToggleButton>{children}</ToggleButton>
    );
    const { getByText, rerender } = render(TestToggle('TestToggle'));
    expect(getByText('TestToggle')).toBeTruthy();

    // re-render the same component with different props
    rerender(TestToggle('Test Two'));
    expect(getByText('Test Two')).toBeTruthy();
  });

  it('onClick should activate toggle and deactivate when clicked again', async () => {
    const mockClickHandler = jest.fn();
    const { getByRole, container } = render(
      <ToggleButton onClick={mockClickHandler}>Test two</ToggleButton>,
    );
    const toggle = getByRole('button');
    fireEvent.click(toggle);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    const svgClassList = container.querySelector('svg')?.classList;
    expect(svgClassList).toContain('fi-toggle_icon');
    expect(svgClassList).toContain('fi-toggle_icon--checked');
    fireEvent.click(toggle);
    expect(svgClassList).not.toContain('fi-toggle_icon--checked');
  });

  it('onClick should not change toggle state when checked is controlled', async () => {
    const mockClickHandler = jest.fn();
    const { getByRole, container } = render(
      <ToggleButton checked={false} onClick={mockClickHandler}>
        Controlled checked state
      </ToggleButton>,
    );
    const toggle = getByRole('button');
    fireEvent.click(toggle);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    const svgClassList = container.querySelector('svg')?.classList;
    expect(svgClassList).toContain('fi-toggle_icon');
    expect(svgClassList).not.toContain('fi-toggle_icon--checked');
  });

  test(
    'should not have basic accessibility issues',
    axeTest(<ToggleButton>Toggle</ToggleButton>),
  );
});

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(<ToggleButton margin="xs">Test</ToggleButton>);
    expect(container.firstChild).toHaveAttribute('style', 'margin: 10px;');
  });

  it('should have margin prop overwritten from toggleWrapperProps', () => {
    const { container } = render(
      <ToggleButton margin="xs" toggleWrapperProps={{ style: { margin: 2 } }}>
        Test
      </ToggleButton>,
    );
    expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
  });
});
