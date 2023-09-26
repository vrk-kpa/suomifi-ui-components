import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { axeTest } from '../../../../utils/test';

import { ToggleInput } from './ToggleInput';

describe('Basic ToggleInput', () => {
  it('should match snapshot', () => {
    const TestToggle = (children: string) => (
      <ToggleInput>{children}</ToggleInput>
    );
    const { container } = render(TestToggle('TestToggle'));
    expect(container.firstChild).toMatchSnapshot();
  });

  it('calling render with the same component on the same container does not remount', () => {
    const TestToggle = (children: string) => (
      <ToggleInput>{children}</ToggleInput>
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
      <ToggleInput onChange={mockClickHandler}>Test two</ToggleInput>,
    );
    const toggle = getByRole('checkbox');
    fireEvent.click(toggle);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(toggle).toBeChecked();
    const svgClassList = container.querySelector('svg')?.classList;
    expect(svgClassList).toContain('fi-toggle_icon');
    expect(svgClassList).toContain('fi-toggle_icon--checked');
    fireEvent.click(toggle);
    expect(svgClassList).not.toContain('fi-toggle_icon--checked');
    expect(toggle).not.toBeChecked();
  });

  it('onClick should not change toggle state when checked is controlled', async () => {
    const mockClickHandler = jest.fn();
    const { getByRole, container } = render(
      <ToggleInput checked={false} onChange={mockClickHandler}>
        Controlled checked state
      </ToggleInput>,
    );
    const toggle = getByRole('checkbox');
    fireEvent.click(toggle);
    expect(mockClickHandler).toHaveBeenCalledTimes(1);
    expect(toggle).not.toBeChecked();
    const svgClassList = container.querySelector('svg')?.classList;
    expect(svgClassList).toContain('fi-toggle_icon');
    expect(svgClassList).not.toContain('fi-toggle_icon--checked');
  });

  test(
    'should not have basic accessibility issues',
    axeTest(<ToggleInput>Toggle</ToggleInput>),
  );
});

describe('name', () => {
  const { getByRole } = render(<ToggleInput name="testToggle" />);
  const namedToggle = getByRole('checkbox') as HTMLInputElement;
  it('has the given name attribute', () => {
    expect(namedToggle.name).toBe('testToggle');
  });
});

describe('margin', () => {
  it('should have margin style from margin prop', () => {
    const { container } = render(<ToggleInput margin="xs" />);
    expect(container.firstChild).toHaveAttribute('style', 'margin: 10px;');
  });

  it('should have margin prop overwritten from toggleWrapperProps', () => {
    const { container } = render(
      <ToggleInput margin="xs" toggleWrapperProps={{ style: { margin: 2 } }} />,
    );
    expect(container.firstChild).toHaveAttribute('style', 'margin: 2px;');
  });
});
